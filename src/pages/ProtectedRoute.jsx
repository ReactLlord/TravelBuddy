import { useEffect, useState } from "react";
import { Navigate } from "react-router-dom";
import { getSession } from "../components/Auth/auth"; // your supabase auth.js

const ProtectedRoute = ({ children }) => {
  const [loading, setLoading] = useState(true);
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  useEffect(() => {
    const checkSession = async () => {
      const { session } = await getSession();
      if (session) {
        setIsAuthenticated(true);
      }
      setLoading(false);
    };

    checkSession();
  }, []);

  if (loading) return <p>Loading...</p>;

  return isAuthenticated ? children : <Navigate to="/" />;
};

export default ProtectedRoute;
