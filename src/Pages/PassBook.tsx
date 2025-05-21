import { useNavigate } from "react-router-dom";
import { Home, ArrowLeft, BookText } from "lucide-react";
import ReceiptBg from "../assets/ReceiptBg.tsx.svg";
import TransactionList from "@/components/TransactionList";
import type { TransactionData } from "@/components/TransactionCard";
import FoxImage from "../assets/fox.svg";
import ReferAndEarn from "../assets/ReferAndEarn.svg";
import { Button } from "@/components/ui/button";

const mockTransactions: TransactionData[] = [
  {
    id: "1",
    username: "Eaz5487568cvguytoxxxj",
    time: "Yesterday at 16:34",
    type: "Income",
    amount: 120,
    walletImage: FoxImage,
  },
  {
    id: "2",
    username: "Eaz5487568cvguytoxxxj",
    time: "Yesterday at 16:34",
    type: "Withdraw",
    amount: -500,
    walletImage: FoxImage,
  },
  {
    id: "3",
    username: "Eaz5487568cvguytoxxxj",
    time: "Yesterday at 16:34",
    type: "Paid",
    amount: -20,
    walletImage: FoxImage,
  },
  {
    id: "4",
    username: "Eaz5487568cvguytoxxxj",
    time: "Yesterday at 16:34",
    type: "Income",
    amount: 240,
    walletImage: FoxImage,
  },
  {
    id: "50",
    username: "Eaz5487568cvguytoxxxj",
    time: "Yesterday at 16:34",
    type: "Referral",
    amount: 240,
    walletImage: FoxImage,
  },
  {
    id: "5",
    username: "Eaz5487568cvguytoxxxj",
    time: "Yesterday at 16:34",
    type: "Deposit",
    amount: 5000,
    walletImage: FoxImage,
  },
  {
    id: "6",
    username: "Eaz5487568cvguytoxxxj",
    time: "Yesterday at 16:34",
    type: "Income",
    amount: 120,
    walletImage: FoxImage,
  },
  {
    id: "7",
    username: "Eaz5487568cvguytoxxxj",
    time: "Yesterday at 16:34",
    type: "Withdraw",
    amount: -500,
    walletImage: FoxImage,
  },
  {
    id: "8",
    username: "Eaz5487568cvguytoxxxj",
    time: "Yesterday at 16:34",
    type: "Paid",
    amount: -20,
    walletImage: FoxImage,
  },
  {
    id: "9",
    username: "Eaz5487568cvguytoxxxj",
    time: "Yesterday at 16:34",
    type: "Income",
    amount: 240,
    walletImage: FoxImage,
  },
  {
    id: "10",
    username: "Eaz5487568cvguytoxxxj",
    time: "Yesterday at 16:34",
    type: "Deposit",
    amount: 5000,
    walletImage: FoxImage,
  },
];

const Passbook = () => {
  const navigate = useNavigate();

  return (
    <div className="relative flex flex-col h-screen max-h-screen bg-black text-white">
      {/* Fixed Background Image */}
      <div
        className="absolute inset-0 z-0 bg-cover bg-center"
        style={{ backgroundImage: `url(${ReceiptBg})` }}
      />

      {/* Gradient Overlay */}
      <div className="absolute h-[180px] inset-x-0 top-0 bg-gradient-to-b from-[#6552FE] via-[#683594] to-[#6B1111] opacity-90 z-10" />

      {/* Top Bar */}
      <div className="relative z-20 pt-6 pl-4">
        <button
          onClick={() => navigate(-1)}
          className="flex items-center gap-2 text-white text-sm"
        >
          <ArrowLeft size={20} className="h-8 w-8 text-white" />
        </button>
      </div>
      <div className="text-[24px] z-10 mt-[80px] ml-3">Transactions</div>

      {/* Scrollable Content */}
      <div className="relative z-20 flex-1 mt-[20px] overflow-y-auto px-2 pb-32">
        <TransactionList transactions={mockTransactions} />
      </div>

      {/* Bottom Navigation */}
      <div className="fixed bottom-0 left-1/2 -translate-x-1/2 max-w-lg w-full bg-[#171717] py-4   flex justify-around items-center z-30 rounded-t-xl shadow-inner">
        <Button
          className="flex gap-2 items-center text-white"
          onClick={() => navigate("/main-screen")}
        >
          <Home className="w-5 h-5" />
          <span className="text-xs mt-1">Home</span>
        </Button>
        <Button
          onClick={() => navigate("/passbook")}
          className="flex gap-2 items-center text-white"
        >
          <BookText className="w-5 h-5" />
          <span className="text-xs mt-1">Passbook</span>
        </Button>
        <Button
          onClick={() => navigate("/invite-and-earn")}
          className="flex gap-2 items-center "
        >
          <img src={ReferAndEarn} alt="Invite & Earn" />
          <span className="text-[10px] text-center text-white leading-tight">
            Invite &<br />
            Earn
          </span>
        </Button>
      </div>
    </div>
  );
};

export default Passbook;
