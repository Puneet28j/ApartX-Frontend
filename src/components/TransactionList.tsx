// components/TransactionList.tsx
import React from "react";
import TransactionCard, { type TransactionData } from "./TransactionCard";

interface TransactionListProps {
  transactions: TransactionData[];
}

const TransactionList: React.FC<TransactionListProps> = ({ transactions }) => {
  return (
    <div className="space-y-3">
      {transactions.map((tx) => (
        <TransactionCard
          key={tx.id}
          walletImage={tx.walletImage}
          username={tx.username}
          time={tx.time}
          type={tx.type}
          amount={tx.amount}
          id={tx.id}
        />
      ))}
    </div>
  );
};

export default TransactionList;
