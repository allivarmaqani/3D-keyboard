import { NextRequest, NextResponse } from "next/server";

export async function POST(
  request: NextRequest,
  { params }: { params: { uid: string } }
) {
  return NextResponse.json({ url: "https://example.com/checkout/" + params.uid });
}
