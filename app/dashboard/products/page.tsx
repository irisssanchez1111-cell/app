import Link from "next/link";
import { Table } from "@heroui/react";
import { getProducts } from "@/services/products-service";

export default async function ProductsPage() {
    const ProductsList = await getProducts();

return (
    <main className="p-6">

    <h1 className="text-2xl font-bold mb-4">
                Administración de productos
    </h1>

            <Link
                href="/dashboard/products/new"
                className="bg-blue-600 text-white px-4 py-2 rounded-lg"
            >
                Agregar producto
            </Link>

            <Table aria-label="Lista de productos">
                <Table.ScrollContainer>
                    <Table.Content
                        aria-label="Productos"
                        className="min-w-[1000px]"
                    >
                        <Table.Header>
                            <Table.Column isRowHeader>ID</Table.Column>
                            <Table.Column>Nombre</Table.Column>
                            <Table.Column>Descripción</Table.Column>
                            <Table.Column>Marca</Table.Column>
                            <Table.Column>Imagen</Table.Column>
                            <Table.Column>Precio</Table.Column>
                            <Table.Column>Moneda</Table.Column>
                            <Table.Column>Stock</Table.Column>
                            <Table.Column>Calificación</Table.Column>
                            <Table.Column>Acciones</Table.Column>
                        </Table.Header>

                        <Table.Body>
                            {ProductsList.map((product) => (
                                <Table.Row key={product.id}>
                                    <Table.Cell>{product.id}</Table.Cell>
                                    <Table.Cell>{product.name}</Table.Cell>
                                    <Table.Cell>{product.description}</Table.Cell>
                                    <Table.Cell>{product.brand}</Table.Cell>

                                    <Table.Cell>
                                        {product.cover ? (
                                            <img
                                                src={product.cover}
                                                alt={product.name}
                                                width={60}
                                                height={60}
                                            />
                                        ) : (
                                            "Sin imagen"
                                        )}
                                    </Table.Cell>

                                    <Table.Cell>{product.price}</Table.Cell>
                                    <Table.Cell>{product.currency}</Table.Cell>
                                    <Table.Cell>{product.stock}</Table.Cell>
                                    <Table.Cell>{product.rating}</Table.Cell>

                                    <Table.Cell>
                                        <Link
                                            href={`/dashboard/products/${product.id}/edit`}
                                            className="text-blue-600 underline"
                                        >
                                            Editar
                                        </Link>
                                    </Table.Cell>
                                </Table.Row>
                            ))}
                        </Table.Body>
                    </Table.Content>
                </Table.ScrollContainer>
            </Table>

        </main>
    );
}