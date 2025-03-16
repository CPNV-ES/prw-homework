import { createContext, useContext } from "react";

export const AuthContext = createContext({
  user: null,
  loading: false,
  error: null,
  setUser: () => {},
  logout: () => {},
});

export function useAuth() {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
}
