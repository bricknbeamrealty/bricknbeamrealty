import { NextResponse } from "next/server";
import { getVapidPublicKey } from "@/lib/webPush";

export async function GET() {
  const publicKey = getVapidPublicKey();
  return NextResponse.json({
    success: true,
    publicKey,
  });
}
