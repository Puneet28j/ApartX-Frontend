import PortfolioList, { type PortfolioData } from "@/components/PortfolioList";
import { Button } from "@/components/ui/button";
import { ArrowLeft, BookText, Home } from "lucide-react";
import { useNavigate } from "react-router-dom";
import ReferAndEarn from "../assets/ReferAndEarn.svg";

const mockPortfolioData: PortfolioData[] = [
  {
    id: "1",
    plan: "Gold Plan",
    date: "2023-10-01",
    amount: 5000,
  },
  {
    id: "2",
    plan: "Diamond Plan",
    date: "2023-10-05",
    amount: 10000,
  },
  {
    id: "3",
    plan: "Platinum Plan",
    date: "2023-10-10",
    amount: 15000,
  },
  {
    id: "4",
    plan: "Master Plan",
    date: "2023-10-15",
    amount: -20000,
  },
  {
    id: "5",
    plan: "Gold Plan",
    date: "2023-10-20",
    amount: 5000,
  },
  {
    id: "6",
    plan: "Diamond Plan",
    date: "2023-10-25",
    amount: 10000,
  },
  {
    id: "7",
    plan: "Platinum Plan",
    date: "2023-10-30",
    amount: 15000,
  },
  {
    id: "8",
    plan: "Master Plan",
    date: "2023-11-01",
    amount: -20000,
  },
  {
    id: "9",
    plan: "Gold Plan",
    date: "2023-11-05",
    amount: 5000,
  },
  {
    id: "10",
    plan: "Diamond Plan",
    date: "2023-11-10",
    amount: 10000,
  },
  {
    id: "11",
    plan: "Platinum Plan",
    date: "2023-11-15",
    amount: 15000,
  },
  {
    id: "12",
    plan: "Master Plan",
    date: "2023-11-20",
    amount: -20000,
  },
];

const Portfolio = () => {
  const navigate = useNavigate();

  // Calculate total wallet amount from portfolio data
  const totalWallet = mockPortfolioData.reduce(
    (sum, item) => sum + item.amount,
    0
  );

  return (
    <div className="relative flex flex-col h-screen max-h-screen bg-black text-white">
      {/* Fixed Background Image */}

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

      {/* Wallet Amount Display */}
      <div className="relative z-20 text-center mt-4">
        <p className="text-gray-200 text-sm">Wallet Balance</p>
        <h1 className="text-3xl font-bold text-white">
          {totalWallet.toLocaleString()}
        </h1>
      </div>

      <div className="text-[24px] z-10 mt-[20px] ml-3">Portfolio</div>

      {/* Column Headers */}
      <div className="relative z-20 grid grid-cols-4 px-4 py-3 bg-gray-800 rounded-t-lg mt-4 mx-2">
        <div className="text-gray-300 font-medium text-sm">Plan</div>
        <div className="text-gray-300 font-medium text-sm text-center">
          Invest Date
        </div>
        <div className="text-gray-300 font-medium text-sm text-right">
          Amount
        </div>
        <div className="text-gray-300 font-medium text-sm text-right">
          Action
        </div>
      </div>

      {/* Scrollable Content */}
      <div className="relative z-20 flex-1 mt-0 overflow-y-auto px-2 pb-32">
        <PortfolioList portfolioData={mockPortfolioData} />
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
            Invite &
            <br />
            Earn
          </span>
        </Button>
      </div>
    </div>
  );
};

export default Portfolio;
