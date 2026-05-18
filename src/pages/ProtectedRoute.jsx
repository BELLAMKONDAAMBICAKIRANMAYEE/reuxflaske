import React, { useEffect, useState } from "react";
import { Navigate } from "react-router-dom";
import axios from "axios";

function ProtectedRoute({ children }) {
  const [isAuth, setIsAuth] = useState(null);

  useEffect(() => {
    axios
      .get("https://ecomflask.duckdns.org/api/admin/me", {
        withCredentials: true,
      })
      .then(() => setIsAuth(true))
      .catch(() => setIsAuth(false));
  }, []);

  if (isAuth === null) return <h3>Loading...</h3>;

  return isAuth ? children : <Navigate to="/login" />;
}

export default ProtectedRoute;