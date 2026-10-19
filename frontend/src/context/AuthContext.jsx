import React, {
  createContext,
  useContext,
  useEffect,
  useMemo,
  useState,
} from "react";
import api from "../api/axios";

const AuthContext = createContext(null);

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  // Check whether a valid login cookie already exists.
  useEffect(() => {
    let isMounted = true;

    const loadCurrentUser = async () => {
      try {
        const response = await api.get("/auth/me");

        if (isMounted && response.data.success) {
          setUser(response.data.user);
        }
      } catch {
        if (isMounted) {
          setUser(null);
        }
      } finally {
        if (isMounted) {
          setIsLoading(false);
        }
      }
    };

    loadCurrentUser();

    return () => {
      isMounted = false;
    };
  }, []);

  // Create account and request an email verification code.
  const register = async (userData) => {
    try {
      const response = await api.post("/auth/register", {
        username: userData.username || userData.name,
        email: userData.email,
        password: userData.password,
      });

      if (!response.data.success) {
        return {
          success: false,
          message: response.data.message || "Registration failed.",
        };
      }

      // Your backend has a separate send-code endpoint.
      await api.post("/auth/send-code", {
        email: userData.email.trim().toLowerCase(),
      });

      return {
        success: true,
        message: "Account created. Check your email for the verification code.",
        user: response.data.user,
      };
    } catch (error) {
      return {
        success: false,
        message:
          error.response?.data?.message ||
          "Unable to create your account. Please try again.",
      };
    }
  };

  // Log in through the backend.
  const login = async (email, password) => {
    try {
      const response = await api.post("/auth/login", {
        email,
        password,
      });

      if (!response.data.success) {
        return {
          success: false,
          message: response.data.message || "Login failed.",
        };
      }

      setUser(response.data.user);

      return {
        success: true,
        message: response.data.message || "Login successful.",
        user: response.data.user,
      };
    } catch (error) {
      return {
        success: false,
        message:
          error.response?.data?.message ||
          "Unable to log in. Please try again.",
      };
    }
  };

  // Clear the backend cookie and local user state.
  const logout = async () => {
    try {
      await api.post("/auth/logout");
    } catch (error) {
      console.error("Logout request failed:", error);
    } finally {
      setUser(null);
    }
  };

  const isAuthenticated = useMemo(() => Boolean(user), [user]);

  return (
    <AuthContext.Provider
      value={{
        user,
        isLoading,
        register,
        login,
        logout,
        isAuthenticated,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);

  if (!context) {
    throw new Error("useAuth must be used inside AuthProvider");
  }

  return context;
}
