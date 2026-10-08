import { NextRequest, NextResponse } from "next/server";
import fs from "fs";
import path from "path";
import { getSupabaseServerClient, isSupabaseConfigured } from "@/lib/supabaseServer";

export const dynamic = "force-dynamic";

function verifyAdminAuth(req: NextRequest): boolean {
  const passcode = req.headers.get("x-admin-passcode");
  const expectedPasscode = process.env.ADMIN_PASSCODE || "bnbadmin2026";
  return Boolean(passcode && passcode === expectedPasscode);
}

const ALLOWED_IMAGE_MIMES = [
  "image/jpeg",
  "image/png",
  "image/webp",
  "image/avif",
  "image/gif",
  "image/svg+xml",
];

const MAX_FILE_SIZE = 10 * 1024 * 1024; // 10MB

export async function POST(req: NextRequest) {
  try {
    if (!verifyAdminAuth(req)) {
      return NextResponse.json(
        { success: false, error: "Unauthorized. Invalid or missing Admin Passcode." },
        { status: 401 }
      );
    }

    const formData = await req.formData();
    const file = formData.get("file") as File | null;

    if (!file) {
      return NextResponse.json(
        { success: false, error: "No image file provided." },
        { status: 400 }
      );
    }

    // Validate MIME type
    if (!ALLOWED_IMAGE_MIMES.includes(file.type.toLowerCase())) {
      return NextResponse.json(
        {
          success: false,
          error: "Invalid file type. Only JPEG, PNG, WEBP, AVIF, and GIF images are allowed.",
        },
        { status: 400 }
      );
    }

    // Validate Size
    if (file.size > MAX_FILE_SIZE) {
      return NextResponse.json(
        { success: false, error: "Image file exceeds maximum 10MB limit." },
        { status: 400 }
      );
    }

    const timestamp = Date.now();
    const random = Math.random().toString(36).substring(2, 8);
    const originalCleanName = file.name
      .toLowerCase()
      .replace(/[^a-z0-9.-]/g, "-")
      .replace(/-+/g, "-");
    const ext = originalCleanName.split(".").pop() || "webp";
    const baseName = originalCleanName.substring(0, originalCleanName.lastIndexOf(".")) || "property";
    const filename = `${baseName}-${timestamp}-${random}.${ext}`;

    const arrayBuffer = await file.arrayBuffer();
    const buffer = Buffer.from(arrayBuffer);

    // 1. Try uploading to Supabase Storage if configured
    if (isSupabaseConfigured()) {
      try {
        const supabase = getSupabaseServerClient();
        const storagePath = `properties/${filename}`;

        const { error: uploadError } = await supabase.storage
          .from("project-images")
          .upload(storagePath, buffer, {
            contentType: file.type || "image/webp",
            upsert: false,
          });

        if (!uploadError) {
          const {
            data: { publicUrl },
          } = supabase.storage.from("project-images").getPublicUrl(storagePath);

          return NextResponse.json({
            success: true,
            publicUrl,
            fileName: filename,
            storageSource: "supabase",
            size: file.size,
          });
        }

        console.warn(
          "Supabase storage upload error, falling back to local storage:",
          uploadError.message
        );
      } catch (err) {
        console.warn("Supabase storage error, falling back to local storage:", err);
      }
    }

    // 2. Resilient Fallback: Save to public/uploads/properties/
    const uploadDir = path.join(process.cwd(), "public", "uploads", "properties");
    if (!fs.existsSync(uploadDir)) {
      fs.mkdirSync(uploadDir, { recursive: true });
    }

    const filePath = path.join(uploadDir, filename);
    fs.writeFileSync(filePath, buffer);

    const publicUrl = `/uploads/properties/${filename}`;

    return NextResponse.json({
      success: true,
      publicUrl,
      fileName: filename,
      storageSource: "local",
      size: file.size,
    });
  } catch (err: unknown) {
    const msg = err instanceof Error ? err.message : "Internal Error";
    console.error("POST /api/admin/properties/upload error:", err);
    return NextResponse.json(
      { success: false, error: `Upload failed: ${msg}` },
      { status: 500 }
    );
  }
}
