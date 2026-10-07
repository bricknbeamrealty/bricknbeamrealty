import { NextRequest, NextResponse } from "next/server";
import {
  getSupabaseServerClient,
  isSupabaseConfigured,
  LeadInput,
} from "@/lib/supabaseServer";

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();

    const fullName = String(body.fullName || body.full_name || "").trim();
    const phone = String(body.phone || "").trim();
    const email = body.email ? String(body.email).trim() : null;
    const requirement = String(body.requirement || body.selectedRequirement || "General Inquiry").trim();
    const priceRange = body.price_range || body.selectedBudget || null;
    const propertyStage = body.property_stage || body.selectedStage || null;
    const propertyCategory = body.property_category || "residential";
    const transactionType = body.transaction_type || "buy";
    const source = body.source || "modal";
    const notes = body.notes || body.message || null;

    if (!fullName || !phone) {
      return NextResponse.json(
        { success: false, error: "Full name and phone number are required." },
        { status: 400 }
      );
    }

    if (!isSupabaseConfigured()) {
      // Graceful offline fallback if Supabase credentials are not yet entered
      console.warn("Supabase is not configured. Simulating lead capture for:", { fullName, phone });
      return NextResponse.json({
        success: true,
        simulated: true,
        message: "Enquiry recorded successfully (Supabase credentials not configured).",
      });
    }

    const supabase = getSupabaseServerClient();

    const leadRecord: LeadInput = {
      full_name: fullName,
      phone,
      email,
      requirement,
      price_range: priceRange,
      property_stage: propertyStage,
      property_category: propertyCategory,
      transaction_type: transactionType,
      source,
      notes,
    };

    const { data, error } = await supabase
      .from("leads")
      .insert([
        {
          ...leadRecord,
          status: "new", // Guaranteed default status per Step 2 spec
        },
      ])
      .select()
      .single();

    if (error) {
      console.error("Supabase insert error:", error);
      return NextResponse.json(
        { success: false, error: error.message },
        { status: 500 }
      );
    }

    return NextResponse.json({
      success: true,
      lead: data,
    });
  } catch (err: unknown) {
    const message = err instanceof Error ? err.message : "Internal Server Error";
    console.error("POST /api/leads error:", err);
    return NextResponse.json(
      { success: false, error: message },
      { status: 500 }
    );
  }
}
