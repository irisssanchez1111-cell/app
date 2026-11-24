export interface Product {
  id: string;
  name: string;
  brand: string;
  price: number;
  currency: string;
  rating: number;
  cover: string;
  stock: number;
  description: string;
}

export const products: Product[] = [
  {
    id: "1",
    name: "Control Inalámbrico Play",
    brand: "GTZSP",
    price: 1029.00,
    currency: "USD",
    rating: 4.8,
    cover: "https://images.unsplash.com/photo-1600080972464-8e5f35f63d08?w=500&q=80",
    stock: 12,
    description: "Control ergonómico inalámbrico de alta precisión con respuesta háptica avanzada y batería de larga duración."
  },
  {
    id: "2",
    name: "Cámara Réflex Profesional",
    brand: "Canon",
    price: 850.00,
    currency: "USD",
    rating: 4.9,
    cover: "https://images.unsplash.com/photo-1516035069371-29a1b244cc32?w=500&q=80",
    stock: 5,
    description: "Cámara profesional con sensor CMOS de alta resolución, grabación en 4K y lente intercambiable."
  },
  {
    id: "3",
    name: "Lente VR NextGen",
    brand: "Oculus",
    price: 499.99,
    currency: "USD",
    rating: 4.7,
    cover: "https://images.unsplash.com/photo-1593508512255-86ab42a8e620?auto=format&fit=crop&w=500&q=80",
    stock: 8,
    description: "Visor de realidad virtual autónomo con procesador ultra rápido y pantallas 4K integradas por ojo."
  },
];