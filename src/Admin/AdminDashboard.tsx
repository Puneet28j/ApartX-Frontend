import { ChevronDown } from "lucide-react";
import { Button } from "@/components/ui/button";
import { CryptoCards } from "@/components/admin/crypto-cards";
import { CurrentStatistic } from "@/components/admin/current-statistic";
import { MarketOverview } from "@/components/admin/market-overview";
import { PaymentCards } from "@/components/admin/payment-cards";
import { RecentTrading } from "@/components/admin/recent-trading";
import { OrderTables } from "@/components/admin/order-tables";
import { QuickActions } from "@/components/admin/quicks-actions";
import { RecentContacts } from "@/components/admin/recent-contacts";

export default function Dashboard() {
  return (
    <div className="flex flex-col gap-4 sm:gap-6 w-full mx-auto">
      <div className="flex flex-wrap items-center justify-between gap-4">
        <h1 className="text-xl sm:text-2xl font-bold">Dashboard</h1>
        <div className="flex items-center gap-2 sm:gap-4">
          <div className="flex items-center gap-1 sm:gap-2">
            <Button variant="ghost" size="sm" className="gap-1">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                className="h-4 w-4"
              >
                <circle cx="12" cy="12" r="10" />
                <line x1="12" y1="8" x2="12" y2="12" />
                <line x1="12" y1="16" x2="12.01" y2="16" />
              </svg>
              21
            </Button>
            <div className="flex items-center gap-1 text-sm">
              Median, 6h <ChevronDown className="h-4 w-4" />
            </div>
          </div>
          <Button className="bg-blue-600 hover:bg-blue-700 text-xs sm:text-sm">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              className="h-4 w-4 mr-1 sm:mr-2"
            >
              <rect x="3" y="4" width="18" height="18" rx="2" ry="2" />
              <line x1="16" y1="2" x2="16" y2="6" />
              <line x1="8" y1="2" x2="8" y2="6" />
              <line x1="3" y1="10" x2="21" y2="10" />
            </svg>
            Filter Periods
          </Button>
        </div>
      </div>

      {/* Wrap CryptoCards in a div with responsive padding and overflow handling */}
      <div className="w-full overflow-x-auto pb-2">
        <div className="min-w-full">
          <CryptoCards />
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4 sm:gap-6">
        <CurrentStatistic />
        <MarketOverview />
      </div>

      {/* Add wrapper for PaymentCards */}
      <div className="w-full overflow-x-auto pb-2">
        <div className="min-w-full">
          <PaymentCards />
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 sm:gap-6">
        <RecentTrading />
        <OrderTables />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 sm:gap-6">
        <QuickActions />
        <RecentContacts />
      </div>
    </div>
  );
}
