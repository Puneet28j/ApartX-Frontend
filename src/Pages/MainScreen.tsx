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
import { Button } from "@/components/ui/button";
import FlowerImage from "../assets/Shape 1.svg";
import DiceImage from "../assets/shapetwo.jpg";

const MainScreen = () => {
  const navigate = useNavigate();

  const currencyConfig = [
    {
      label: "Bitcoin",
      value: "$ 0.00",
      icon: <TbCoinBitcoinFilled className="h-10 w-10" />,
    },
    {
      label: "Ethereum",
      value: "$ 0.00",
      icon: <TbCurrencyEthereum className="h-10 w-10" />,
    },
    {
      label: "USDT",
      value: "$ 0.00",
      icon: <TbCoinBitcoinFilled className="h-10 w-10" />,
    },
    {
      label: "BNB",
      value: "$ 0.00",
      icon: <RiBnbFill className="h-10 w-10" />,
    },
  ];

  return (
    <div
      className="flex flex-col min-h-screen px-4 pt-6 pb-16 relative max-w-screen-sm mx-auto bg-cover  bg-no-repeat bg-left-top bg-[length:300px_300px]"
      style={{ backgroundImage: `url(${DiceImage})` }}
    >
      {/* Flower Image - Top Right */}
      <img
        src={FlowerImage}
        alt="flower"
        className="absolute top-[-120px] right-[-100px] w-[320px] opacity-40 z-0 pointer-events-none"
      />

      {/* Settings Icon */}
      <div className="absolute top-6 right-4 ">
        <Settings className="text-white h-10 w-10" />
      </div>

      {/* User Greeting */}
      <div className="flex-col items-center gap-4 mb-4">
        <User2Icon className="w-12 h-12 rounded-full bg-white border-black border-2" />
        <div>
          <h1 className="text-white text-lg font-medium">Hello John</h1>
        </div>
      </div>

      {/* Wallet Balance Card */}
      <div className="bg-gradient-to-r from-[#d5f5e3] to-[#dab6fc] p-4 rounded-[20px] text-black shadow-lg mb-6 relative">
        <p className="text-sm font-medium text-gray-700">Wallet Balance</p>
        <div className="text-[28px] font-bold flex items-center gap-2 mt-2">
          <span className="text-2xl">$</span> 5000.00
        </div>
        <div className="flex justify-between mt-4">
          <Button className="rounded-full bg-orange-500 text-white shadow-md">
            Withdraw
          </Button>
          <Button className="rounded-full bg-purple-600 text-white shadow-md">
            Deposit
          </Button>
        </div>
      </div>

      {/* Send / Receive Actions */}
      <div className="bg-[#111111] rounded-2xl py-4 px-6 flex z-10 justify-around items-center mb-6 text-white">
        <div className="flex flex-col items-center gap-1">
          <button onClick={() => navigate("/select-wallet-send")}>
            <Send className="text-blue-400" />
            <span className="text-sm">Send</span>
          </button>
        </div>
        <div className="h-6 w-px bg-white opacity-40"></div>
        <div className="flex flex-col items-center gap-1">
          <Download className="text-yellow-400" />
          <span className="text-sm">Receive</span>
        </div>
      </div>

      {/* Crypto Balances */}
      <div className="text-white mb-4 z-10">
        <h2 className="text-lg font-semibold mb-3">Crypto Balance</h2>
        <div className="bg-[#111111] rounded-2xl p-4 space-y-4">
          {currencyConfig.map((coin) => (
            <div key={coin.label} className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                {coin.icon}
                <span className="text-2xl">{coin.label}</span>
              </div>
              <span className="text-green-400 text-2xl font-medium">
                {coin.value}
              </span>
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
