import { useNavigate } from "react-router-dom";
import { Home, ArrowLeft, BookText } from "lucide-react";
import ReceiptBg from "../assets/ReceiptBg.tsx.svg";
import TransactionList from "@/components/TransactionList";
import type { TransactionData } from "@/components/TransactionCard";
import FoxImage from "../assets/fox.svg";
import inviteearn from "../assets/InviteEarn.svg";
import clipboard from "../assets/clipboard.svg";
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
const referredFriends = Array(5).fill({
  mobile: "9456789658",
  name: "Demo name",
  date: "05-May-2025",
});

const InviteAndEarn = () => {
  const navigate = useNavigate();

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
      <div className="flex justify-around">
        <div className="text-[26px] font-racing font-normal leading-[100%] z-10 mt-[80px] ml-3">
          Invite & Earn
        </div>
        <img src={inviteearn} className="h-[146px] z-10 w-[146px]" alt="" />
      </div>

      {/* Title */}
      <div className="text-center my-4  text-xl font-bold z-10">
        <span className="text-white">Orchid</span>
        <span className="text-[#6552FE] font-bold">Sky</span>
        <span className="text-white"> Referral Program</span>
      </div>
      <div className="text-[14px] mx-auto max-w-[320px] text-center">
        Invite & Earn upto 6% extra income bonus on deposit by your friend as a
        reward. Be your own boss!
      </div>
      {/* Your Code */}
      <div className="text-center mt-6 font-bold text-lg">Your Code</div>
      <div className="mx-auto py-2 mt-2 w-[284px] h-[80px] bg-[#4C4343] rounded-md flex items-center justify-between px-4">
        <div className="text-white leading-[32px] text-[38px] font-medium mx-auto">
          VU5AXIJT
        </div>
        <img
          src={clipboard}
          className="w-[25px] h-[30px] ml-2"
          alt="Clipboard Icon"
        />
      </div>

      {/* Share Link */}
      <div className="text-center mt-6 font-bold text-lg">Share link:</div>

      <div className="ml-4 mt-2 flex items-center space-x-2">
        {/* Link box */}
        <div className="w-[87%] h-10 px-4 flex items-center text-[14px] text-black bg-white rounded-md">
          http://referdemolink.com/demo/VU5AXIJT
        </div>

        {/* Clipboard icon beside the box */}
        <img
          src={clipboard}
          className="w-[20px] h-[20px]"
          alt="Clipboard Icon"
        />
      </div>

      {/* Referred Friends Table */}
      <div className="mt-6   px-4">
        <div className="text-sm mb-2">Referred Friends</div>
        <div className="rounded-md overflow-hidden">
          <div className="grid grid-cols-3 text-center bg-[#3d3b3b] py-2 text-xs font-bold">
            <div>Mobile Number</div>
            <div>Profile Name</div>
            <div>Date to Join</div>
          </div>
          {referredFriends.map((friend, idx) => (
            <div
              key={idx}
              className={`grid grid-cols-3 text-center py-2 text-sm border-t border-gray-700 ${
                idx % 2 === 0 ? "bg-[#4c4343]" : "bg-[#716666]"
              }`}
            >
              <div>{friend.mobile}</div>
              <div>{friend.name}</div>
              <div>{friend.date}</div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default InviteAndEarn;
