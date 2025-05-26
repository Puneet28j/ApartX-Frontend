import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  ArrowDownLeft,
  ArrowUpRight,
  Badge,
  DollarSign,
  TrendingUp,
} from "lucide-react";
const walletStats = [
  { label: "Memecoin", value: "$107,884.21" },
  { label: "Binance", value: "$55,411.33" },
  { label: "Trust Wallet", value: "$81,880.22" },
  { label: "Coinbase", value: "$12,432.51" },
];

const recentInvestments = [
  {
    type: "Gold",
    user: "John William",
    phone: "+918596464568",
    amount: "5000.00",
    currency: "USDT",
    date: "21st May 2023 1:15 AM",
  },
  {
    type: "Diamond",
    user: "John William",
    phone: "+918596464568",
    amount: "5000.00",
    currency: "USDT",
    date: "21st May 2023 1:15 AM",
  },
  {
    type: "Platinum",
    user: "John William",
    phone: "+918596464568",
    amount: "5000.00",
    currency: "USDT",
    date: "21st May 2023 1:15 AM",
  },
  {
    type: "Gold",
    user: "John William",
    phone: "+918596464568",
    amount: "5000.00",
    currency: "USDT",
    date: "21st May 2023 1:15 AM",
  },
  {
    type: "Master",
    user: "John William",
    phone: "+918596464568",
    amount: "5000.00",
    currency: "USDT",
    date: "21st May 2023 1:15 AM",
  },
  {
    type: "Gold",
    user: "John William",
    phone: "+918596464568",
    amount: "5000.00",
    currency: "USDT",
    date: "21st May 2023 1:15 AM",
  },
];

const transactions = Array(8)
  .fill(null)
  .map((_, i) => ({
    id: i + 1,
    amount: "5000.00",
    phone: "+918596464568",
    user: "John William",
    type: i % 2 === 0 ? "deposit" : "withdrawal",
    status: ["pending", "completed", "failed"][Math.floor(Math.random() * 3)],
    date: "21st May 2023 1:15 AM",
  }));

export const renderDashboard = () => (
  <div className="space-y-6">
    {/* Stats Cards */}
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4  md:gap-6">
      <Card className="shadow-2xl">
        <CardContent className="p-6">
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 bg-orange-100 rounded-full flex items-center justify-center">
              <DollarSign className="w-6 h-6 text-orange-600" />
            </div>
            <div>
              <div className="text-2xl font-bold">98,455</div>
              <div className="text-sm text-gray-500">Total Wallet Balance</div>
              <div className="text-xs text-orange-600">USDT</div>
            </div>
          </div>
        </CardContent>
      </Card>

      <Card className="shadow-2xl">
        <CardContent className="p-6">
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center">
              <ArrowDownLeft className="w-6 h-6 text-green-600" />
            </div>
            <div>
              <div className="text-2xl font-bold">22,567</div>
              <div className="text-sm text-gray-500">Today's Deposit</div>
              <div className="text-xs text-green-600">USDT</div>
            </div>
          </div>
        </CardContent>
      </Card>

      <Card className="shadow-2xl">
        <CardContent className="p-6">
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 bg-red-100 rounded-full flex items-center justify-center">
              <ArrowUpRight className="w-6 h-6 text-red-600" />
            </div>
            <div>
              <div className="text-2xl font-bold">1,38,33</div>
              <div className="text-sm text-gray-500">Today's Withdrawals</div>
              <div className="text-xs text-red-600">USDT</div>
            </div>
          </div>
        </CardContent>
      </Card>

      <Card className="shadow-2xl">
        <CardContent className="p-6">
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center">
              <TrendingUp className="w-6 h-6 text-blue-600" />
            </div>
            <div>
              <div className="text-2xl font-bold">8,734</div>
              <div className="text-sm text-gray-500">Today's Profit & Loss</div>
              <div className="text-xs text-blue-600">USDT</div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>

    <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 md:gap-6">
      {/* Wallet Statistics */}
      <Card>
        <CardHeader className="flex flex-row items-center justify-between">
          <CardTitle className="text-lg">Wallet Statistic</CardTitle>
          <Button variant="ghost" size="sm">
            View All
          </Button>
        </CardHeader>
        <CardContent className="space-y-4">
          {walletStats.map((stat, index) => (
            <div key={index} className="flex justify-between items-center">
              <div className="flex items-center gap-3">
                <div
                  className={`w-3 h-3 rounded-full ${
                    index === 0
                      ? "bg-purple-500"
                      : index === 1
                      ? "bg-blue-500"
                      : index === 2
                      ? "bg-red-500"
                      : "bg-green-500"
                  }`}
                ></div>
                <span className="text-sm text-gray-600">{stat.label}</span>
              </div>
              <span className="font-semibold">{stat.value}</span>
            </div>
          ))}
        </CardContent>
      </Card>

      {/* Recent Investment */}
      <Card className="col-span-2">
        <CardHeader className="flex flex-row items-center justify-between">
          <CardTitle className="text-lg">Recent Investment</CardTitle>
          <Button variant="ghost" size="sm">
            View All
          </Button>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            {recentInvestments.map((investment, index) => (
              <div
                key={index}
                className="flex items-center justify-between p-3 bg-gray-50 rounded-lg"
              >
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 bg-green-100 rounded-full flex items-center justify-center">
                    <TrendingUp className="w-4 h-4 text-green-600" />
                  </div>
                  <div>
                    <div className="font-medium text-sm">{investment.type}</div>
                    <div className="text-xs text-gray-500">
                      {investment.user}
                    </div>
                  </div>
                </div>
                <div className="text-right">
                  <div className="font-semibold text-sm">
                    {investment.amount} {investment.currency}
                  </div>
                  <div className="text-xs text-gray-500">{investment.date}</div>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>

    {/* Recent Transactions */}
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 md:gap-6">
      <Card>
        <CardHeader className="flex flex-row items-center justify-between">
          <CardTitle className="text-lg">Recent Deposit</CardTitle>
          <Button variant="ghost" size="sm">
            View All
          </Button>
        </CardHeader>
        <CardContent className="space-y-3">
          {transactions
            .filter((_, i) => i % 2 === 0)
            .map((transaction, index) => (
              <div
                key={index}
                className="flex items-center justify-between p-3 border rounded-lg"
              >
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 bg-green-100 rounded-full flex items-center justify-center">
                    <ArrowDownLeft className="w-4 h-4 text-green-600" />
                  </div>
                  <div>
                    <div className="font-medium text-sm">
                      {transaction.user}
                    </div>
                    <div className="text-xs text-gray-500">
                      {transaction.phone}
                    </div>
                  </div>
                </div>
                <div className="text-right">
                  <div className="font-semibold text-sm">
                    {transaction.amount}
                  </div>
                  <Badge type="secondary" className="text-xs">
                    Pending
                  </Badge>
                </div>
              </div>
            ))}
        </CardContent>
      </Card>

      <Card>
        <CardHeader className="flex flex-row items-center justify-between">
          <CardTitle className="text-lg">Recent Withdrawals</CardTitle>
          <Button variant="ghost" size="sm">
            View All
          </Button>
        </CardHeader>
        <CardContent className="space-y-3">
          {transactions
            .filter((_, i) => i % 2 === 1)
            .map((transaction, index) => (
              <div
                key={index}
                className="flex items-center justify-between p-3 border rounded-lg"
              >
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 bg-red-100 rounded-full flex items-center justify-center">
                    <ArrowUpRight className="w-4 h-4 text-red-600" />
                  </div>
                  <div>
                    <div className="font-medium text-sm">
                      {transaction.user}
                    </div>
                    <div className="text-xs text-gray-500">
                      {transaction.phone}
                    </div>
                  </div>
                </div>
                <div className="text-right">
                  <div className="font-semibold text-sm">
                    {transaction.amount}
                  </div>
                  <Badge type="destructive" className="text-xs">
                    Pending
                  </Badge>
                </div>
              </div>
            ))}
        </CardContent>
      </Card>
    </div>
  </div>
);
