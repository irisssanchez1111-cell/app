import { NextResponse } from "next/server";
import { createClient } from "@supabase/supabase-js";

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
);

type Ctx = { params: Promise<{ id: string }> };

export async function GET(_req: Request, { params }: Ctx) {
  const { id } = await params;
  const { data, error } = await supabase
    .from("Products")
    .select("*")
    .eq("id", id)
    .single();

  if (error) return NextResponse.json({ error: error.message }, { status: 404 });
  return NextResponse.json(data);
}

export async function PUT(request: Request, { params }: Ctx) {
  const { id } = await params;
  const body = await request.json();

  const updated = {
    name: body.name,
    description: body.description,
    brand: body.brand,
    cover: body.cover,
    price: Number(body.price),
    currency: body.currency,
    stock: Number(body.stock),
    rating: Number(body.rating),
  };

  const { data, error } = await supabase
    .from("Products")
    .update(updated)
    .eq("id", id)
    .select()
    .single();

  if (error) return NextResponse.json({ error: error.message }, { status: 400 });
  return NextResponse.json({ success: true, data });
}