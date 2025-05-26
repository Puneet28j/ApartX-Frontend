import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";
import { ArrowLeft } from "lucide-react";
import { useState } from "react";
import USDTLogo from "../assets/usdt logo.svg";
import BNBLogo from "../assets/bnb logo.svg";
import Etherium from "../assets/etherium logo.svg";
import Bitcoin from "../assets/Bitcoin Logo.svg";
import SelectComponent from "@/components/Select";
import USDTLOGO from "../assets/usdt logo.svg";
import { toast } from "sonner";
// import api from "@/services/api";

// Define types
type Wallet = {
  value: string;
  label: string;
  icon: string;
};

type Tariff = {
  value: string;
  label: string;
  rate: string;
  duration: string;
  minAmount: number;
  maxAmount: number;
};

const wallets: Wallet[] = [
  { value: "usdt", label: "USDT", icon: USDTLogo },
  { value: "etherium", label: "Etherium", icon: Etherium },
  { value: "bitcoin", label: "Bitcoin", icon: Bitcoin },
  { value: "bnb", label: "BNB", icon: BNBLogo },
];

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

const InvestmentPlan = () => {
  const navigate = useNavigate();
  const [selectedTariff, setSelectedTariff] = useState<Tariff>(tariffs[0]);
  const [amount, setAmount] = useState<number>(selectedTariff.minAmount);
  const [error, setError] = useState<string>("");
  const [isLoading, setIsLoading] = useState(false);

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

    setError("");
    return true;
  };

  // Handle tariff change
  const handleTariffChange = (tariff: Tariff): void => {
    setSelectedTariff(tariff);
    setAmount(tariff.minAmount);
    setError("");
  };

  // Handle amount change
  const handleAmountChange = (e: React.ChangeEvent<HTMLInputElement>): void => {
    const inputVal = e.target.value;

    if (inputVal === "") {
      setAmount(0);
      setError(
        `Amount must be at least ${selectedTariff.minAmount.toLocaleString()} USD`
      );
      return;
    }

    const val = Number(inputVal);
    if (isNaN(val)) {
      return;
    }

    setAmount(val);
    validateAmount(val);
  };

  const handleInvestment = async () => {
    if (!validateAmount(amount)) {
      return;
    }

    setIsLoading(true);
    try {
      // const response = await api.post("/investment/create", {
      //   planName: selectedTariff.label,
      //   amount: amount,
      // });

      // if (response.data) {
      //   toast.success("Investment created successfully!");
      navigate("/profile"); // Navigate back to profile after successful investment
      // }
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
        <p className="text-sm text-[#D1D1D1] mt-1">
          Select your desired investment plan and crypto currency to grow your
          business.
        </p>
      </div>

      {/* Select Currency */}
      <div className="bg-[#3A3232] py-4 px-8 rounded-2xl h-[142px] mb-5">
        <p className="text-white font-semibold">Supported Currency</p>
        <div className="flex justify-center items-center h-full">
          <div className="bg-black w-[160px] mb-2 items-center rounded-lg gap-4 justify-center h-[60px] mx-auto flex">
            <img className="h-[50px] w-[50px]" src={USDTLOGO} alt="" />
            <div className="text-white text-[20px]">USDT</div>
          </div>
        </div>
      </div>

      {/* Tariff */}
      <div className="bg-[#3A3232] p-4 rounded-2xl h-[142px] mb-5">
        <p className="text-white font-semibold mb-2">Tariff</p>
        <SelectComponent
          TariffList={tariffs}
          selectedTariff={selectedTariff}
          setSelectedTariff={handleTariffChange}
        />
      </div>

      {/* Deposit Amount */}
      <div className="bg-[#3A3232] h-auto p-4 rounded-2xl">
        <p className="text-white font-semibold mb-2">Deposit Amount</p>
        <div
          className={`flex items-center border rounded-xl px-4 py-3 ${
            error ? "border-red-500" : "border-white"
          }`}
        >
          <input
            type="number"
            value={amount === 0 ? "" : amount}
            onChange={handleAmountChange}
            className="bg-transparent text-white outline-none flex-1 placeholder:text-white"
            placeholder={`Min. ${selectedTariff.minAmount.toLocaleString()}`}
          />
          <span className="text-white font-semibold">USD</span>
        </div>

        {/* Error Message */}
        {error && <p className="text-red-500 text-xs mt-1">{error}</p>}

        {/* Min/Max Display */}
        <div className="flex justify-between text-sm text-white mt-2">
          <span>
            Min. Amount:{" "}
            <span className="text-green-500 font-semibold">
              {selectedTariff.minAmount.toLocaleString()}
            </span>
          </span>
          <span>
            Max. Amount:{" "}
            <span className="text-green-500 font-semibold">
              {selectedTariff.value === "master"
                ? `${selectedTariff.minAmount.toLocaleString()}+`
                : selectedTariff.maxAmount.toLocaleString()}
            </span>
          </span>
        </div>
      </div>

      {/* Continue Button */}
      <div className="absolute bottom-4 left-0 right-0 px-4">
        <Button
          className={`w-full text-white text-base py-6 rounded-2xl ${
            error || isLoading
              ? "bg-gray-500 cursor-not-allowed"
              : "bg-[#7553FF]"
          }`}
          disabled={!!error || amount < selectedTariff.minAmount || isLoading}
          // onClick={handleInvestment}
        >
          {isLoading ? "Processing..." : "Continue"}
        </Button>
      </div>
    </div>
  );
};

export default InvestmentPlan;
