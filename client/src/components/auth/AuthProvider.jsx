import { useState, useEffect } from "react";
import { verifyAuth, logout as logoutApi } from "../../services/api";
import { AuthContext } from "../../hooks/useAuth";

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    async function verifyToken() {
      try {
        setLoading(true);
        setError(null);
        const response = await verifyAuth();
        setUser(response.data);
      } catch (err) {
        setUser(null);
      } finally {
        setLoading(false);
      }
    }

    verifyToken();
  }, []);

  const logout = async () => {
    try {
      await logoutApi();
      setUser(null);
      window.location.href = "/";
    } catch (err) {
      setUser(null);
      window.location.href = "/";
    }
  };

  const value = { user, loading, error, setUser, logout };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}
