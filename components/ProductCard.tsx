
"use client";

import Link from "next/link";
import type { Product } from "@/app/api/products/data";

interface Props {
  product: Product;
}

export function ProductCard({ product }: Props) {
  return (
    <div className="border rounded-2xl p-4 shadow-sm bg-white hover:shadow-md transition-shadow flex flex-col justify-between">
      <div>
        <div className="overflow-hidden rounded-lg mb-3">
          <img
            alt={product.name}
            className="w-full object-cover h-[200px] rounded-lg"
            src={product.cover}
          />
        </div>

        <div className="flex flex-col gap-1 mb-4">
          <span className="text-gray-400 text-xs uppercase tracking-wider">
            {product.brand}
          </span>

          <b className="text-base text-gray-800">
            {product.name}
          </b>

          <p className="text-emerald-600 font-bold text-lg">
            ${product.price} {product.currency}
          </p>

          <p className="text-sm text-gray-600">
            {product.description}
          </p>

          <p className="text-sm">
            ⭐ {product.rating}
          </p>
        </div>
      </div>

      <Link
        href={`/products/${product.id}`}
        className="w-full text-center bg-blue-600 hover:bg-blue-700 text-white font-medium py-2 px-4 rounded-xl transition-colors"
      >
        Ver detalles
      </Link>
    </div>
  );
}
