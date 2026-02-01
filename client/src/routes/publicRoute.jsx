import { Navigate, Outlet } from "react-router-dom";
import { useEffect, useState } from "react";
import api from "../api/axios";
import { API } from "../constants/apiEndpoints";

const PublicRoute = () => {
  const [loading, setLoading] = useState(true);
  const [isAuth, setIsAuth] = useState(false);

  useEffect(() => {
    const checkAuth = async () => {
      try {
        const res = await api.get(API.USERS.PROFILE);
        setIsAuth(res.data?.success === true);
      } catch {
        setIsAuth(false);
      } finally {
        setLoading(false);
      }
    };

    checkAuth();
  }, []);

  if (loading) return null;

  return isAuth ? <Navigate to="/jobs" replace /> : <Outlet />;
};

export default PublicRoute;
