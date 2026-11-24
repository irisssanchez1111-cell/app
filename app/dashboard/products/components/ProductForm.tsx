"use client";

import {
  Button,
  FieldError,
  Form,
  Input,
  Label,
  TextField
} from "@heroui/react";

import { Product } from "@/services/products-service";
import { SyntheticEvent } from "react";
import {
  saveProduct,
  updateProduct
} from "@/services/products-service";

import { useRouter } from "next/navigation";

interface Props {
  product?: Product;
}

export function ProductForm({ product }: Props) {

  const router = useRouter();

  async function handleSubmit(e: SyntheticEvent<HTMLFormElement>) {
    e.preventDefault();

    const form = e.currentTarget;
    const formData = new FormData(form);
    const ProductData = Object.fromEntries(formData);

    console.log("Datos:", ProductData);

   
    const campos = [
      "name",
      "brand",
      "price",
      "currency",
      "rating",
      "stock"
    ];

    for (const campo of campos) {
      if (!String(ProductData[campo] ?? "").trim()) {
        alert("Completa todos los campos obligatorios.");
        return;
      }
    }

    // VALIDAR VALORES NUMÉRICOS
    const price = Number(ProductData.price);
    const rating = Number(ProductData.rating);
    const stock = Number(ProductData.stock);

    if (
      !Number.isFinite(price) ||
      price < 0 ||
      !Number.isFinite(rating) ||
      rating < 0 ||
      rating > 5 ||
      !Number.isInteger(stock) ||
      stock < 0
    ) {
      alert("Verifica el precio, stock y calificación.");
      return;
    }

    try {

      if (product?.id !== undefined) {
        const result = await updateProduct(
          product.id,
          ProductData as any
        );

        console.log(result);
        alert("¡Producto actualizado correctamente!");

      } else {
        const result = await saveProduct(
          ProductData as any
        );

        console.log(result);
        alert("¡Producto guardado correctamente!");
      }

      // REGRESAR A LA LISTA DE PRODUCTOS
      router.push("/dashboard/products");
      router.refresh();

    } catch (error) {
      console.error("Error al guardar el producto:", error);
      alert("Hubo un error al guardar el producto. Revisa la consola.");
    }
  }

  return (
    <Form className="flex w-96 flex-col gap-4" onSubmit={handleSubmit}>

      <TextField isRequired name="name" defaultValue={product?.name} type="text">
        <Label>Nombre</Label>
        <Input placeholder="Nombre del producto" />
        <FieldError />
      </TextField>

      <TextField isRequired name="brand" defaultValue={product?.brand} type="text">
        <Label>Marca</Label>
        <Input placeholder="Marca" />
        <FieldError />
      </TextField>

      <TextField isRequired name="price" defaultValue={product?.price?.toString()} type="number">
        <Label>Precio</Label>
        <Input placeholder="0.00" min={0} step="0.01" />
        <FieldError />
      </TextField>

      <TextField isRequired name="currency" defaultValue={product?.currency} type="text">
        <Label>Moneda</Label>
        <Input placeholder="MXN" />
        <FieldError />
      </TextField>

      <TextField isRequired name="rating" defaultValue={product?.rating?.toString()} type="number">
        <Label>Calificación (0 a 5)</Label>
        <Input placeholder="4.5" min={0} max={5} step="0.1" />
        <FieldError />
      </TextField>

      <TextField isRequired name="stock" defaultValue={product?.stock?.toString()} type="number">
        <Label>Stock</Label>
        <Input placeholder="0" min={0} step="1" />
        <FieldError />
      </TextField>

      <TextField name="cover" defaultValue={product?.cover} type="text">
        <Label>Imagen (URL)</Label>
        <Input placeholder="https://..." />
        <FieldError />
      </TextField>

      <TextField name="description" defaultValue={product?.description} type="text">
        <Label>Descripción</Label>
        <Input placeholder="Descripción del producto" />
        <FieldError />
      </TextField>

      <Button type="submit" variant="primary">
        {product ? "Actualizar" : "Guardar"}
      </Button>

    </Form>
  );
}