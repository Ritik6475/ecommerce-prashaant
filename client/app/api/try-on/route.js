import { NextResponse } from "next/server";

export async function POST(req) {
  try {
    const formData = await req.formData();

    const userImage = formData.get("userImage");
    const productImage = formData.get("productImage");

    if (!userImage || !productImage) {
      return NextResponse.json(
        { error: "Images missing" },
        { status: 400 }
      );
    }

    // 🔥 MATCH API4AI DOCS EXACTLY
    const apiForm = new FormData();
    apiForm.append("image", userImage, "person.jpg");
    apiForm.append("image-apparel", productImage, "apparel.jpg");

    const apiRes = await fetch(
      "https://api4ai.cloud/virtual-try-on/v1/results",
      {
        method: "POST",
        headers: {
          "X-API-KEY": process.env.API4AI_KEY,
        },
        body: apiForm,
      }
    );

    const rawText = await apiRes.text();

    if (!apiRes.ok) {
      console.error("API4AI ERROR:", rawText);
      return NextResponse.json(
        { error: "API4AI failed", details: rawText },
        { status: 500 }
      );
    }

    const result = JSON.parse(rawText);
    return NextResponse.json(result);

  } catch (err) {
    console.error("TRY-ON ERROR:", err);
    return NextResponse.json(
      { error: "Try-on failed" },
      { status: 500 }
    );
  }
}
