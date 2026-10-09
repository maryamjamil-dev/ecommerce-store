import React, {
  createContext,
  useContext,
  useEffect,
  useMemo,
  useState,
} from "react";

const AuthContext = createContext();

export function AuthProvider({ children }) {
  const [user, setUser] = useState(() => {
    const savedUser = localStorage.getItem("voltora-user");

    return savedUser ? JSON.parse(savedUser) : null;
  });

  const [registeredUser, setRegisteredUser] = useState(() => {
    const savedRegisteredUser =
      localStorage.getItem("voltora-registered-user");

    return savedRegisteredUser
      ? JSON.parse(savedRegisteredUser)
      : null;
  });

  useEffect(() => {
    if (user) {
      localStorage.setItem(
        "voltora-user",
        JSON.stringify(user)
      );
    } else {
      localStorage.removeItem("voltora-user");
    }
  }, [user]);

  const register = (userData) => {
    const newUser = {
      id: Date.now(),
      name: userData.name,
      email: userData.email,
      password: userData.password,
    };

    localStorage.setItem(
      "voltora-registered-user",
      JSON.stringify(newUser)
    );

    setRegisteredUser(newUser);

    return {
      success: true,
      message: "Account created successfully.",
    };
  };

  const login = (email, password) => {
    const savedUser = localStorage.getItem(
      "voltora-registered-user"
    );

    if (!savedUser) {
      return {
        success: false,
        message: "No account found. Please create an account first.",
      };
    }

    const account = JSON.parse(savedUser);

    if (
      account.email !== email ||
      account.password !== password
    ) {
      return {
        success: false,
        message: "Invalid email or password.",
      };
    }

    const loggedInUser = {
      id: account.id,
      name: account.name,
      email: account.email,
    };

    setUser(loggedInUser);

    return {
      success: true,
      message: "Login successful.",
    };
  };

  const logout = () => {
    setUser(null);
  };

  const isAuthenticated = useMemo(() => {
    return Boolean(user);
  }, [user]);

  return (
    <AuthContext.Provider
      value={{
        user,
        registeredUser,
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
    throw new Error(
      "useAuth must be used inside AuthProvider"
    );
  }

  return context;
}