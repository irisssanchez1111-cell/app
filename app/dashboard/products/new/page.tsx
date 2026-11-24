import { ProductForm } from "../components/ProductForm";

export default function NewProduct() {
  return (
    <main className="p-6">
      <h1 className="text-2xl font-bold mb-4">Crear Nuevo Producto</h1>
      <ProductForm />
    </main>
  );
}