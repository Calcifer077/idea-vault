import { updateFile } from "@/app/_lib/actions";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  try {
    const { markdown } = await req.json();

    if (!markdown) {
      return NextResponse.json(
        { error: "Markdown is required" },
        { status: 400 },
      );
    }

    await updateFile(markdown);
    return NextResponse.json({ text: "success" });
  } catch (error) {
    console.log(error);
    return NextResponse.json(
      { error: "Failed to update file" },
      { status: 500 },
    );
  }
}
