import axios from "axios";

interface CreateInvestmentResponse {
  message: string;
  investment: {
    _id: string;
    userId: string;
    planId: string;
    amount: number;
    roi: number;
    dailyEarning: number;
    totalDays: number;
    startDate: string;
    endDate: string;
    status: "active" | "completed" | "cancelled";
  };
}

export const investmentService = {
  async fetchPlans() {
    try {
      const response = await axios.get(`${import.meta.env.VITE_URL}/plans`);
      return response.data.plans;
    } catch (error: any) {
      throw new Error(error.response?.data?.message || "Failed to fetch plans");
    }
  },

  async createInvestment(
    planId: string,
    amount: number
  ): Promise<CreateInvestmentResponse> {
    const token = localStorage.getItem("token");
    if (!token) {
      throw new Error("Please login to continue");
    }

    try {
      const response = await axios.post<CreateInvestmentResponse>(
        `${import.meta.env.VITE_URL}/invest`,
        {
          planId,
          amount: Number(amount),
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        }
      );

      // Validate response data
      if (!response.data.investment || !response.data.investment.totalDays) {
        throw new Error("Invalid investment data received from server");
      }

      return response.data;
    } catch (error: any) {
      console.error("Investment error:", error.response?.data);

      if (error.response?.status === 401) {
        throw new Error("Session expired. Please login again");
      }

      throw new Error(
        error.response?.data?.message ||
          error.response?.data?.error ||
          "Failed to create investment"
      );
    }
  },
};
