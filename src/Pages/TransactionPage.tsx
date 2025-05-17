import React from "react";

type TransactionPageProps = {
  statusIcon?: React.ReactNode;
  title: string;
  amount?: string;
  subtext?: string;
  details: { label: string; value: string }[];
  actions?: React.ReactNode;
};

const TransactionPage: React.FC<TransactionPageProps> = ({
  statusIcon,
  title,
  amount,
  subtext,
  details,
  actions,
}) => {
  return (
    <div className="max-w-md mx-auto p-6 bg-white rounded-2xl shadow-lg space-y-6 text-center">
      {/* Status Icon and Title */}
      <div className="flex flex-col items-center space-y-2">
        {statusIcon}
        <h1 className="text-xl font-semibold">{title}</h1>
      </div>

      {/* Amount */}
      {amount && (
        <div>
          <h2 className="text-3xl font-bold">{amount}</h2>
          {subtext && <p className="text-sm text-gray-500 mt-1">{subtext}</p>}
        </div>
      )}

      {/* Details Grid */}
      <div className="bg-gray-100 rounded-lg p-4 space-y-3 text-left">
        {details.map((item, index) => (
          <div
            key={index}
            className="flex justify-between border-b last:border-b-0 pb-2 last:pb-0 text-sm"
          >
            <span className="text-gray-600">{item.label}</span>
            <span className="font-medium text-gray-900">{item.value}</span>
          </div>
        ))}
      </div>

      {/* Actions */}
      {actions && <div className="flex justify-center gap-4">{actions}</div>}
    </div>
  );
};

export default TransactionPage;
