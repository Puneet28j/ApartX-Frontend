import { useNavigate } from "react-router-dom";
import { TbCoinBitcoinFilled, TbCurrencyEthereum } from "react-icons/tb";
import { RiBnbFill } from "react-icons/ri";
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
    <div className="flex flex-col min-h-screen  w-full px-4 pt-6 pb-16 relative bg-[#2D2B2B] mx-auto ">
      {/* Flower Image - Top Right */}
      <img
        src={FlowerImage}
        alt="flower"
        className="absolute top-[-3px] right-[-5px] w-[320px]  z-1 pointer-events-none"
      />
      <img
        src={DiceImage}
        alt="flower"
        className="absolute bg-cover contrast-50 bg-center bottom-0 right-0 opacity-50 backdrop-blur-sm  -z-0 pointer-events-none"
      />

      {/* Settings Icon */}
      {/* <div className="absolute top-6 right-4 mt-8">
        <Settings className="text-white h-10 w-10" />
      </div> */}

      {/* User Greeting */}
      <div className="flex-col items-center gap-4 mb-4 mt-8">
        <User2Icon
          onClick={() => navigate("/profile")}
          className="w-12 h-12 rounded-full bg-white border-black border-2"
        />
        <div>
          <h1 className="text-white text-lg font-medium">Hello John</h1>
        </div>
      </div>

      <div
        className="w-full  p-4 rounded-[20px] bg-cover z-2 bg-center shadow-md mb-6  relative text-black"
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
            <span className="text-3xl font-bold mt-2">5000.00</span>
          </div>

          {/* Right: Buttons */}
          <div className="flex flex-col gap-2">
            <button className="bg-orange-500 text-white text-sm font-semibold px-5 py-1.5 rounded-full shadow-md border border-orange-300">
              Withdraw
            </button>
            <button className="bg-purple-600 text-white text-sm font-semibold px-5 py-1.5 rounded-full shadow-md border border-purple-400">
              Deposit
            </button>
          </div>
        </div>
      </div>

      {/* Send / Receive Actions */}
      <div className="bg-[#111111] rounded-2xl py-4 px-6 flex z-10 justify-around items-center mb-6 text-white">
        <div className="flex flex-col items-center gap-1">
          <button onClick={() => navigate("/select-wallet-send")}>
            <img src={SendDollar} alt="Send" className="h-8 w-8" />
            <span className="text-sm">Send</span>
          </button>
        </div>
        <div className="h-6 w-px bg-white opacity-40"></div>
        <div className="flex flex-col items-center gap-1">
          <img src={ReceiveDollar} alt="Receive" className="h-8 w-8" />
          <span className="text-sm">Receive</span>
        </div>
      </div>

      {/* Crypto Balances */}

      <div className="text-white mb-4 z-10">
        <h2 className="text-lg font-semibold mb-3">Crypto Balance</h2>
        <div className="bg-[#111111] rounded-2xl px-8 p-4 space-y-4">
          {currencyConfig.map((coin, index) => (
            <div key={coin.label}>
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <img
                    src={coin.icon}
                    alt="Coin icon"
                    className="h-[47px] w-[47px]"
                  />
                  <span className="text-lg">{coin.label}</span>
                </div>
                <span className="text-green-400 text-lg font-medium">
                  {coin.value}
                </span>
              </div>

              {/* Separator - only show if not last item */}
              {index < currencyConfig.length - 1 && (
                <Separator className="bg-white/20 my-3" />
              )}
            </div>
          ))}
        </div>
      </div>

      {/* Bottom Navigation */}
      <div className="fixed bottom-0 left-1/2 transform -translate-x-1/2 w-full max-w-screen-sm bg-[#000000] border-t border-gray-800 flex justify-around items-center py-3 z-50 px-4">
        <div className="flex flex-col items-center text-white text-xs">
          <Home className="w-5 h-5" />
          Home
        </div>
        <div className="flex flex-col items-center text-white text-xs">
          <BookText className="w-5 h-5" />
          Passbook
        </div>
        <div className="flex flex-col items-center text-white text-xs">
          <IdCard className="w-5 h-5" />
          ID
        </div>
      </div>
    </div>
  );
};

export default MainScreen;
