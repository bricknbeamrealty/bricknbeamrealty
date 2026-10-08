import fs from "fs";
import path from "path";
import { PROPERTIES as SEED_PROPERTIES, Property } from "@/data/properties";
import { getSupabaseServerClient, isSupabaseConfigured } from "@/lib/supabaseServer";

const DYNAMIC_FILE_PATH = path.join(process.cwd(), "src", "data", "dynamic-properties.json");

/**
 * Ensures the dynamic properties JSON file exists with seed properties
 */
function ensureLocalFile(): Property[] {
  try {
    if (!fs.existsSync(DYNAMIC_FILE_PATH)) {
      const dir = path.dirname(DYNAMIC_FILE_PATH);
      if (!fs.existsSync(dir)) {
        fs.mkdirSync(dir, { recursive: true });
      }
      fs.writeFileSync(DYNAMIC_FILE_PATH, JSON.stringify(SEED_PROPERTIES, null, 2), "utf8");
      return SEED_PROPERTIES;
    }
    const raw = fs.readFileSync(DYNAMIC_FILE_PATH, "utf8");
    const parsed = JSON.parse(raw);
    if (Array.isArray(parsed) && parsed.length > 0) {
      return parsed;
    }
    fs.writeFileSync(DYNAMIC_FILE_PATH, JSON.stringify(SEED_PROPERTIES, null, 2), "utf8");
    return SEED_PROPERTIES;
  } catch (err) {
    console.warn("Local properties file read fallback:", err);
    return SEED_PROPERTIES;
  }
}

/**
 * Writes properties array to local JSON file
 */
function writeLocalFile(properties: Property[]) {
  try {
    const dir = path.dirname(DYNAMIC_FILE_PATH);
    if (!fs.existsSync(dir)) {
      fs.mkdirSync(dir, { recursive: true });
    }
    fs.writeFileSync(DYNAMIC_FILE_PATH, JSON.stringify(properties, null, 2), "utf8");
  } catch (err) {
    console.error("Failed to write local properties file:", err);
  }
}

/**
 * Retrieves all properties from Supabase, with automatic fallback to local JSON/seed
 */
export async function getAllProperties(): Promise<Property[]> {
  if (isSupabaseConfigured()) {
    try {
      const supabase = getSupabaseServerClient();
      const { data, error } = await supabase
        .from("properties")
        .select("*")
        .order("is_featured", { ascending: false })
        .order("created_at", { ascending: false });

      if (!error && Array.isArray(data) && data.length > 0) {
        // Map snake_case database columns to Property interface
        return data.map(mapDbToProperty);
      }

      // If Supabase table exists but is empty, seed it automatically from seed properties
      if (!error && Array.isArray(data) && data.length === 0) {
        const local = ensureLocalFile();
        try {
          const dbRows = local.map(mapPropertyToDb);
          await supabase.from("properties").insert(dbRows);
        } catch {
          // ignore seed insert error
        }
        return local;
      }
    } catch {
      // Supabase table might not exist yet; fall back gracefully
    }
  }

  return ensureLocalFile();
}

/**
 * Retrieves a single property by ID
 */
export async function getPropertyById(id: string): Promise<Property | null> {
  const all = await getAllProperties();
  return all.find((p) => p.id === id) || null;
}

/**
 * Retrieves a single property by slug
 */
export async function getPropertyBySlug(slug: string): Promise<Property | null> {
  const all = await getAllProperties();
  return all.find((p) => p.slug === slug) || null;
}

/**
 * Creates a new property and persists it to Supabase and local storage
 */
export async function createProperty(input: Partial<Property>): Promise<Property> {
  const title = (input.title || "Untitled Property").trim();
  const slug = (input.slug || slugify(title)).trim();
  const id = input.id || slug || `prop-${Date.now()}`;

  const newProperty: Property = {
    id,
    slug,
    title,
    developer: (input.developer || "Premier Builder").trim(),
    propertyType: input.propertyType || "residential",
    propertyTypeLabel: input.propertyTypeLabel || "Residential High-Rise",
    location: (input.location || "Thane West").trim(),
    subLocation: (input.subLocation || "Thane, Maharashtra").trim(),
    priceStartingFrom: input.priceStartingFrom || "₹1.00 Cr",
    pricing: input.pricing || "₹1.00 Cr - ₹2.50 Cr",
    priceNumeric: Number(input.priceNumeric) || extractPriceNumeric(input.pricing || input.priceStartingFrom || ""),
    area: input.area || "600 - 1200 sq.ft.",
    possession: input.possession || "Dec-2028",
    possessionYear: Number(input.possessionYear) || 2028,
    bhks: Array.isArray(input.bhks) && input.bhks.length > 0 ? input.bhks : ["2 BHK", "3 BHK"],
    bhkNumeric: Array.isArray(input.bhkNumeric) ? input.bhkNumeric : [2, 3],
    rera: (input.rera || "P517000XXXXX").trim(),
    status: input.status === "Ready to Move" ? "Ready to Move" : "Under Construction",
    isFeatured: Boolean(input.isFeatured),
    image: input.image || "/images/properties/raymond-ten-x-thane.webp",
    overview: input.overview || `Premier landmark residential project by ${input.developer || "Developer"} in prime ${input.location || "Thane"}.`,
    amenities: Array.isArray(input.amenities) && input.amenities.length > 0 ? input.amenities : [
      "Clubhouse & Gymnasium",
      "Swimming Pool",
      "Kids Play Area",
      "High-Speed Elevators",
      "24/7 Security",
    ],
    keyHighlights: Array.isArray(input.keyHighlights) && input.keyHighlights.length > 0 ? input.keyHighlights : [
      "Prime Transit & Metro Connectivity",
      "Zero Brokerage on Direct Builder Allotment",
      "RERA Approved Project",
    ],
  };

  // 1. Try persisting to Supabase
  if (isSupabaseConfigured()) {
    try {
      const supabase = getSupabaseServerClient();
      await supabase.from("properties").insert([mapPropertyToDb(newProperty)]);
    } catch (err) {
      console.warn("Supabase insert property warning:", err);
    }
  }

  // 2. Always persist to local file store
  const local = ensureLocalFile();
  const existingIdx = local.findIndex((p) => p.id === newProperty.id || p.slug === newProperty.slug);
  if (existingIdx >= 0) {
    local[existingIdx] = newProperty;
  } else {
    local.unshift(newProperty);
  }
  writeLocalFile(local);

  return newProperty;
}

/**
 * Updates an existing property
 */
export async function updateProperty(id: string, updates: Partial<Property>): Promise<Property> {
  const local = ensureLocalFile();
  const index = local.findIndex((p) => p.id === id);

  if (index === -1) {
    throw new Error(`Property with id "${id}" not found.`);
  }

  const updatedProperty: Property = {
    ...local[index],
    ...updates,
    id, // ensure ID is immutable
    priceNumeric: updates.priceNumeric !== undefined
      ? Number(updates.priceNumeric)
      : updates.pricing
      ? extractPriceNumeric(updates.pricing)
      : local[index].priceNumeric,
  };

  // 1. Try updating Supabase
  if (isSupabaseConfigured()) {
    try {
      const supabase = getSupabaseServerClient();
      await supabase
        .from("properties")
        .update(mapPropertyToDb(updatedProperty))
        .eq("id", id);
    } catch (err) {
      console.warn("Supabase update property warning:", err);
    }
  }

  // 2. Update local file
  local[index] = updatedProperty;
  writeLocalFile(local);

  return updatedProperty;
}

/**
 * Deletes a property by ID
 */
export async function deleteProperty(id: string): Promise<boolean> {
  const local = ensureLocalFile();
  const filtered = local.filter((p) => p.id !== id);

  if (filtered.length === local.length) {
    return false;
  }

  // 1. Try deleting from Supabase
  if (isSupabaseConfigured()) {
    try {
      const supabase = getSupabaseServerClient();
      await supabase.from("properties").delete().eq("id", id);
    } catch (err) {
      console.warn("Supabase delete property warning:", err);
    }
  }

  // 2. Update local file
  writeLocalFile(filtered);
  return true;
}

/**
 * Helper to slugify a title string
 */
export function slugify(text: string): string {
  return text
    .toLowerCase()
    .trim()
    .replace(/[^\w\s-]/g, "")
    .replace(/[\s_-]+/g, "-")
    .replace(/^-+|-+$/g, "");
}

/**
 * Helper to extract an approximate numeric price in Lakhs from text like "₹1.35 Cr" or "₹79 Lakhs"
 */
function extractPriceNumeric(text: string): number {
  if (!text) return 100;
  const matchCr = text.match(/([\d.]+)\s*(?:cr|crore)/i);
  if (matchCr) {
    return Math.round(parseFloat(matchCr[1]) * 100);
  }
  const matchLakh = text.match(/([\d.]+)\s*(?:l|lakh|lac)/i);
  if (matchLakh) {
    return Math.round(parseFloat(matchLakh[1]));
  }
  return 100;
}

/**
 * Database mapping helpers
 */
function mapPropertyToDb(p: Property) {
  return {
    id: p.id,
    slug: p.slug,
    title: p.title,
    developer: p.developer,
    property_type: p.propertyType,
    property_type_label: p.propertyTypeLabel,
    location: p.location,
    sub_location: p.subLocation,
    price_starting_from: p.priceStartingFrom,
    pricing: p.pricing,
    price_numeric: p.priceNumeric,
    area: p.area,
    possession: p.possession,
    possession_year: p.possessionYear,
    bhks: p.bhks,
    bhk_numeric: p.bhkNumeric,
    rera: p.rera,
    status: p.status,
    is_featured: p.isFeatured,
    image: p.image,
    overview: p.overview,
    amenities: p.amenities,
    key_highlights: p.keyHighlights,
    updated_at: new Date().toISOString(),
  };
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
function mapDbToProperty(db: any): Property {
  return {
    id: db.id,
    slug: db.slug || db.id,
    title: db.title,
    developer: db.developer,
    propertyType: db.property_type || "residential",
    propertyTypeLabel: db.property_type_label || "Residential High-Rise",
    location: db.location,
    subLocation: db.sub_location,
    priceStartingFrom: db.price_starting_from,
    pricing: db.pricing,
    priceNumeric: Number(db.price_numeric) || 100,
    area: db.area,
    possession: db.possession,
    possessionYear: Number(db.possession_year) || 2028,
    bhks: Array.isArray(db.bhks) ? db.bhks : [],
    bhkNumeric: Array.isArray(db.bhk_numeric) ? db.bhk_numeric : [],
    rera: db.rera,
    status: db.status === "Ready to Move" ? "Ready to Move" : "Under Construction",
    isFeatured: Boolean(db.is_featured),
    image: db.image,
    overview: db.overview || "",
    amenities: Array.isArray(db.amenities) ? db.amenities : [],
    keyHighlights: Array.isArray(db.key_highlights) ? db.key_highlights : [],
  };
}
