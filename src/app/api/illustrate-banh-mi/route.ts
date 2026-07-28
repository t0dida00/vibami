import { access, mkdir, writeFile } from "node:fs/promises";
import path from "node:path";

import { InferenceClient } from "@huggingface/inference";
import type { InferenceProviderOrPolicy } from "@huggingface/inference";
import { NextResponse } from "next/server";

const DEFAULT_MODEL = "ideogram-ai/ideogram-4-fp8";
const DEFAULT_PROVIDER = "fal-ai";
const GALLERY_DIR = "gallery";
const SIZE_STEP = "Choose size";
const PROTEIN_STEP = "Choose protein";
const SAUCE_STEP = "Choose sauce";
const TOPPING_STEP = "Choose toppings";
const SPICE_STEP = "Spice level";
const VISIBLE_TOPPINGS = [
  "Pickled carrot & daikon",
  "Cucumber",
  "Cilantro",
  "Spring onion",
  "Fresh chili",
] as const;
const ABSENT_TOPPING_DESCRIPTIONS: Record<(typeof VISIBLE_TOPPINGS)[number], string> = {
  Cilantro: "cilantro, coriander leaves, leafy green herb garnish",
  Cucumber: "cucumber, cucumber slices, green cucumber strips",
  "Fresh chili": "fresh chili, red chili, chili rings, diagonal red chili slices",
  "Pickled carrot & daikon": "pickled carrot and daikon, carrot, orange carrot strips, white daikon strips, julienne pickles, shredded carrot, white radish",
  "Spring onion": "spring onion, scallion, green onion, shredded scallion strands",
};

type IllustrationSelection = {
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

    if (!step || !optionValue) {
      return selections;
    }

    selections.push({ step, value: optionValue });
    return selections;
  }, []);
}

function getSelectionValue(selections: IllustrationSelection[], step: string) {
  return selections.find((selection) => selection.step === step)?.value;
}

function getSelectedToppings(selections: IllustrationSelection[]) {
  const toppings = selections
    .filter((selection) => selection.step === TOPPING_STEP)
    .map((selection) => selection.value);

  return [...toppings].sort((first, second) => {
    const firstIndex = VISIBLE_TOPPINGS.indexOf(first as (typeof VISIBLE_TOPPINGS)[number]);
    const secondIndex = VISIBLE_TOPPINGS.indexOf(second as (typeof VISIBLE_TOPPINGS)[number]);

    if (firstIndex === -1 && secondIndex === -1) {
      return first.localeCompare(second);
    }

    if (firstIndex === -1) {
      return 1;
    }

    if (secondIndex === -1) {
      return -1;
    }

    return firstIndex - secondIndex;
  });
}

function getAbsentToppingDescriptions(selections: IllustrationSelection[]) {
  const selectedToppings = getSelectedToppings(selections);

  return VISIBLE_TOPPINGS
    .filter((topping) => !selectedToppings.includes(topping))
    .map((topping) => ABSENT_TOPPING_DESCRIPTIONS[topping]);
}

function createBanhMiPrompt({
  forbiddenToppings = [],
  protein,
  sauce,
  size,
  spiceLevel = "None",
  toppings = [],
}: {
  forbiddenToppings?: string[];
  protein: string;
  sauce: string;
  size: string;
  spiceLevel?: string;
  toppings?: string[];
}) {
  const hasFreshChili = toppings.includes("Fresh chili");
  const spiceInstruction = hasFreshChili
    ? `Fresh chili is selected, so adjust the visible amount of fresh chili according to the spice level: ${spiceLevel}.`
    : `Spice level ${spiceLevel} affects sauce heat only. Do not show visible chili because Fresh chili was not selected.`;

  return `
Create an appetizing product image of a customized Vietnamese bánh mì.

CUSTOMER SELECTIONS:
- Size: ${size}
- Protein: ${protein}
- Sauce: ${sauce}
- Toppings: ${toppings.length ? toppings.join(", ") : "None"}
- Spice level: ${spiceLevel}

Show one whole crisp golden Vietnamese baguette filled with exactly
the selected protein, sauce, and toppings.

Only these visible toppings are allowed: ${toppings.length ? toppings.join(", ") : "None"}.
Forbidden visible ingredients: ${forbiddenToppings.length ? forbiddenToppings.join("; ") : "None"}.
${spiceInstruction}

Ingredient requirements:
- Cucumber must be cut into long, thin lengthwise slices.
- Spring onion must be finely shredded into long strands.
- Fresh chili must be cut into thin diagonal slices.
- Pickled carrot and daikon must be thin julienne strips.
- Do not include any ingredient that was not selected.
- If Pickled carrot & daikon is not selected, there must be no orange carrot strips and no white daikon strips.
- If Fresh chili is not selected, there must be no red chili slices.

Use professional commercial food photography, bright soft studio
lighting, realistic textures, and a three-quarter side view.
Center the sandwich and keep it completely visible.

Use a clean warm cream background. Keep the camera angle, lighting,
framing, and visual scale consistent across all customizations.

No text, logo, hands, plate, packaging, extra ingredients,
floating food, or cropped bread.
`.trim();
}

function buildIllustrationPrompt(body: IllustrationRequest | null) {
  const fallbackPrompt = typeof body?.prompt === "string" ? body.prompt.trim() : "";
  const selections = sanitizeSelections(body?.selections);
  const size = getSelectionValue(selections, SIZE_STEP);
  const protein = getSelectionValue(selections, PROTEIN_STEP);
  const sauce = getSelectionValue(selections, SAUCE_STEP);

  if (!size || !protein || !sauce) {
    return fallbackPrompt;
  }

  return createBanhMiPrompt({
    protein,
    sauce,
    size,
    forbiddenToppings: getAbsentToppingDescriptions(selections),
    spiceLevel: getSelectionValue(selections, SPICE_STEP) || "None",
    toppings: getSelectedToppings(selections),
  });
}

function buildNegativePrompt(body: IllustrationRequest | null) {
  const selections = sanitizeSelections(body?.selections);
  const absentToppings = getAbsentToppingDescriptions(selections);

  return [
    "text",
    "logo",
    "watermark",
    "hands",
    "packaging",
    "wrapper",
    "cropped sandwich",
    "transparent background",
    "alpha channel",
    "pink background",
    "magenta background",
    "neon background",
    "chroma key",
    "checkerboard",
    "extra vegetables",
    "unselected toppings",
    ...absentToppings,
  ].join(", ");
}

function getTextToImageModel() {
  const requestedModel = process.env.HUGGING_FACE_IMAGE_MODEL?.trim();

  if (!requestedModel || /kontext/i.test(requestedModel)) {
    return DEFAULT_MODEL;
  }

  return requestedModel;
}

function slugify(value: string) {
  return value
    .normalize("NFKD")
    .replace(/[\u0300-\u036f]/g, "")
    .toLowerCase()
    .replace(/&/g, " and ")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "") || "none";
}

function getGalleryImage(body: IllustrationRequest | null) {
  const selections = sanitizeSelections(body?.selections);
  const protein = getSelectionValue(selections, PROTEIN_STEP);
  const sauce = getSelectionValue(selections, SAUCE_STEP);
  const spiceLevel = getSelectionValue(selections, SPICE_STEP) || "None";

  if (!protein || !sauce) {
    return null;
  }

  const toppings = getSelectedToppings(selections);
  const fileBase = [
    protein,
    sauce,
    toppings.length ? toppings.join("-") : "no toppings",
    spiceLevel,
  ]
    .map(slugify)
    .join("-");
  const fileName = `${fileBase}.png`;
  const publicPath = `/${GALLERY_DIR}/${fileName}`;
  const filePath = path.join(process.cwd(), "public", GALLERY_DIR, fileName);

  return { filePath, publicPath };
}

async function galleryImageExists(filePath: string) {
  try {
    await access(filePath);
    return true;
  } catch {
    return false;
  }
}

async function saveGalleryImage(filePath: string, image: Blob) {
  await mkdir(path.dirname(filePath), { recursive: true });
  await writeFile(filePath, Buffer.from(await image.arrayBuffer()));
}

async function blobToDataUrl(blob: Blob) {
  const imageBuffer = Buffer.from(await blob.arrayBuffer());
  return `data:${blob.type || "image/png"};base64,${imageBuffer.toString("base64")}`;
}

export async function POST(request: Request) {
  try {
    const body = (await request.json().catch(() => null)) as IllustrationRequest | null;
    const galleryImage = getGalleryImage(body);

    if (galleryImage && await galleryImageExists(galleryImage.filePath)) {
      return NextResponse.json({ cached: true, imageUrl: galleryImage.publicPath });
    }

    const prompt = buildIllustrationPrompt(body);
    const negativePrompt = buildNegativePrompt(body);

    if (!prompt) {
      return NextResponse.json({ error: "Missing illustration prompt." }, { status: 400 });
    }

    const apiKey = process.env.HUGGING_FACE_API_KEY || process.env.HF_TOKEN || process.env.API_KEY;
    const model = getTextToImageModel();
    const provider = (process.env.HUGGING_FACE_IMAGE_PROVIDER || DEFAULT_PROVIDER) as InferenceProviderOrPolicy;

    if (!apiKey) {
      return NextResponse.json(
        { error: "Missing HUGGING_FACE_API_KEY. Add it to your environment to generate illustrations." },
        { status: 500 },
      );
    }

    const client = new InferenceClient(apiKey);
    const image = await client.textToImage(
      {
        inputs: prompt,
        model,
        parameters: {
          height: 768,
          negative_prompt: negativePrompt,
          num_inference_steps: 28,
          width: 1024,
        },
        provider,
      },
      { outputType: "blob" },
    );
    const imageUrl = galleryImage?.publicPath || await blobToDataUrl(image);

    if (galleryImage) {
      await saveGalleryImage(galleryImage.filePath, image);
    }

    return NextResponse.json({ cached: false, imageUrl });
  } catch (error) {
    return NextResponse.json(
      { error: error instanceof Error ? error.message : "Image generation failed." },
      { status: 500 },
    );
  }
}
