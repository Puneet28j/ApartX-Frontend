import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";
import "react-phone-input-2/lib/style.css";
import { ArrowLeft, User2Icon } from "lucide-react";
import { useState } from "react";
import { Separator } from "@/components/ui/separator";

import USDTLOGO from "../assets/usdt logo.svg";

const SendCurrency = () => {
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
            Enter Amount
          </h2>
          <p className="text-[#F7F7F7] text-sm mt-1">
            Enter amount of crypto currency to send.
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
                className="h-14 mb-2 bg-transparent rounded-none px-4 border-b-1 border-b-white border-t-0 border-l-0 border-r-0 w-[250px] mt-4 text-white focus:outline-none text-2xl text-center placeholder:text-xl mx-auto"
                placeholder="Enter amount"
              />
            </div>
          </div>
        </div>

        {/* Footer */}
        {showWalletIDInput ? (
          <div className="flex flex-col gap-4">
            <div className="flex flex-col">
              <label className="text-white font-medium text-sm">
                Wallet ID
              </label>
              <input
                type="text"
                placeholder="Enter wallet Id"
                className="h-12 px-4 border border-white rounded-xl bg-transparent text-white placeholder:text-[#6B6B6B] outline-none"
              />
            </div>

            <div className="flex items-center justify-center gap-2">
              <Separator className="w-1/4" />
              <span className="text-white">And</span>
              <Separator className="w-1/4" />
            </div>

            <div className="flex flex-col gap-3">
              <Button
                className="w-full h-12 bg-[#38AD46] text-white font-semibold rounded-[16px]"
                // onClick={() => navigate("/transfer-receipt")}
              >
                Add ScreenShot
              </Button>
              <Button
                className="w-full h-12 bg-[#38AD46] text-white font-semibold rounded-[16px]"
                onClick={() => navigate("/transfer-receipt")}
              >
                Scan QR Code
              </Button>

              <Button
                className="w-full h-12 bg-[#6552FE] text-white font-semibold rounded-[16px]"
                onClick={() => navigate("/transfer-receipt")}
              >
                Pay Now
              </Button>
            </div>
          </div>
        ) : (
          <div className="flex flex-col gap-3 pt-10">
            <Button
              className="w-full h-12 bg-[#6552FE] text-white font-semibold rounded-[16px]"
              onClick={() => setShowWalletIDInput(true)}
            >
              Continue
            </Button>
          </div>
        )}
      </div>
    </div>
  );
};

export default SendCurrency;
