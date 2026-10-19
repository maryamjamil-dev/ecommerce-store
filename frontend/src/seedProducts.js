import products from "./data/products.js";

const API_URL =
  import.meta.env.VITE_API_URL || "http://localhost:3000/api";

export async function seedProducts() {
  const productsToSeed = products.map((product) => ({
    title: product.title,
    category: product.category,
    brand: product.brand,
    price: Number(product.price),
    oldPrice:
      product.oldPrice == null ? undefined : Number(product.oldPrice),
    rating: Number(product.rating) || 0,
    reviews: Number(product.reviews) || 0,
    discount: product.discount || "",
    image: product.image,
    description: product.description || `${product.title} from ${product.brand}.`,
    stock: 10,
  }));

  const response = await fetch(`${API_URL}/products/seed`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ products: productsToSeed }),
  });

  const data = await response.json();

  if (!response.ok || !data.success) {
    throw new Error(data.message || "Products could not be seeded");
  }

  return data;
}
