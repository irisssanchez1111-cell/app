import { notFound } from "next/navigation";
import { ProductForm } from "../../components/ProductForm";
import { getProductById } from "@/services/products-service";

export default async function EditProduct({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const product = await getProductById(id);

  if (!product) notFound();

  return (
    <main className="p-6">
      <h1 className="text-2xl font-bold mb-4">Editar producto</h1>
      <ProductForm product={product} />
    </main>
  );
}