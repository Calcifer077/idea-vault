import { getCommitHistory } from "@/app/_lib/actions";
import { NextResponse } from "next/server";

export async function GET() {
  try {
    const commits = await getCommitHistory();
    return NextResponse.json({ commits });
  } catch (error) {
    console.log(error);
    return NextResponse.json(
      { error: "Failed to fetch commit history" },
      { status: 500 },
    );
  }
}
