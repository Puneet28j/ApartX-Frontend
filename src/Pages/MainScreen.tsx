import { useNavigate } from "react-router-dom";
import {
  Settings,
  Send,
  Download,
  Home,
  BookText,
  IdCard,
  User2Icon,
} from "lucide-react";
import FlowerImage from "../assets/Shape 1.svg";
import DiceImage from "../assets/shape-2 (1).jpg";
import USDTLogo from "../assets/usdt logo.svg";
import BNBLogo from "../assets/bnb logo.svg";
import Etherium from "../assets/etherium logo.svg";
import Bitcoin from "../assets/Bitcoin Logo.svg";
import SendDollar from "../assets/Send Dollar.svg";
import ReceiveDollar from "../assets/Recive Dollar.svg";
import Meshgradient from "../assets/mesh-gradient 1.svg";
import ReferAndEarn from "../assets/ReferAndEarn.svg";
import InvestIcon from "../assets/Invest.svg";
import { Separator } from "@/components/ui/separator";

const MainScreen = () => {
  const navigate = useNavigate();

  const currencyConfig = [
    {
      label: "USDT",
      value: "$ 0.00",
      icon: USDTLogo,
    },
    {
      label: "Bitcoin",
      value: "$ 0.00",
      icon: Bitcoin,
    },
    {
      label: "Ethereum",
      value: "$ 0.00",
      icon: Etherium,
    },
    {
      label: "BNB",
      value: "$ 0.00",
      icon: BNBLogo,
    },
  ];

  return (
    <div className="w-full h-full bg-[#2D2B2B] relative overflow-x-hidden">
      {/* Content container with scrollable area */}
      <div className="h-full overflow-y-auto pb-20">
        <div className="px-4 pt-6">
          {/* Flower Image - Top Right */}
          <img
            src={FlowerImage}
            alt="flower"
            className="fixed top-0 right-0 w-64 max-w-full z-0 pointer-events-none"
          />
          <img
            src={DiceImage}
            alt="dice background"
            className=" bg-cover contrast-50 bg-center fixed mt-4 bottom-0 right-0 opacity-30  z-0 pointer-events-none"
          />

          {/* User Greeting */}
          <div className="flex flex-col items-start gap-2 mb-4 mt-8 z-10 relative">
            <User2Icon
              onClick={() => navigate("/profile")}
              className="w-12 h-12 rounded-full bg-white border-black border-2"
            />
            <div>
              <h1 className="text-white text-lg font-medium">Hello John</h1>
            </div>
          </div>

          {/* Wallet Card */}
          <div
            className="w-full p-4 rounded-[20px] bg-cover z-10 bg-center shadow-md mb-6 relative text-black"
            style={{
              backgroundImage: `url(${Meshgradient})`,
            }}
          >
            <div className="flex justify-between items-start">
              {/* Left: Wallet Balance Text */}
              <div className="flex flex-col">
                <span className="text-sm text-black font-medium">
                  Wallet Balance
                </span>
                <span className="text-2xl md:text-3xl font-bold mt-2">
                  5000.00
                </span>
              </div>

              {/* Right: Buttons */}
              <div className="flex flex-col gap-2">
                <button
                  onClick={() => navigate("/select-wallet-send")}
                  className="bg-orange-500 text-white text-xs sm:text-sm font-semibold px-3 sm:px-5 py-1.5 rounded-full shadow-md border border-orange-300"
                >
                  Withdraw
                </button>
                <button className="bg-purple-600 text-white text-xs sm:text-sm font-semibold px-3 sm:px-5 py-1.5 rounded-full shadow-md border border-purple-400">
                  Deposit
                </button>
              </div>
            </div>
          </div>

          {/* Send / Receive Actions */}
          <div className="bg-[#111111] rounded-2xl py-4 px-4 sm:px-6 flex  justify-around items-center mb-6 text-white">
            <div className="flex flex-col items-center gap-1">
              <button onClick={() => navigate("/select-wallet-send")}>
                <img
                  src={SendDollar}
                  alt="Send"
                  className="h-7 w-7 sm:h-8 sm:w-8"
                />
                <span className="text-xs sm:text-sm">Send</span>
              </button>
            </div>
            <div className="h-6 w-px bg-white opacity-40"></div>
            <div className="flex flex-col items-center  gap-1">
              {/* <button onClick={() => navigate("/select-wallet-receive")}> */}
              <img
                onClick={() => navigate("/select-wallet-receive")}
                src={ReceiveDollar}
                alt="Receive"
                className="h-7 w-7 sm:h-8 sm:w-8"
              />
              <span className="text-xs sm:text-sm">Receive</span>
              {/* </button> */}
            </div>
            <div className="h-6 w-px bg-white opacity-40"></div>
            <div className="flex flex-col items-center gap-1">
              <button onClick={() => navigate("/select-wallet-send")}>
                <img
                  src={InvestIcon}
                  alt="InvestIcon"
                  className="h-7 w-7 sm:h-8 sm:w-8"
                />
                <span className="text-xs sm:text-sm text-center">Invest</span>
              </button>
            </div>
          </div>

          {/* Crypto Balances */}
          <div className="text-white mb-4 z-10 relative">
            <h2 className="text-lg font-semibold mb-3">Crypto Balance</h2>
            <div className="bg-[#111111] rounded-2xl px-4 sm:px-8 p-4 space-y-3 sm:space-y-4">
              {currencyConfig.map((coin, index) => (
                <div key={coin.label}>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2 sm:gap-3">
                      <img
                        src={coin.icon}
                        alt={`${coin.label} icon`}
                        className="h-8 w-8 sm:h-12 sm:w-12"
                      />
                      <span className="text-base sm:text-lg">{coin.label}</span>
                    </div>
                    <span className="text-green-400 text-base sm:text-lg font-medium">
                      {coin.value}
                    </span>
                  </div>

                  {/* Separator - only show if not last item */}
                  {index < currencyConfig.length - 1 && (
                    <Separator className="bg-white/20 my-2 sm:my-3" />
                  )}
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
      {/* Bottom Navigation */}
      <div className="fixed bottom-0 left-1/2 -translate-x-1/2 max-w-lg w-full bg-[#171717] py-2 flex justify-around items-center z-50 rounded-t-xl shadow-inner">
        <div className="flex gap-2 items-center text-white">
          <Home className="w-5 h-5" />
          <span className="text-xs mt-1">Home</span>
        </div>
        <div className="flex gap-2  items-center text-white">
          <BookText className="w-5 h-5" />
          <span className="text-xs mt-1">Passbook</span>
        </div>
        <div className="flex gap-2  items-center text-white">
          {/* <IdCard className="w-5 h-5" /> */}
          <img src={ReferAndEarn} alt="" />
          <span className="text-xs mt-1">
            Invite &<br />
            Earn
          </span>
        </div>
      </div>
    </div>
  );
};

export default MainScreen;
