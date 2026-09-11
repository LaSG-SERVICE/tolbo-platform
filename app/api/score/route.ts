import { NextResponse } from "next/server";
import { calculateScore } from "@/lib/scorepass/engine";

export async function POST(req: Request) {
  try {
    const body = await req.json();

    const result = calculateScore(body);

    return NextResponse.json({
      model_version: "V1.0",
      ...result,
    });
  } catch (error) {
    return NextResponse.json(
      {
        error: "Payload Score Pass invalide",
        detail: error instanceof Error ? error.message : String(error),
      },
      {
        status: 400,
      },
    );
  }
}