const API_BASE_URL =
  typeof window !== "undefined"
    ? ""
    : process.env.NEXT_PUBLIC_SITE_URL
    ? process.env.NEXT_PUBLIC_SITE_URL
    : process.env.VERCEL_URL
    ? `https://${process.env.VERCEL_URL}`
    : "";

export interface Product {
  id?: string | number;
  name: string;
  description?: string;
  price: number;
  brand?: string;
  cover?: string;
  images?: string[];
  currency?: string;
  stock?: number;
  rating?: number;
}

// OBTENER PRODUCTOS
export async function getProducts(): Promise<Product[]> {
  try {
    const res = await fetch(`${API_BASE_URL}/api/products`, {
      cache: "no-store",
    });

    if (!res.ok) throw new Error("Error al obtener productos");

    return await res.json();
  } catch (error) {
    console.error("Error al obtener productos:", error);
    return [];
  }
}

// OBTENER PRODUCTO POR ID
export async function getProductById(
  id: string | number
): Promise<Product | null> {
  try {
    const res = await fetch(`${API_BASE_URL}/api/products/${id}`, {
      cache: "no-store",
    });

    if (!res.ok) return null;

    return await res.json();
  } catch (error) {
    console.error("Error al obtener producto:", error);
    return null;
  }
}

export async function searchProducts(query: string): Promise<Product[]> {
  try {
    if (!query || query.trim() === "") {
      return getProducts();
    }

    const res = await fetch(
      `${API_BASE_URL}/api/products/search/${encodeURIComponent(query)}`,
      { cache: "no-store" }
    );

    if (!res.ok) return [];

    return await res.json();
  } catch (error) {
    console.error("Error al buscar productos:", error);
    return [];
  }
}

// GUARDAR PRODUCTO
export async function saveProduct(product: Product): Promise<Product> {
  const response = await fetch(`${API_BASE_URL}/api/products`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(product),
  });

  if (!response.ok) {
    const error = await response.json();
    throw new Error(error.error || "Error al guardar el producto");
  }

  const result = await response.json();
  return result.data;
}

// ACTUALIZAR PRODUCTO
export async function updateProduct(
  id: string | number,
  product: Product
): Promise<Product> {
  const response = await fetch(`${API_BASE_URL}/api/products/${id}`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(product),
  });

  if (!response.ok) {
    const error = await response.json();
    throw new Error(error.error || "Error al actualizar el producto");
  }

  const result = await response.json();
  return result.data;
}