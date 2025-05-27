// components/TransactionList.tsx
import React from "react";
import PortfolioCard from "./PortfolioCard";

export interface PortfolioData {
  id: string;
  plan: string;
  date: string;
  amount: number;
}
interface PortfolioListProps {
  portfolioData: PortfolioData[];
}

const PortfolioList: React.FC<PortfolioListProps> = ({ portfolioData }) => {
  return (
    <div className="space-y-3">
      {portfolioData.map((tx) => (
        <PortfolioCard
          key={tx.id}
          plan={tx.plan}
          date={tx.date}
          amount={tx.amount}
          id={tx.id}
        />
      ))}
    </div>
  );
};

export default PortfolioList;
