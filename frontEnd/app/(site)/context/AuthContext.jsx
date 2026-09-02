"use client";

import {
  createContext,
  useContext,
  useEffect,
  useState,
} from "react";

const AuthContext = createContext();

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);

  const [loading, setLoading] = useState(true);

  // ============================
  // گرفتن اطلاعات کاربر از سرور
  // ============================
  const fetchMe = async () => {
    try {
      const res = await fetch(
        "http://localhost:5000/api/auth/me",
        {
          credentials: "include",
        }
      );

      if (!res.ok) {
        setUser(null);
        return;
      }

      const data = await res.json();

      setUser(data.user);
    } catch (err) {
      console.log(err);
      setUser(null);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchMe();
  }, []);

  // ============================
  // بعد از Login
  // ============================
  const login = (userData) => {
    setUser(userData);
  };

  // ============================
  // خروج
  // ============================
  const logout = async () => {
    try {
      await fetch(
        "http://localhost:5000/api/auth/logout",
        {
          method: "POST",
          credentials: "include",
        }
      );
    } catch (err) {
      console.log(err);
    }

    setUser(null);
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        loading,
        login,
        logout,
        refreshUser: fetchMe,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  return useContext(AuthContext);
}