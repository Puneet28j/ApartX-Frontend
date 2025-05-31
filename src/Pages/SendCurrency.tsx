// File: src/pages/SendCurrency.tsx

import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";
import "react-phone-input-2/lib/style.css";
import { ArrowLeft, User2Icon } from "lucide-react";
import { useRef, useState } from "react";
import { Separator } from "@/components/ui/separator";
import USDTLOGO from "../assets/usdt logo.svg";
import Combobox from "@/components/ComboBox";
import Binance from "../assets/binance.svg";
import MetaMask from "../assets/fox.svg";
import CoinBase from "../assets/Coinbase.svg";
import TrustWallet from "../assets/TrustWallet.svg";
import axios from "axios";

const API_URL = "/api";

const wallets2 = [
  { value: "binance", label: "Binance", icon: Binance },
  { value: "metamask", label: "MetaMask", icon: MetaMask },
  { value: "coinbase", label: "CoinBase", icon: CoinBase },
  { value: "trustWallet", label: "Trust Wallet", icon: TrustWallet },
];

const SendCurrency = () => {
  const navigate = useNavigate();
  const [selectedWallet, setSelectedWallet] = useState("");
  const [amount, setAmount] = useState("");
  const [walletID, setWalletID] = useState("");
  const [showWalletIDInput, setShowWalletIDInput] = useState(false);
  const [screenshot, setScreenshot] = useState<File | null>(null);
  const [preview, setPreview] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const backnavigation = () => {
    if (showWalletIDInput) {
      setShowWalletIDInput(false);
    } else {
      navigate(-1);
    }
  };

  const handleScreenshotUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setScreenshot(file);
      setPreview(URL.createObjectURL(file));
    }
  };

  const triggerFileSelect = () => {
    fileInputRef.current?.click();
  };

  const handleSubmit = async () => {
    if (!amount || !walletID || !selectedWallet) return;

    const token = localStorage.getItem("token");
    if (!token) {
      alert("Please login first.");
      navigate("/login-register");
      return;
    }

    const formData = new FormData();
    formData.append("amount", amount);
    formData.append("walletType", selectedWallet);
    formData.append("walletID", walletID);
    if (screenshot) {
      formData.append("screenshot", screenshot);
    }

    try {
      const response = await axios.post(`${API_URL}/wallet/transfer`, formData, {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "multipart/form-data",
        },
      });

      console.log("Transfer success:", response.data);
      navigate("/transfer-receipt");
    } catch (error: any) {
      console.error("Transfer failed:", error.response?.data || error.message);
      alert("Transfer failed. Please try again.");
    }
  };

  return (
    <div className="flex flex-col h-full w-full bg-[#070707] py-2 overflow-y-auto overflow-x-hidden px-3">
      <div className="flex flex-col gap-1 mb-3">
        <button
          onClick={backnavigation}
          className="flex items-center gap-2 text-white text-sm"
        >
          <ArrowLeft size={20} className="h-8 w-8 m-1 text-white" />
        </button>
        <div className="border-t border-white border-4 w-full" />
      </div>

      <div className="flex flex-col gap-1 w-full flex-grow">
        <div className="flex-none text-start">
          <h2 className="mt-1 font-medium text-[#F7F7F7] text-[22px] leading-tight">
            Enter Amount
          </h2>
          <p className="text-[#F7F7F7] text-sm mt-1">
            Enter amount of crypto currency to send.
          </p>
        </div>

        <div className="mt-1 flex justify-center">
          <div className="w-full max-w-[350px] pb-2 border-1 relative border-white rounded-[20px] flex justify-center">
            <div className="flex flex-col items-center w-full">
              <User2Icon className="text-white h-[60px] w-[60px] rounded-full border-2 border-white mt-2" />
              <div className="text-white text-[15px] text-center mt-2">John</div>
              <div className="mt-2 w-full flex justify-center">
                <div className="bg-black w-[160px]  items-center rounded-lg gap-4 justify-center h-[50px] mx-auto flex">
                  <img className="h-[40px] w-[40px]" src={USDTLOGO} alt="USDT" />
                  <div className="text-white text-[15px]">USDT</div>
                </div>
              </div>
              <input
                type="number"
                value={amount}
                onChange={(e) => setAmount(e.target.value)}
                className="h-10 mb-2 bg-transparent rounded-none px-4 border-b-1 border-b-white border-t-0 border-l-0 border-r-0 w-[250px] mt-1 text-white focus:outline-none text-xl text-center placeholder:text-xl mx-auto"
                placeholder="Enter amount"
              />
              <div className="mt-4 w-full flex flex-col justify-center">
                <div className="text-white text-center">Select wallet</div>
                <Combobox
                  placeholder="Select wallet"
                  wallets={wallets2}
                  onChange={(value) => setSelectedWallet(value)}
                />
              </div>
            </div>
          </div>
        </div>
      </div>

      {showWalletIDInput ? (
        <div className="flex flex-col gap-4">
          <div className="flex flex-col">
            <label className="text-white font-medium text-sm">Wallet ID</label>
            <input
              value={walletID}
              onChange={(e) => setWalletID(e.target.value)}
              type="text"
              placeholder="Enter wallet Id"
              className="h-10 px-4 border border-white rounded-xl bg-transparent text-white placeholder:text-[#6B6B6B] outline-none"
            />
          </div>

          <div className="flex items-center justify-center gap-1">
            <Separator className="w-1/4" />
            <span className="text-white">OR</span>
            <Separator className="w-1/4" />
          </div>

          {preview && (
            <div className="flex justify-center">
              <img
                src={preview}
                alt="Screenshot Preview"
                className="max-h-48 rounded-lg border border-white"
              />
            </div>
          )}

          <input
            ref={fileInputRef}
            type="file"
            accept="image/*"
            onChange={handleScreenshotUpload}
            className="hidden"
          />

          <div className="flex flex-col gap-2">
            <Button
              className="w-full h-10 hover:bg-slate-500 bg-[#38AD46] text-white font-semibold rounded-[12px]"
              onClick={triggerFileSelect}
            >
              Add Screenshot
            </Button>

            <Button
              disabled={!walletID}
              className="w-full h-10 hover:bg-slate-500 bg-[#6552FE] text-white font-semibold rounded-[12px]"
              onClick={handleSubmit}
            >
              Pay Now
            </Button>
          </div>
        </div>
      ) : (
        <div className="flex flex-col gap-3 pt-10">
          <Button
            className="w-full h-10 bg-[#6552FE] hover:bg-slate-500 text-white font-semibold rounded-[12px]"
            disabled={!amount || parseFloat(amount) <= 0 || !selectedWallet}
            onClick={() => setShowWalletIDInput(true)}
          >
            Continue
          </Button>
        </div>
      )}
    </div>
  );
};

export default SendCurrency;
