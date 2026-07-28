import { NextResponse } from "next/server";

export async function POST(request: Request) {
  const apiKey = process.env.OPENAI_API_KEY;

  if (!apiKey) {
    return NextResponse.json(
      { error: "Missing OPENAI_API_KEY. Add it to your environment to generate illustrations." },
      { status: 500 },
    );
  }

  const body = (await request.json().catch(() => null)) as { prompt?: unknown } | null;
  const prompt = typeof body?.prompt === "string" ? body.prompt.trim() : "";
  console.log('prompt',prompt)
  if (!prompt) {
    return NextResponse.json({ error: "Missing illustration prompt." }, { status: 400 });
  }

  const response = await fetch("https://api.openai.com/v1/images/generations", {
    body: JSON.stringify({
      model: "gpt-image-1",
      prompt,
      quality: "medium",
      size: "1024x1024",
    }),
    headers: {
      Authorization: `Bearer ${apiKey}`,
      "Content-Type": "application/json",
    },
    method: "POST",
  });

  const data = (await response.json().catch(() => null)) as {
    data?: Array<{ b64_json?: string; url?: string }>;
    error?: { message?: string };
  } | null;

  if (!response.ok) {
    return NextResponse.json(
      { error: data?.error?.message || "Image generation failed." },
      { status: response.status },
    );
  }

  const image = data?.data?.[0];
  const imageUrl = image?.b64_json ? `data:image/png;base64,${image.b64_json}` : image?.url;

  if (!imageUrl) {
    return NextResponse.json({ error: "Image generation returned no image." }, { status: 502 });
  }

  return NextResponse.json({ imageUrl });
}
