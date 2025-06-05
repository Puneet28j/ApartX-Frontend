import React from "react";
import { Calendar } from "lucide-react";

export type TransactionType =
  | "Income"
  | "Withdraw"
  | "Paid"
  | "Deposit"
  | "Referral";

export interface TransactionData {
  id: string;
  username: string;
  time: string;
  type: string;
  amount: number;
  walletType: string;
  walletImage: string;
}

const tagColors: Record<TransactionType, string> = {
  Income: "bg-pink-400",
  Withdraw: "bg-blue-400",
  Paid: "bg-orange-300 text-black",
  Deposit: "bg-green-300 text-black",
  Referral: "bg-purple-500 text-white",
};

const amountColors = {
  positive: "bg-green-500",
  negative: "bg-red-600",
};

interface TransactionCardProps {
  transaction: {
    id: string;

    username: string;
    time: string;
    type: string;
    amount: number;
    walletType: string;
    walletImage: string;
  };
}

export const TransactionCard: React.FC<TransactionCardProps> = ({
  transaction,
}) => {
  const walletImage = transaction.walletType || "";

  const isPositive = transaction.amount >= 0;
  const tagColor = tagColors[transaction.type as TransactionType];
  const amountColor = isPositive
    ? amountColors.positive
    : amountColors.negative;

  return (
    <div className="flex items-center justify-between p-4 bg-[#171717] rounded-lg mb-3">
      {/* Left Side */}
      <div className="flex items-center gap-3">
        <div className="w-10 h-10 rounded-full overflow-hidden bg-gray-800">
          <img
            src={walletImage}
            alt={`${transaction.walletType} wallet`}
            className="w-full h-full object-cover"
          />
        </div>
        <div className="text-white text-sm">
          <p className="font-semibold">{transaction.username}</p>
          <div className="mt-1 flex items-center gap-2 text-xs text-gray-300">
            <div className="flex items-center gap-1">
              <Calendar size={14} />
              <span>{transaction.time}</span>
            </div>
            <span
              className={`px-2 py-[2px] min-w-[70px] flex items-center justify-center rounded-full  ${tagColor}`}
            >
              {transaction.type}
            </span>
          </div>
        </div>
      </div>

      {/* Right Side */}
      <div>
        <span
          className={`text-white font-medium px-3 text-[16px] py-1 rounded-[10px] leading-[24px] ${amountColor}`}
        >
          {isPositive ? `${transaction.amount}` : transaction.amount}
        </span>
      </div>
    </div>
  );
};

export default TransactionCard;
