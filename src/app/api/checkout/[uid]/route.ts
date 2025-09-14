import { NextRequest, NextResponse } from "next/server";

export async function POST(request: NextRequest) {
  // برای تست، uid رو از URL می‌گیریم
  const url = new URL(request.url);
  const uid = url.pathname.split("/").pop(); // آخرین segment

  if (!uid) {
    return NextResponse.json(
      { error: "Missing Product UID" },
      { status: 400 }
    );
  }

  return NextResponse.json({
    message: "Checkout route works!",
    uid,
  });
}
