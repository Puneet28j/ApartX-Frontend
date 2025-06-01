import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";
import "react-phone-input-2/lib/style.css";
import { ArrowLeft } from "lucide-react";
// import Combobox from "@/components/ComboBox";
import { useState } from "react";

import Binance from "../assets/3495812.svg";
import MetaMask from "../assets/fox.svg";
import CoinBase from "../assets/Coinbase.svg";
import TrustWallet from "../assets/TrustWallet.svg";
import USDTLOGO from "../assets/usdt logo.svg";
import { useLocation } from "react-router-dom";
import Combobox from "@/components/ComboBox";

const wallets2 = [
  { value: "binance", label: "Binance", icon: Binance },
  { value: "metamask", label: "MetaMask", icon: MetaMask },
  { value: "coinbase", label: "CoinBase", icon: CoinBase },
  { value: "trustWallet", label: "Trust Wallet", icon: TrustWallet },
];

// Get the amount from location

const ReceiveFinal = () => {
  const location = useLocation();
  const [wallets, setWallets] = useState(wallets2);

  const [walletType, setWalletType] = useState<string>("");

  const handleComboboxOpen = (isOpen: boolean) => {
    if (isOpen) {
      setWallets(wallets2);
    }
  };

  const { amount } = location.state || {};
  const navigate = useNavigate();
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
            Select your blockchain wallet
          </h2>
          <p className="text-[#F7F7F7] text-sm mt-1">
            Select your wallet to receive crypto currency.
          </p>
        </div>

        {/* Form */}
        <div className="mt-10 flex justify-center">
          <div className="w-full max-w-[350px] border-1 relative border-white rounded-[20px] flex justify-center">
            <div className="flex flex-col items-center pb-4 w-full">
              <div className="mt-4 w-full flex flex-col justify-center">
                <div className="text-white text-center">Enter Amount</div>
                {/* <Combobox
                  placeholder="Select crypto currency"
                  wallets={wallets}
                /> */}
                <div className="bg-black w-[160px] mb-2 items-center rounded-lg gap-4 justify-center h-[60px] mx-auto flex">
                  <img className="h-[50px] w-[50px]" src={USDTLOGO} alt="" />
                  <div className="text-white text-[20px]">USDT</div>
                </div>
              </div>
              <input
                type="number"
                value={amount}
                readOnly
                className="h-14 mb-2 bg-transparent rounded-none px-4 border-b-1 border-b-white border-t-0 border-l-0 border-r-0 w-[200px] mt-4 text-white focus:outline-none text-4xl text-center placeholder:text-xl mx-auto"
                placeholder="Enter amount"
              />
              <div className="mt-4 w-full flex flex-col justify-center">
                <div className="text-white text-center">Select wallet</div>
                <Combobox
                  placeholder="Enter Wallet"
                  wallets={wallets}
                  onChange={(value) => setWalletType(value)}
                  onOpenChange={handleComboboxOpen}
                />
              </div>
            </div>
          </div>
        </div>

        {/* Footer */}

        <div className="flex flex-col gap-3 pt-10">
          <Button
            className="w-full h-12 bg-[#6552FE] hover:bg-slate-500 text-white font-semibold rounded-[16px] disabled:opacity-50 disabled:cursor-not-allowed"
            onClick={() => navigate("/request-submitted")}
            disabled={!walletType}
          >
            Continue
          </Button>
        </div>
      </div>
    </div>
  );
};

export default ReceiveFinal;
