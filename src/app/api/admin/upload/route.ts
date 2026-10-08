import { NextRequest } from "next/server";
import { POST as handleUpload } from "../properties/upload/route";

export const dynamic = "force-dynamic";

export async function POST(req: NextRequest) {
  return handleUpload(req);
}
