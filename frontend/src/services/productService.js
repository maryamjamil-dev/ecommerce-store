const API_URL = "http://localhost:3000/api/products";

// Saare products fetch karna
export async function getProducts() {
  const response = await fetch(API_URL);
  const data = await response.json();

  if (!response.ok) {
    throw new Error(data.message || "Products fetch nahi ho sake.");
  }

  return data.products;
}

// Single product fetch karna
export async function getProductById(id) {
  const response = await fetch(`${API_URL}/${id}`);
  const data = await response.json();

  if (!response.ok) {
    throw new Error(data.message || "Product fetch nahi hua.");
  }

  return data.product;
}
