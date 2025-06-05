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
          transaction={{
            id: tx.id,
            username: tx.username,
            walletImage: tx.walletImage,

            time: tx.time,
            type: tx.type,
            amount: tx.amount,
            walletType: tx.walletType,
          }}
        />
      ))}
    </div>
  );
};

export default TransactionList;
