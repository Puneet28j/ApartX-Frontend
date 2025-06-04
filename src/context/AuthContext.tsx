import { createContext, useContext, useEffect, useState } from "react";
import axios from "axios";
import { Navigate, Outlet, useNavigate } from "react-router-dom";

interface AuthContextType {
  isAuthenticated: boolean;
  userRole: string | null;
  loading: boolean;
  login: (token: string, role: string) => void;
  logout: () => void;
  checkAuthStatus: () => Promise<void>;
}

export const AuthContext = createContext<AuthContextType>({
  isAuthenticated: false,
  userRole: null,
  loading: true,
  login: () => {},
  logout: () => {},
  checkAuthStatus: async () => {},
});

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [userRole, setUserRole] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  const login = (token: string, role: string) => {
    localStorage.setItem("token", token);
    localStorage.setItem("role", role);
    setIsAuthenticated(true);
    setUserRole(role);
    if (role === "admin") {
      navigate("/admin");
    } else {
      navigate("/main-screen");
    }
  };

  const logout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("role");
    setIsAuthenticated(false);
    setUserRole(null);
    navigate("/login-register");
  };

  const checkAuthStatus = async () => {
    const token = localStorage.getItem("token");
    const role = localStorage.getItem("role");

    if (!token || !role) {
      setLoading(false);
      return;
    }

    try {
      const response = await axios.get("/api/me", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      if (response.data.role === role) {
        setIsAuthenticated(true);
        setUserRole(role);
      } else {
        throw new Error("Role mismatch");
      }
    } catch (error) {
      localStorage.removeItem("token");
      localStorage.removeItem("role");
      setIsAuthenticated(false);
      setUserRole(null);
      navigate("/login-register");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    checkAuthStatus();
  }, []);

  const value = {
    isAuthenticated,
    userRole,
    loading,
    login,
    logout,
    checkAuthStatus,
  };

  return (
    <AuthContext.Provider value={value}>
      {!loading && children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};

export const UserRoute = () => {
  const { isAuthenticated, userRole, loading } = useAuth();

  if (loading) {
    return <div>Loading...</div>;
  }

  if (!isAuthenticated) {
    return <Navigate to="/login-register" replace />;
  }

  if (userRole === "admin") {
    return <Navigate to="/admin" replace />;
  }

  return <Outlet />;
};

export const AdminRoute = () => {
  const { isAuthenticated, userRole, loading } = useAuth();

  if (loading) {
    return <div>Loading...</div>;
  }

  if (!isAuthenticated) {
    return <Navigate to="/login-register" replace />;
  }

  if (userRole !== "admin") {
    return <Navigate to="/main-screen" replace />;
  }

  return <Outlet />;
};

export const PublicRoute = () => {
  const { isAuthenticated, userRole, loading } = useAuth();

  if (loading) {
    return <div>Loading...</div>;
  }

  if (isAuthenticated) {
    return (
      <Navigate to={userRole === "admin" ? "/admin" : "/main-screen"} replace />
    );
  }

  return <Outlet />;
};
