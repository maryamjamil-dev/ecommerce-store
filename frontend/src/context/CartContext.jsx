import React, {
  createContext,
  useContext,
  useEffect,
  useMemo,
  useRef,
  useState,
  useCallback,
} from "react";

const CartContext = createContext(null);

// localStorage sirf GUEST (login ke baghair) cart ke liye hai
const CART_STORAGE_KEY = "voltora-cart";
const API_URL =
  import.meta.env.VITE_API_URL || "http://localhost:3000/api";

const OBJECT_ID_REGEX = /^[a-f\d]{24}$/i;

const getProductId = (product) =>
  String(product?._id ?? product?.id ?? "");

// Backend sirf MongoDB ObjectId wale products ko cart mein rakh sakta hai
const isValidProductId = (id) => OBJECT_ID_REGEX.test(String(id));

const loadGuestCart = () => {
  try {
    const savedCart = localStorage.getItem(CART_STORAGE_KEY);
    if (!savedCart) return [];

    const parsedCart = JSON.parse(savedCart);
    if (!Array.isArray(parsedCart)) return [];

    return parsedCart.filter(
      (item) =>
        item?.product &&
        isValidProductId(getProductId(item.product)) &&
        Number(item.quantity) > 0
    );
  } catch (error) {
    console.error("Unable to load saved cart:", error);
    return [];
  }
};

const clearGuestCart = () => {
  try {
    localStorage.removeItem(CART_STORAGE_KEY);
  } catch (error) {
    console.error("Unable to clear saved cart:", error);
  }
};

const mapServerItems = (items = []) =>
  items
    .filter((item) => item.product)
    .map((item) => ({
      product: {
        ...item.product,
        id: getProductId(item.product),
      },
      quantity: Number(item.quantity) || 1,
    }));

async function cartRequest(path, options = {}) {
  const response = await fetch(`${API_URL}/cart${path}`, {
    credentials: "include",
    ...options,
    headers: {
      "Content-Type": "application/json",
      ...(options.headers || {}),
    },
  });

  const data = await response.json().catch(() => ({}));

  if (!response.ok) {
    const error = new Error(data.message || "Cart request failed");
    error.status = response.status;
    throw error;
  }

  return data;
}

export function CartProvider({ children }) {
  const [cartItems, setCartItems] = useState(loadGuestCart);
  const [cartLoading, setCartLoading] = useState(false);
  const [cartError, setCartError] = useState("");

  // true = user login hai, cart ka asal data server par hai
  const isLoggedInRef = useRef(false);
  // Ek waqt mein sirf ek "load cart" chale (double merge se bachne ke liye)
  const inflightRef = useRef(null);

  // Guest cart ko localStorage mein save karein. Login ke baad save nahi hota.
  useEffect(() => {
    if (isLoggedInRef.current) return;

    try {
      localStorage.setItem(CART_STORAGE_KEY, JSON.stringify(cartItems));
    } catch (error) {
      console.error("Unable to save cart:", error);
    }
  }, [cartItems]);

  const applyServerCart = useCallback((cart) => {
    setCartItems(mapServerItems(cart?.items));
  }, []);

  // Server cart load karein. Guest items hon to pehle unhein merge karein.
  const loadServerCart = useCallback(async () => {
    const guestItems = loadGuestCart();

    // Agar user login nahi, yahan 401 ka error throw hoga
    let data = await cartRequest("");
    isLoggedInRef.current = true;

    if (guestItems.length > 0) {
      data = await cartRequest("/merge", {
        method: "POST",
        body: JSON.stringify({
          items: guestItems.map((item) => ({
            productId: getProductId(item.product),
            quantity: Number(item.quantity),
          })),
        }),
      });
    }

    clearGuestCart();
    applyServerCart(data.cart);
  }, [applyServerCart]);

  const refreshCart = useCallback(() => {
    if (inflightRef.current) return inflightRef.current;

    setCartLoading(true);

    const promise = (async () => {
      try {
        await loadServerCart();
      } catch (error) {
        if (error.status === 401) {
          // Guest user: local cart hi chalega
          isLoggedInRef.current = false;
        } else {
          console.warn("Could not load server cart:", error.message);
        }
      } finally {
        setCartLoading(false);
        inflightRef.current = null;
      }
    })();

    inflightRef.current = promise;
    return promise;
  }, [loadServerCart]);

  // Page khulte hi: agar user pehle se login hai to uska cart le aao
  useEffect(() => {
    refreshCart();
  }, [refreshCart]);

  // AuthContext login/logout par ye events bhejta hai (neeche snippet dekhein)
  useEffect(() => {
    const handleLogin = () => {
      refreshCart();
    };

    const handleLogout = () => {
      isLoggedInRef.current = false;
      clearGuestCart();
      setCartItems([]);
      setCartError("");
    };

    window.addEventListener("auth:login", handleLogin);
    window.addEventListener("auth:logout", handleLogout);

    return () => {
      window.removeEventListener("auth:login", handleLogin);
      window.removeEventListener("auth:logout", handleLogout);
    };
  }, [refreshCart]);

  // Login hai to server ko batao aur server ka cart hi asal maano.
  // Guest hai to kuch nahi karna, local cart kaafi hai.
  const syncWithServer = async (path, options) => {
    if (inflightRef.current) await inflightRef.current;

    if (!isLoggedInRef.current) {
      return { success: true, guest: true };
    }

    try {
      const data = await cartRequest(path, options);
      applyServerCart(data.cart);
      return { success: true };
    } catch (error) {
      if (error.status === 401) {
        // Session khatam: guest ki tarah chalte rahein
        isLoggedInRef.current = false;
        return { success: true, guest: true };
      }

      // Koi aur masla (jaise stock kam): server ka sahi cart wapas le aao
      setCartError(error.message);
      await refreshCart();
      return { success: false, message: error.message };
    }
  };

  const addToCart = async (product) => {
    const productId = getProductId(product);

    if (!isValidProductId(productId)) {
      const message = "This product cannot be added to the cart.";
      console.error(message, product);
      setCartError(message);
      return { success: false, message };
    }

    setCartError("");

    const normalizedProduct = {
      ...product,
      id: productId,
    };

    // Foran screen par dikhao
    setCartItems((currentItems) => {
      const existing = currentItems.find(
        (item) => getProductId(item.product) === productId
      );

      if (existing) {
        return currentItems.map((item) =>
          getProductId(item.product) === productId
            ? {
                ...item,
                product: normalizedProduct,
                quantity: item.quantity + 1,
              }
            : item
        );
      }

      return [...currentItems, { product: normalizedProduct, quantity: 1 }];
    });

    return syncWithServer("/items", {
      method: "POST",
      body: JSON.stringify({ productId, quantity: 1 }),
    });
  };

  const increaseQuantity = async (productId) => {
    const targetId = String(productId);

    const item = cartItems.find(
      (entry) => getProductId(entry.product) === targetId
    );

    if (!item) return;

    const nextQuantity = Number(item.quantity) + 1;

    setCartError("");

    setCartItems((currentItems) =>
      currentItems.map((entry) =>
        getProductId(entry.product) === targetId
          ? { ...entry, quantity: nextQuantity }
          : entry
      )
    );

    return syncWithServer(`/items/${targetId}`, {
      method: "PUT",
      body: JSON.stringify({ quantity: nextQuantity }),
    });
  };

  const decreaseQuantity = async (productId) => {
    const targetId = String(productId);

    const item = cartItems.find(
      (entry) => getProductId(entry.product) === targetId
    );

    if (!item) return;

    const nextQuantity = Number(item.quantity) - 1;

    if (nextQuantity <= 0) {
      return removeFromCart(targetId);
    }

    setCartError("");

    setCartItems((currentItems) =>
      currentItems.map((entry) =>
        getProductId(entry.product) === targetId
          ? { ...entry, quantity: nextQuantity }
          : entry
      )
    );

    return syncWithServer(`/items/${targetId}`, {
      method: "PUT",
      body: JSON.stringify({ quantity: nextQuantity }),
    });
  };

  const removeFromCart = async (productId) => {
    const targetId = String(productId);

    setCartError("");

    setCartItems((currentItems) =>
      currentItems.filter(
        (entry) => getProductId(entry.product) !== targetId
      )
    );

    return syncWithServer(`/items/${targetId}`, {
      method: "DELETE",
    });
  };

  const clearCart = async () => {
    setCartError("");
    setCartItems([]);

    return syncWithServer("", { method: "DELETE" });
  };

  const clearCartError = () => setCartError("");

  const cartCount = useMemo(
    () =>
      cartItems.reduce(
        (total, item) => total + Number(item.quantity || 0),
        0
      ),
    [cartItems]
  );

  const subtotal = useMemo(
    () =>
      cartItems.reduce(
        (total, item) =>
          total +
          Number(item.product.price || 0) * Number(item.quantity || 0),
        0
      ),
    [cartItems]
  );

  const shipping = subtotal === 0 || subtotal >= 100 ? 0 : 10;
  const total = subtotal + shipping;

  return (
    <CartContext.Provider
      value={{
        cartItems,
        addToCart,
        increaseQuantity,
        decreaseQuantity,
        removeFromCart,
        clearCart,
        refreshCart,
        cartLoading,
        cartError,
        clearCartError,
        cartCount,
        subtotal,
        shipping,
        total,
      }}
    >
      {children}
    </CartContext.Provider>
  );
}

export function useCart() {
  const context = useContext(CartContext);

  if (!context) {
    throw new Error("useCart must be used inside CartProvider");
  }

  return context;
}