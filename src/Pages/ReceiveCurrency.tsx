import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";
import "react-phone-input-2/lib/style.css";
import { ArrowLeft, User2Icon } from "lucide-react";
import Combobox from "@/components/ComboBox";
import { useState } from "react";
import USDTLogo from "../assets/usdt logo.svg";
import BNBLogo from "../assets/bnb logo.svg";
import Etherium from "../assets/etherium logo.svg";
import Bitcoin from "../assets/Bitcoin Logo.svg";
import USDTLOGO from "../assets/usdt logo.svg";

const wallets = [
  {
    value: "usdt",
    label: "USDT",
    icon: USDTLogo,
  },
  {
    value: "etherium",
    label: "Etherium",
    icon: Etherium,
  },
  {
    value: "bitcoin",
    label: "Bitcoin",
    icon: Bitcoin,
  },
  {
    value: "bnb",
    label: "BNB",
    icon: BNBLogo,
  },
];

const ReceiveCurrency = () => {
  const navigate = useNavigate();
  const [amount, setAmount] = useState("");
  const [showWalletIDInput, setShowWalletIDInput] = useState<boolean>(false);

  const backnavigation = () => {
    if (showWalletIDInput) {
      setShowWalletIDInput(false);
    } else {
      navigate(-1);
    }
  };

  return (
    <div className="flex flex-col h-full w-full bg-[#070707] py-6 overflow-y-auto overflow-x-hidden px-3">
      {/* Top Back Button + Line */}
      <div className="flex flex-col gap-2 mb-6">
        <button
          onClick={backnavigation}
          className="flex items-center gap-2 text-white text-sm"
        >
          <ArrowLeft size={20} className="h-8 w-8 m-1 text-white" />
        </button>
        <div className="border-t border-white border-4 w-full" />
      </div>

      {/* Content */}
      <div className="flex flex-col gap-6 w-full flex-grow">
        {/* Header */}
        <div className="flex-none text-start">
          <h2 className="mt-3 font-medium text-[#F7F7F7] text-[22px] leading-tight">
            Enter Amount
          </h2>
          <p className="text-[#F7F7F7] text-sm mt-1">
            Enter amount of crypto currency to receive.
          </p>
        </div>

        {/* Form */}
        <div className="mt-10 flex justify-center">
          <div className="w-full max-w-[350px] pb-2 border-1 relative border-white rounded-[20px] flex justify-center">
            <div className="flex flex-col items-center w-full">
              <User2Icon className="text-white h-[80px] w-[80px] rounded-full border-2 border-white mt-2" />
              <div className="text-white text-[20px] text-center mt-2">
                John
              </div>
              <div className="mt-4 w-full flex justify-center">
                <div className="bg-black w-[160px] mb-2 items-center rounded-lg gap-4 justify-center h-[60px] mx-auto flex">
                  <img className="h-[50px] w-[50px]" src={USDTLOGO} alt="" />
                  <div className="text-white text-[20px]">USDT</div>
                </div>
              </div>
              <input
                type="number"
                value={amount}
                onChange={(e) => setAmount(e.target.value)}
                className="h-14 mb-2 bg-transparent rounded-none px-4 border-b-1 border-b-white border-t-0 border-l-0 border-r-0 w-[250px] mt-4 text-white focus:outline-none text-2xl text-center placeholder:text-xl mx-auto"
                placeholder="Enter amount"
              />
            </div>
          </div>
        </div>

        <div className="flex flex-col gap-3 pt-10">
          <Button
            className="w-full h-12 hover:bg-slate-500 bg-[#6552FE] text-white font-semibold rounded-[16px]"
            disabled={!amount || parseFloat(amount) <= 0}
            onClick={() =>
              navigate("/receive-final", {
                state: { amount }, // <-- pass state
              })
            }
          >
            Continue
          </Button>
        </div>
      </div>
    </div>
  );
};

export default ReceiveCurrency;
