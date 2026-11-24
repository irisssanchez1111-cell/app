import { NextResponse } from "next/server";
import { createClient } from "@supabase/supabase-js";

const supabaseURL = process.env.NEXT_PUBLIC_SUPABASE_URL!;
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!;

const supabase = createClient(supabaseURL, supabaseAnonKey);

// OBTENER PRODUCTOS
export async function GET() {
  const { data, error } = await supabase
    .from("Products")
    .select("*")
    .order("id", { ascending: true });

  if (error) {
    console.error("Error al obtener productos:", error);

    return NextResponse.json(
      { error: error.message },
      { status: 400 }
    );
  }

  return NextResponse.json(data, { status: 200 });
}

// REGISTRAR PRODUCTOS
export async function POST(request: Request) {
  try {
    const body = await request.json();

    // VALIDAR CAMPOS OBLIGATORIOS
    if (
      !body.name?.trim() ||
      !body.brand?.trim() ||
      !body.currency?.trim() ||
      body.price === "" ||
      body.rating === "" ||
      body.stock === ""
    ) {
      return NextResponse.json(
        { error: "Completa los campos obligatorios." },
        { status: 400 }
      );
    }

    let imagesArray: string[] = [];

    if (Array.isArray(body.images)) {
      imagesArray = body.images;
    } else if (typeof body.images === "string") {
      try {
        const parsed = JSON.parse(body.images);

        imagesArray = Array.isArray(parsed)
          ? parsed
          : [body.images];

      } catch {
        imagesArray = body.images
          .split(",")
          .map((url: string) => url.trim())
          .filter(Boolean);
      }
    }

    const newProduct = {
      name: body.name,
      description: body.description,
      brand: body.brand,
      images: imagesArray,
      cover: body.cover,
      price: Number(body.price),
      currency: body.currency,
      stock: Number(body.stock),
      rating: Number(body.rating),
    };

    // VALIDAR VALORES NUMÉRICOS
    if (
      !Number.isFinite(newProduct.price) ||
      newProduct.price < 0 ||
      !Number.isFinite(newProduct.rating) ||
      newProduct.rating < 0 ||
      newProduct.rating > 5 ||
      !Number.isInteger(newProduct.stock) ||
      newProduct.stock < 0
    ) {
      return NextResponse.json(
        { error: "Verifica el precio, stock y calificación." },
        { status: 400 }
      );
    }

    const { data, error } = await supabase
      .from("Products")
      .insert([newProduct])
      .select()
      .single();

    if (error) {
      console.error("ERROR SUPABASE:", error);

      return NextResponse.json(
        { error: error.message },
        { status: 400 }
      );
    }

    return NextResponse.json(
      { success: true, data },
      { status: 201 }
    );

  } catch (err) {
    console.error("ERROR INTERNO:", err);

    return NextResponse.json(
      { error: "Error interno del servidor" },
      { status: 500 }
    );
  }
}