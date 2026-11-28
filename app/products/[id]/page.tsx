import { notFound } from "next/navigation";
import { getProductById } from "@/services/products-service";

export default async function ProductDetailPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;

  const product = await getProductById(Number(id));

  // Si no existe, lanzamos el 404 de Next.js
  if (!product) {
    notFound();
  }

  return (
    <main className="max-w-3xl mx-auto p-6">
      <img
        src={product.cover}
        alt={product.name}
        className="w-full h-[300px] object-cover rounded-lg mb-4"
      />
      <span className="text-gray-400 text-xs uppercase">{product.brand}</span>
      <h1 className="text-2xl font-bold">{product.name}</h1>
      <p className="text-emerald-600 font-bold text-xl">
        ${product.price} {product.currency}
      </p>

      {product.description && (
        <p className="mt-4 text-gray-700 leading-relaxed">
          {product.description}
        </p>
      )}
    </main>
  );}