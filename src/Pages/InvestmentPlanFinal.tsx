import { Button } from "@/components/ui/button";
import { ArrowLeft, TrendingUp } from "lucide-react";
import { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import USDTLogo from "../assets/usdt logo.svg";

import { toast } from "sonner";

type Tariff = {
  value: string;
  label: string;
  rate: string;
  duration: string;
  minAmount: number;
  maxAmount: number;
};

const tariffs: Tariff[] = [
  {
    value: "gold",
    label: "GOLD",
    rate: "1.5%",
    duration: "Day",
    minAmount: 50,
    maxAmount: 500,
  },
  {
    value: "diamond",
    label: "Diamond",
    rate: "2%",
    duration: "Day",
    minAmount: 501,
    maxAmount: 5000,
  },
  {
    value: "platinum",
    label: "Platinum",
    rate: "3%",
    duration: "Day",
    minAmount: 5001,
    maxAmount: 25000,
  },
  {
    value: "master",
    label: "Master",
    rate: "5%",
    duration: "Day",
    minAmount: 25000,
    maxAmount: 100000,
  },
];

const InvestmentPlanFinal = () => {
  const location = useLocation();
  const navigate = useNavigate();

  // Get passed data from previous screen
  const { selectedTariff, amount } = location.state || {
    selectedTariff: tariffs[0],
    amount: tariffs[0].minAmount,
  };

  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string>("");

  // Validate the amount based on tariff limits
  const validateAmount = (
    value: number,
    tariff: Tariff = selectedTariff
  ): boolean => {
    if (value < tariff.minAmount) {
      setError(
        `Amount must be at least ${tariff.minAmount.toLocaleString()} USD`
      );
      return false;
    }

    if (tariff.value !== "master" && value > tariff.maxAmount) {
      setError(
        `Amount must not exceed ${tariff.maxAmount.toLocaleString()} USD`
      );
      return false;
    }
    if (tariff.value === "master" && value > tariff.maxAmount) {
      setError(
        `Amount must not exceed ${tariff.maxAmount.toLocaleString()} USD`
      );
      return false;
    }
    if (isNaN(value) || value <= 0) {
      setError("Please enter a valid amount");
      return false;
    }
    if (value % 1 !== 0) {
      setError("Amount must be a whole number");
      return false;
    }

    setError("");
    return true;
  };

  const handleInvestment = async () => {
    if (!validateAmount(amount)) {
      return;
    }

    setIsLoading(true);
    try {
      // Here you would make the actual API call
      //   const investmentData = {
      //     planName: selectedTariff.label,
      //     amount: amount,
      //     rate: selectedTariff.rate,
      //     duration: selectedTariff.duration,
      //   };

      // Uncomment and modify this according to your API
      // const response = await api.post("/investment/create", investmentData);

      // For now, just show success message
      toast.success("Investment created successfully!");
      navigate("/profile");
    } catch (error: any) {
      toast.error(
        error.response?.data?.message || "Failed to create investment"
      );
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="flex flex-col h-full w-full bg-[#070707] px-4 pt-6 pb-28 relative">
      {/* Back Button and Line */}
      <div className="flex flex-col gap-2 mb-6">
        <button
          onClick={() => navigate(-1)}
          className="flex items-center gap-2 text-white text-sm"
        >
          <ArrowLeft size={20} className="h-8 w-8 text-white" />
        </button>
        <div className="border-t border-white border-[3px] w-full" />
      </div>

      {/* Header */}
      <div className="text-start mb-1 sm:mb-6">
        <h2 className="font-semibold text-white text-2xl">Investment Plan</h2>
      </div>
      {/* Investment Amount Section */}
      <div className="bg-gray-800 rounded-2xl p-6 mb-8 relative">
        {/* Plan Name Box */}
        <div className="absolute -top-3 right-4 bg-[#7553FF] px-4 py-1 rounded-xl">
          <span className="text-white font-medium text-sm">
            {selectedTariff.label}
          </span>
        </div>

        <h2 className="text-white text-xl font-medium mb-6">
          Enter Investment Amount
        </h2>

        {/* Min/Max Display */}
        <div className="bg-green-600 rounded-xl p-4 mb-4 flex justify-between items-center">
          <div className="text-left">
            <div className="text-sm text-green-100">Minimum</div>
            <div className="text-lg font-bold">{selectedTariff.minAmount}</div>
          </div>

          <div className="bg-black rounded-lg p-3">
            <TrendingUp size={20} className="text-white" />
          </div>

          <div className="text-right">
            <div className="text-sm text-green-100">Maximum</div>
            <div className="text-lg font-bold">
              {selectedTariff.maxAmount.toLocaleString()}
            </div>
          </div>
        </div>

        {/* Currency Selector */}
        <div className="bg-gray-900 rounded-xl items-center justify-center p-4 flex  gap-3">
          <img src={USDTLogo} alt="" />
          <span className="text-white font-medium">USDT</span>
        </div>
      </div>

      {/* Amount Input */}
      <div className="text-center mb-12">
        <input
          readOnly
          type="text"
          value={amount}
          // onChange={handleAmountChange}
          className="bg-transparent text-white text-3xl font-light text-center w-full border-none outline-none border-b-2 border-gray-600 pb-2"
          placeholder="0"
        />
      </div>
      {/* </div> */}

      {/* Continue Button */}
      <div className="absolute bottom-4 left-0 right-0 px-4">
        <Button
          className={`w-full text-white text-base py-6 rounded-2xl ${
            error || isLoading
              ? "bg-gray-500 cursor-not-allowed"
              : "bg-[#7553FF]"
          }`}
          disabled={!!error || amount < selectedTariff.minAmount || isLoading}
          onClick={handleInvestment}
        >
          {isLoading ? "Processing..." : "Submit"}
        </Button>
      </div>
    </div>
  );
};

export default InvestmentPlanFinal;
