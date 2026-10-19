import React, {
  createContext,
  useContext,
  useEffect,
  useMemo,
  useRef,
  useState,
  useCallback,
} from "react";

const WishlistContext = createContext(null);

// localStorage sirf GUEST (login ke baghair) wishlist ke liye hai
const WISHLIST_STORAGE_KEY = "voltora-wishlist";
const API_URL =
  import.meta.env.VITE_API_URL || "http://localhost:3000/api";

const OBJECT_ID_REGEX = /^[a-f\d]{24}$/i;

const getProductId = (product) =>
  String(product?._id ?? product?.id ?? "");

// Backend sirf MongoDB ObjectId wale products ko wishlist mein rakh sakta hai
const isValidProductId = (id) => OBJECT_ID_REGEX.test(String(id));

const loadGuestWishlist = () => {
  try {
    const saved = localStorage.getItem(WISHLIST_STORAGE_KEY);
    if (!saved) return [];

    const parsed = JSON.parse(saved);
    if (!Array.isArray(parsed)) return [];

    return parsed.filter(
      (product) => product && isValidProductId(getProductId(product))
    );
  } catch (error) {
    console.error("Unable to load saved wishlist:", error);
    return [];
  }
};

const clearGuestWishlist = () => {
  try {
    localStorage.removeItem(WISHLIST_STORAGE_KEY);
  } catch (error) {
    console.error("Unable to clear saved wishlist:", error);
  }
};

const mapServerProducts = (products = []) =>
  products.filter(Boolean).map((product) => ({
    ...product,
    id: getProductId(product),
  }));

async function wishlistRequest(path, options = {}) {
  const response = await fetch(`${API_URL}/wishlist${path}`, {
    credentials: "include",
    ...options,
    headers: {
      "Content-Type": "application/json",
      ...(options.headers || {}),
    },
  });

  const data = await response.json().catch(() => ({}));

  if (!response.ok) {
    const error = new Error(data.message || "Wishlist request failed");
    error.status = response.status;
    throw error;
  }

  return data;
}

export function WishlistProvider({ children }) {
  const [wishlistItems, setWishlistItems] = useState(loadGuestWishlist);
  const [wishlistLoading, setWishlistLoading] = useState(false);
  const [wishlistError, setWishlistError] = useState("");

  // true = user login hai, wishlist ka asal data server par hai
  const isLoggedInRef = useRef(false);
  // Ek waqt mein sirf ek "load wishlist" chale (double merge se bachne ke liye)
  const inflightRef = useRef(null);

  // Guest wishlist ko localStorage mein save karein. Login ke baad save nahi hota.
  useEffect(() => {
    if (isLoggedInRef.current) return;

    try {
      localStorage.setItem(
        WISHLIST_STORAGE_KEY,
        JSON.stringify(wishlistItems)
      );
    } catch (error) {
      console.error("Unable to save wishlist:", error);
    }
  }, [wishlistItems]);

  const applyServerWishlist = useCallback((wishlist) => {
    setWishlistItems(mapServerProducts(wishlist?.products));
  }, []);

  // Server wishlist load karein. Guest items hon to pehle unhein merge karein.
  const loadServerWishlist = useCallback(async () => {
    const guestItems = loadGuestWishlist();

    // Agar user login nahi, yahan 401 ka error throw hoga
    let data = await wishlistRequest("");
    isLoggedInRef.current = true;

    if (guestItems.length > 0) {
      data = await wishlistRequest("/merge", {
        method: "POST",
        body: JSON.stringify({
          productIds: guestItems.map((product) => getProductId(product)),
        }),
      });
    }

    clearGuestWishlist();
    applyServerWishlist(data.wishlist);
  }, [applyServerWishlist]);

  const refreshWishlist = useCallback(() => {
    if (inflightRef.current) return inflightRef.current;

    setWishlistLoading(true);

    const promise = (async () => {
      try {
        await loadServerWishlist();
      } catch (error) {
        if (error.status === 401) {
          // Guest user: local wishlist hi chalegi
          isLoggedInRef.current = false;
        } else {
          console.warn("Could not load server wishlist:", error.message);
        }
      } finally {
        setWishlistLoading(false);
        inflightRef.current = null;
      }
    })();

    inflightRef.current = promise;
    return promise;
  }, [loadServerWishlist]);

  // Page khulte hi: agar user pehle se login hai to uski wishlist le aao
  useEffect(() => {
    refreshWishlist();
  }, [refreshWishlist]);

  // AuthContext login/logout par ye events bhejta hai (cart wale same events)
  useEffect(() => {
    const handleLogin = () => {
      refreshWishlist();
    };

    const handleLogout = () => {
      isLoggedInRef.current = false;
      clearGuestWishlist();
      setWishlistItems([]);
      setWishlistError("");
    };

    window.addEventListener("auth:login", handleLogin);
    window.addEventListener("auth:logout", handleLogout);

    return () => {
      window.removeEventListener("auth:login", handleLogin);
      window.removeEventListener("auth:logout", handleLogout);
    };
  }, [refreshWishlist]);

  // Login hai to server ko batao aur server ki wishlist hi asal maano.
  // Guest hai to kuch nahi karna, local wishlist kaafi hai.
  const syncWithServer = async (path, options) => {
    if (inflightRef.current) await inflightRef.current;

    if (!isLoggedInRef.current) {
      return { success: true, guest: true };
    }

    try {
      const data = await wishlistRequest(path, options);
      applyServerWishlist(data.wishlist);
      return { success: true };
    } catch (error) {
      if (error.status === 401) {
        // Session khatam: guest ki tarah chalte rahein
        isLoggedInRef.current = false;
        return { success: true, guest: true };
      }

      // Koi aur masla: server ki sahi wishlist wapas le aao
      setWishlistError(error.message);
      await refreshWishlist();
      return { success: false, message: error.message };
    }
  };

  const isInWishlist = useCallback(
    (productId) =>
      wishlistItems.some(
        (product) => getProductId(product) === String(productId)
      ),
    [wishlistItems]
  );

  const addToWishlist = async (product) => {
    const productId = getProductId(product);

    if (!isValidProductId(productId)) {
      const message = "This product cannot be added to the wishlist.";
      console.error(message, product);
      setWishlistError(message);
      return { success: false, message };
    }

    // Pehle se wishlist mein hai to kuch nahi karna
    if (isInWishlist(productId)) {
      return { success: true };
    }

    setWishlistError("");

    setWishlistItems((currentItems) => [
      ...currentItems,
      { ...product, id: productId },
    ]);

    return syncWithServer("", {
      method: "POST",
      body: JSON.stringify({ productId }),
    });
  };

  const removeFromWishlist = async (productId) => {
    const targetId = String(productId);

    setWishlistError("");

    setWishlistItems((currentItems) =>
      currentItems.filter((product) => getProductId(product) !== targetId)
    );

    return syncWithServer(`/${targetId}`, { method: "DELETE" });
  };

  // Heart button ke liye: hai to hata do, nahi hai to add kar do
  const toggleWishlist = async (product) => {
    const productId = getProductId(product);

    if (isInWishlist(productId)) {
      return removeFromWishlist(productId);
    }

    return addToWishlist(product);
  };

  const clearWishlist = async () => {
    setWishlistError("");
    setWishlistItems([]);

    return syncWithServer("/clear", { method: "DELETE" });
  };

  const clearWishlistError = () => setWishlistError("");

  const wishlistCount = useMemo(
    () => wishlistItems.length,
    [wishlistItems]
  );

  return (
    <WishlistContext.Provider
      value={{
        wishlistItems,
        wishlistCount,
        wishlistLoading,
        wishlistError,
        clearWishlistError,
        isInWishlist,
        addToWishlist,
        removeFromWishlist,
        toggleWishlist,
        clearWishlist,
        refreshWishlist,
      }}
    >
      {children}
    </WishlistContext.Provider>
  );
}

export function useWishlist() {
  const context = useContext(WishlistContext);

  if (!context) {
    throw new Error("useWishlist must be used inside WishlistProvider");
  }

  return context;
}