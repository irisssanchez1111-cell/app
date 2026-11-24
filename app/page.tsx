import React from "react";
import Link from "next/link";
import { getProducts } from "@/services/products-service";

export default async function Home() {
  const productsData = await getProducts();
  console.log(productsData); 

  return (
    <main className="max-w-6xl mx-auto p-6">
      <h1 className="text-2xl font-bold mb-6">Catálogo de Productos</h1>
      
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
        {productsData.map((product) => (
          <div
            key={product.id}
            className="border rounded-2xl p-4 shadow-sm bg-white hover:shadow-md transition-shadow flex flex-col justify-between"
          >
            <div className="overflow-hidden rounded-lg mb-3">
              {product.cover && (
                <img
                  alt={product.name}
                  className="w-full object-cover h-[200px] rounded-lg"
                  src={product.cover}
                />
              )}
            </div>
            <div className="flex flex-col gap-1 mb-4">
              <span className="text-gray-400 text-xs uppercase tracking-wider">{product.brand}</span>
              <b className="text-base text-gray-800">{product.name}</b>
              <p className="text-emerald-600 font-bold text-lg">
                ${product.price} {product.currency}
              </p>
            </div>
            <Link href={`/products/${product.id}`} className="w-full">
              <button className="w-full bg-blue-600 hover:bg-blue-700 text-white font-medium py-2 px-4 rounded-xl transition-colors">
                Ver detalles
              </button>
            </Link>
          </div>
        ))}
      </div>
    </main>
  );
}