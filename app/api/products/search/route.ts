import { NextResponse } from "next/server";
import { createClient } from "@supabase/supabase-js";

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
);

// GET: buscar productos por nombre o marca
export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const criterio = searchParams.get("criterio");

  if (!criterio || !criterio.trim()) {
    return NextResponse.json(
      { error: true, message: "Debes ingresar un criterio de búsqueda" },
      { status: 400 }
    );
  }

  const busqueda = criterio.trim();

  const { data, error } = await supabase
    .from("Products")
    .select("*")
    .or(`name.ilike.%${busqueda}%,brand.ilike.%${busqueda}%`);

  if (error) {
    console.error("Error al buscar productos:", error);

    return NextResponse.json(
      { error: true, message: error.message },
      { status: 400 }
    );
  }

  if (!data || data.length === 0) {
    return NextResponse.json(
      { error: true, message: "Producto no encontrado" },
      { status: 404 }
    );
  }

  return NextResponse.json(data, { status: 200 });
}