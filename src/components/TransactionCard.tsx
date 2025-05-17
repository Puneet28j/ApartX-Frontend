import React from "react";
import { Calendar } from "lucide-react";

export type TransactionType = "Income" | "Withdraw" | "Paid" | "Deposit";

export interface TransactionData {
  id: string;
  username: string;
  time: string;
  type: TransactionType;
  amount: number;
  walletImage: string;
}

const tagColors: Record<TransactionType, string> = {
  Income: "bg-pink-400",
  Withdraw: "bg-blue-400",
  Paid: "bg-orange-300 text-black",
  Deposit: "bg-green-300 text-black",
};

const amountColors = {
  positive: "bg-green-500",
  negative: "bg-red-600",
};

const TransactionCard: React.FC<TransactionData> = ({
  username,
  time,
  type,
  amount,
  walletImage,
}) => {
  const isPositive = amount >= 0;
  const tagColor = tagColors[type];
  const amountColor = isPositive
    ? amountColors.positive
    : amountColors.negative;

  return (
    <div className="flex items-center justify-between px-4 py-3 bg-transparent border-b border-white/10">
      {/* Left Side */}
      <div className="flex items-center gap-3">
        <img
          src={walletImage}
          alt="avatar"
          className="w-11 h-11 rounded-full"
        />
        <div className="text-white text-sm">
          <p className="font-semibold">{username}</p>
          <div className="mt-1 flex items-center gap-2 text-xs text-gray-300">
            <div className="flex items-center gap-1">
              <Calendar size={14} />
              <span>{time}</span>
            </div>
            <span
              className={`px-2 py-[2px] min-w-[70px] flex items-center justify-center rounded-full  ${tagColor}`}
            >
              {type}
            </span>
          </div>
        </div>
      </div>

      {/* Right Side */}
      <div>
        <span
          className={`text-white font-medium px-3 text-[16px] py-1 rounded-[10px] leading-[24px] ${amountColor}`}
        >
          {isPositive ? `${amount}` : amount}
        </span>
      </div>
    </div>
  );
};

export default TransactionCard;
