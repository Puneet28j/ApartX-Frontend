import { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { toast } from "sonner";

interface SendCurrencyData {
  _id: string;
  userId: {
    name: string;
    email: string;
    mobile: string;
  };
  amount: number;
  wallet: string;
  walletID: string;
  status: string;
  remark: string;
  screenshot: string;
  createdAt: string;
}

// Create axios instance with default config
const axiosInstance = axios.create({
  baseURL: import.meta.env.VITE_URL,
  headers: {
    "Content-Type": "application/json",
  },
});

// Add request interceptor
axiosInstance.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("token");
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

export const useSendCurrency = () => {
  const [data, setData] = useState<SendCurrencyData[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const navigate = useNavigate();

  const fetchData = async () => {
    try {
      setLoading(true);
      setError(null);

      const response = await axiosInstance.get("/send-currency");

      if (!response.data) {
        throw new Error("No data received from server");
      }

      const dataArray = Array.isArray(response.data)
        ? response.data
        : response.data.data;

      if (!Array.isArray(dataArray)) {
        throw new Error(`Invalid data format. Expected array`);
      }

      setData(dataArray);
    } catch (error: any) {
      const errorMessage = error.response?.data?.message || error.message;
      console.error("Error fetching data:", errorMessage);

      if (error.response?.status === 401) {
        localStorage.removeItem("token");
        localStorage.removeItem("role");
        toast.error("Session expired. Please login again.");
        navigate("/login-register");
      } else {
        toast.error(errorMessage);
      }

      setError(errorMessage);
      setData([]);
    } finally {
      setLoading(false);
    }
  };

  const updateStatus = async (id: string, status: string, remark: string) => {
    try {
      const token = localStorage.getItem("token");
      if (!token) {
        toast.error("Session expired. Please login again.");
        navigate("/login-register");
        throw new Error("Authorization token missing");
      }

      const response = await axiosInstance.put(`/send-currency/${id}`, {
        status,
        remark: remark || undefined,
      });

      if (response.data.success) {
        await fetchData();
        return true;
      }

      throw new Error(response.data.message || "Failed to update status");
    } catch (error: any) {
      const errorMessage = error.response?.data?.message || error.message;
      console.error("Error updating status:", errorMessage);

      if (error.response?.status === 401) {
        localStorage.removeItem("token");
        localStorage.removeItem("role");
        toast.error("Session expired. Please login again.");
        navigate("/login-register");
      } else {
        toast.error(errorMessage);
      }

      throw error;
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  return { data, loading, error, refresh: fetchData, updateStatus };
};

export const useReceiveCurrency = () => {
  const [wallets, setWallets] = useState<string[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const navigate = useNavigate();

  const fetchWallets = async () => {
    try {
      setLoading(true);
      setError(null);

      const token = localStorage.getItem("token");
      if (!token) {
        throw new Error("Please login again");
      }

      const response = await axiosInstance.get("/receive");

      if (response.data && Array.isArray(response.data.wallets)) {
        setWallets(response.data.wallets);
      } else {
        throw new Error("Invalid wallet data format");
      }
    } catch (error: any) {
      const errorMessage = error.response?.data?.message || error.message;
      console.error("Error fetching wallets:", errorMessage);

      if (error.response?.status === 401) {
        localStorage.removeItem("token");
        localStorage.removeItem("role");
        toast.error("Session expired. Please login again.");
        navigate("/login-register");
      } else {
        toast.error(errorMessage);
      }

      setError(errorMessage);
    } finally {
      setLoading(false);
    }
  };

  const updateReceiveStatus = async (
    id: string,
    status: string,
    remark: string
  ) => {
    try {
      const token = localStorage.getItem("token");
      if (!token) {
        toast.error("Session expired. Please login again.");
        navigate("/login-register");
        throw new Error("Authorization token missing");
      }

      const response = await axiosInstance.put(`/receive/${id}`, {
        status,
        remark: remark || undefined,
      });

      if (response.data.success) {
        await fetchWallets();
        return true;
      }

      throw new Error(response.data.message || "Failed to update status");
    } catch (error: any) {
      const errorMessage = error.response?.data?.message || error.message;
      console.error("Error updating receive status:", errorMessage);

      if (error.response?.status === 401) {
        localStorage.removeItem("token");
        localStorage.removeItem("role");
        toast.error("Session expired. Please login again.");
        navigate("/login-register");
      } else {
        toast.error(errorMessage);
      }

      throw error;
    }
  };

  useEffect(() => {
    fetchWallets();
  }, []);

  return {
    wallets,
    loading,
    error,
    refresh: fetchWallets,
    updateReceiveStatus,
  };
};
