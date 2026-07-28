import { InferenceClient } from "@huggingface/inference";
import type { InferenceProviderOrPolicy } from "@huggingface/inference";
import { NextResponse } from "next/server";

import {
  builderOptionImageDetails,
  builderOptionImages,
  sampleOutputImage,
} from "@/features/home/data/builder-option-images";

const DEFAULT_MODEL = "ideogram-ai/ideogram-4-fp8";
const DEFAULT_PROVIDER = "fal-ai";

type IllustrationSelection = {
  image?: string;
  prompt?: string;
  step: string;
  value: string;
};

type IllustrationRequest = {
  prompt?: unknown;
  sampleOutput?: unknown;
  selections?: unknown;
  summary?: unknown;
};

function sanitizeSelections(value: unknown): IllustrationSelection[] {
  if (!Array.isArray(value)) {
    return [];
  }

  return value.reduce<IllustrationSelection[]>((selections, selection) => {
    if (!selection || typeof selection !== "object") {
      return selections;
    }

    const candidate = selection as Record<string, unknown>;
    const step = typeof candidate.step === "string" ? candidate.step.trim() : "";
    const optionValue = typeof candidate.value === "string" ? candidate.value.trim() : "";
    const image = typeof candidate.image === "string"
      ? candidate.image.trim()
      : builderOptionImages[optionValue];
    const prompt = typeof candidate.prompt === "string"
      ? candidate.prompt.trim()
      : builderOptionImageDetails[optionValue]?.prompt;

    if (!step || !optionValue) {
      return selections;
    }

    selections.push({ image, prompt, step, value: optionValue });
    return selections;
  }, []);
}

function buildIllustrationPrompt(body: IllustrationRequest | null) {
  const fallbackPrompt = typeof body?.prompt === "string" ? body.prompt.trim() : "";
  const selections = sanitizeSelections(body?.selections);
  const summary = typeof body?.summary === "string" ? body.summary.trim() : "";
  const sampleOutput = typeof body?.sampleOutput === "string" && body.sampleOutput.trim()
    ? body.sampleOutput.trim()
    : sampleOutputImage;
  const selectedIngredients = selections
    .map((selection) => {
      const imageReference = selection.image ? `, sample ingredient image: ${selection.image}` : "";
      const visualReference = selection.prompt ? `, visual target: ${selection.prompt}` : "";
      return `${selection.step}: ${selection.value}${visualReference}${imageReference}`;
    })
    .join("; ");

  if (!selectedIngredients && fallbackPrompt) {
    return [
      fallbackPrompt,
      `Always use ${sampleOutput} as the sample output reference for composition and final framing.`,
    ].join(" ");
  }

  return [
    "Create an appetizing generated product image of a Vietnamese bánh mì sandwich.",
    `Use ${sampleOutput} as the sample output reference: a clean centered bánh mì menu image with the full sandwich visible.`,
    "Match the selected fillings to the visual targets below; these descriptions are derived from the sample ingredient images in public/ingredients.",
    selectedIngredients ? `Selected ingredients: ${selectedIngredients}.` : "",
    summary ? `Customer summary: ${summary}.` : "",
    "Compose for a 4:3 landscape container.",
    "The entire sandwich must fit inside the frame with comfortable margins on every side.",
    "Do not crop the bread, fillings, toppings, or sandwich ends.",
    "Use a light warm background and crisp appetizing food photography lighting.",
    "No text, no logo, no watermark, no hands, no packaging.",
  ]
    .filter(Boolean)
    .join(" ");
}

export async function POST(request: Request) {
  try {
    const apiKey = process.env.HUGGING_FACE_API_KEY || process.env.HF_TOKEN || process.env.API_KEY;
    const model = process.env.HUGGING_FACE_IMAGE_MODEL || DEFAULT_MODEL;
    const provider = (process.env.HUGGING_FACE_IMAGE_PROVIDER || DEFAULT_PROVIDER) as InferenceProviderOrPolicy;

    if (!apiKey) {
      return NextResponse.json(
        { error: "Missing HUGGING_FACE_API_KEY. Add it to your environment to generate illustrations." },
        { status: 500 },
      );
    }

    const body = (await request.json().catch(() => null)) as IllustrationRequest | null;
    const prompt = buildIllustrationPrompt(body);

    if (!prompt) {
      return NextResponse.json({ error: "Missing illustration prompt." }, { status: 400 });
    }

    const client = new InferenceClient(apiKey);
    const imageUrl = await client.textToImage(
      {
        inputs: prompt,
        model,
        parameters: {
          height: 1024,
          negative_prompt: "text, logo, watermark, hands, packaging, wrapper",
          num_inference_steps: 4,
          width: 1024,
        },
        provider,
      },
      { outputType: "dataUrl" },
    );

    return NextResponse.json({ imageUrl });
  } catch (error) {
    return NextResponse.json(
      { error: error instanceof Error ? error.message : "Image generation failed." },
      { status: 500 },
    );
  }
}
