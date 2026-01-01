import { useEffect } from "react";
import { useLocation } from "wouter";

interface ProtectedRouteProps {
  children: React.ReactNode;
  requiredRole?: "admin" | "user";
}

export function ProtectedRoute({ children, requiredRole = "admin" }: ProtectedRouteProps) {
  const [, navigate] = useLocation();

  useEffect(() => {
    // Check if admin token exists in localStorage
    const adminToken = localStorage.getItem("adminToken");
    
    if (!adminToken) {
      // Not authenticated, redirect to login
      navigate("/admin/login");
      return;
    }

    try {
      const token = JSON.parse(adminToken);
      
      // Check if token is expired (24 hours)
      const tokenAge = Date.now() - token.timestamp;
      const twentyFourHours = 24 * 60 * 60 * 1000;
      
      if (tokenAge > twentyFourHours) {
        // Token expired, clear and redirect
        localStorage.removeItem("adminToken");
        navigate("/admin/login");
        return;
      }

      // Check role if required
      if (requiredRole && token.role !== requiredRole) {
        navigate("/");
        return;
      }
    } catch (error) {
      // Invalid token, clear and redirect
      localStorage.removeItem("adminToken");
      navigate("/admin/login");
    }
  }, [navigate, requiredRole]);

  return <>{children}</>;
}

export default ProtectedRoute;
