import imageCompression from "browser-image-compression";

export interface CompressionOptions {
  maxSizeMB?: number;
  maxWidthOrHeight?: number;
  useWebWorker?: boolean;
  fileType?: string;
  initialQuality?: number;
}

const DEFAULT_OPTIONS: CompressionOptions = {
  maxSizeMB: 0.4, // Target ~300-400KB max for ultra-fast website loading
  maxWidthOrHeight: 1600, // Max 1600px width/height for luxury real-estate fidelity
  useWebWorker: true,
  fileType: "image/webp",
  initialQuality: 0.82,
};

/**
 * Compresses an image client-side before uploading to Supabase Storage / Local Storage.
 * Converts raster images (JPEG, PNG, WebP) to modern, highly-compressed WebP format.
 * Bypasses SVGs and GIFs to preserve vector scalability and animations.
 */
export async function compressImage(
  file: File,
  customOptions?: Partial<CompressionOptions>
): Promise<File> {
  // If not in browser environment, return original file
  if (typeof window === "undefined") {
    return file;
  }

  // Preserve vector and animated formats
  const fileType = file.type.toLowerCase();
  if (fileType.includes("svg") || fileType.includes("gif")) {
    return file;
  }

  try {
    const options = {
      ...DEFAULT_OPTIONS,
      ...customOptions,
    };

    const compressedBlob = await imageCompression(file, options);

    // Format new filename with .webp extension
    const lastDot = file.name.lastIndexOf(".");
    const originalNameWithoutExt = lastDot > 0 ? file.name.substring(0, lastDot) : file.name;
    const sanitizedBase = originalNameWithoutExt
      .toLowerCase()
      .replace(/[^a-z0-9-]/g, "-")
      .replace(/-+/g, "-")
      .replace(/^-|-$/g, "");
    const newFileName = `${sanitizedBase || "property"}.webp`;

    return new File([compressedBlob], newFileName, {
      type: "image/webp",
      lastModified: Date.now(),
    });
  } catch (error) {
    console.warn("Client-side image compression bypassed or failed, using original file:", error);
    return file;
  }
}

/**
 * Helper to format file sizes for UX feedback (e.g. "3.4 MB" -> "280 KB")
 */
export function formatFileSize(bytes: number): string {
  if (bytes === 0) return "0 B";
  const k = 1024;
  const sizes = ["B", "KB", "MB", "GB"];
  const i = Math.floor(Math.log(bytes) / Math.log(k));
  return `${parseFloat((bytes / Math.pow(k, i)).toFixed(1))} ${sizes[i]}`;
}
