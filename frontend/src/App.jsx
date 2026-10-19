import React, { useEffect } from "react";
import { BrowserRouter } from "react-router-dom";

import AppRoutes from "./routes/AppRoutes";

import { CartProvider } from "./context/CartContext";
import { WishlistProvider } from "./context/WishlistContext";
import { AuthProvider } from "./context/AuthContext";

import { seedProducts } from "./seedProducts";

export default function App() {
  useEffect(() => {
    seedProducts()
      .then((result) => {
        console.log("Products seeding result:", result);
      })
      .catch((error) => {
        console.error("Products seeding error:", error.message);
      });
  }, []);

  return (
    <BrowserRouter>
      <CartProvider>
        <WishlistProvider>
          <AuthProvider>
            <AppRoutes />
          </AuthProvider>
        </WishlistProvider>
      </CartProvider>
    </BrowserRouter>
  );
}
