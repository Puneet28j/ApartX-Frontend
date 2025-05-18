import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";
import { ArrowLeft } from "lucide-react";
import Combobox from "@/components/ComboBox";
import { useState } from "react";
import USDTLogo from "../assets/usdt logo.svg";
import BNBLogo from "../assets/bnb logo.svg";
import Etherium from "../assets/etherium logo.svg";
import Bitcoin from "../assets/Bitcoin Logo.svg";
import SelectComponent from "@/components/Select";

const wallets = [
  { value: "usdt", label: "USDT", icon: USDTLogo },
  { value: "etherium", label: "Etherium", icon: Etherium },
  { value: "bitcoin", label: "Bitcoin", icon: Bitcoin },
  { value: "bnb", label: "BNB", icon: BNBLogo },
];

const tariffs = [
  {
    value: "security",
    label: "Security",
    rate: "4–5%",
    duration: "7 Days",
    minAmount: 25,
    maxAmount: 500000,
  },
  {
    value: "basic",
    label: "Basic",
    rate: "1-1.5%",
    duration: "15 Days",
    minAmount: 25,
    maxAmount: 1000,
  },
  {
    value: "advance",
    label: "Advance",
    rate: "15.2%",
    duration: "25 Days",
    minAmount: 1000,
    maxAmount: 10000,
  },
];

const InvestmentPlan = () => {
  const navigate = useNavigate();
  const [selectedTariff, setSelectedTariff] = useState(tariffs[0]);
  const [amount, setAmount] = useState(tariffs[0].minAmount); // ← set initial value to minAmount

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
      <div className="text-start mb-6">
        <h2 className="font-semibold text-white text-2xl">Investment Plan</h2>
        <p className="text-sm text-[#D1D1D1] mt-1">
          Select your desired investment plan and crypto currency to grow your
          business.
        </p>
      </div>

      {/* Select Currency */}
      <div className="bg-[#3A3232] py-4 px-8 rounded-2xl h-[142px] mb-5">
        <p className="text-white font-semibold ">Select Currency</p>
        <div className="flex justify-center items-center h-full">
          <Combobox placeholder="Select currency" wallets={wallets} />
        </div>
      </div>

      {/* Tariff */}
      {/* Tariff */}
      <div className="bg-[#3A3232] p-4 rounded-2xl h-[142px] mb-5">
        <p className="text-white font-semibold mb-2">Tariff</p>
        <SelectComponent
          TariffList={tariffs}
          selectedTariff={selectedTariff}
          setSelectedTariff={(tariff) => {
            setSelectedTariff(tariff);
            setAmount(tariff.minAmount); // ← update amount on tariff change
          }}
        />
      </div>

      {/* Deposit Amount */}
      <div className="bg-[#3A3232] h-[142px] p-4 rounded-2xl">
        <p className="text-white font-semibold mb-2">Deposit Amount</p>
        <div className="flex items-center border rounded-xl px-4 py-3 border-white">
          <input
            type="number"
            value={amount === 0 ? "" : amount}
            onChange={(e) => {
              const val = e.target.value;
              setAmount(val === "" ? 0 : Number(val));
            }}
            min={selectedTariff.minAmount}
            max={selectedTariff.maxAmount}
            className="bg-transparent text-white outline-none flex-1 placeholder:text-white"
            placeholder={`Min. ${selectedTariff.minAmount}`}
          />

          <span className="text-white font-semibold">USD</span>
        </div>
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
              {selectedTariff.maxAmount.toLocaleString("en-IN")}
            </span>
          </span>
        </div>
      </div>

      {/* Continue Button */}
      <div className="absolute bottom-4 left-0 right-0 px-4">
        <Button className="w-full bg-[#7553FF] text-white text-base py-6 rounded-2xl">
          Continue
        </Button>
      </div>
    </div>
  );
};

export default InvestmentPlan;
