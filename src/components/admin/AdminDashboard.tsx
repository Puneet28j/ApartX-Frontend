import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { renderDashboard } from "@/Pages/admin/Dashboard";
import { renderDeposit } from "@/Pages/admin/Deposit";
import { renderInvestments } from "@/Pages/admin/Investments";
import { renderInvestors } from "@/Pages/admin/Investors";
import { renderPlans } from "@/Pages/admin/Plans";
import { renderReferralsHistory } from "@/Pages/admin/ReferralsHistory";
import { renderSettings } from "@/Pages/admin/Settings";
import { renderTransactions } from "@/Pages/admin/Transactions";
import { renderWalletSetting } from "@/Pages/admin/WalletSetting";
import { renderWithdrawals } from "@/Pages/admin/Withdrawals";
import {
  ArrowDownLeft,
  ArrowUpDown,
  ArrowUpRight,
  BarChart3,
  Bell,
  Gift,
  Home,
  LogOut,
  Menu,
  Search,
  Settings,
  TrendingUp,
  Users,
  Wallet,
} from "lucide-react";
import { useState } from "react";

const Dashboard = () => {
  const [activeTab, setActiveTab] = useState("Dashboard");
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const sidebarItems = [
    { icon: Home, label: "Dashboard", id: "Dashboard" },
    { icon: Wallet, label: "Wallet Setting", id: "WalletSetting" },
    { icon: ArrowDownLeft, label: "Deposit", id: "Deposit" },
    { icon: ArrowUpRight, label: "Withdrawals", id: "Withdrawals" },
    { icon: TrendingUp, label: "Investments", id: "Investments" },
    { icon: ArrowUpDown, label: "Transaction", id: "Transaction" },
    { icon: Users, label: "Investors", id: "Investors" },
    { icon: Gift, label: "Plans", id: "Plans" },
    { icon: BarChart3, label: "Referrals History", id: "ReferralsHistory" },
    { icon: Settings, label: "Settings", id: "Settings" },
    { icon: LogOut, label: "LogOut", id: "LogOut" },
  ];

  const renderContent = () => {
    switch (activeTab) {
      case "Dashboard":
        return renderDashboard();
      case "WalletSetting":
        return renderWalletSetting();
      case "Deposit":
        return renderDeposit();
      case "Withdrawals":
        return renderWithdrawals();
      case "Investments":
        return renderInvestments();
      case "Transaction":
        return renderTransactions();
      case "Investors":
        return renderInvestors();
      case "Plans":
        return renderPlans();
      case "ReferralsHistory":
        return renderReferralsHistory();
      case "Settings":
        return renderSettings();
      case "LogOut":
        return (
          <div className="flex items-center justify-center h-96">
            <Card className="w-96">
              <CardContent className="p-8 text-center">
                <LogOut className="w-16 h-16 mx-auto mb-4 text-gray-400" />
                <h3 className="text-xl font-semibold mb-2">Confirm Logout</h3>
                <p className="text-gray-500 mb-6">
                  Are you sure you want to log out?
                </p>
                <div className="flex gap-3 justify-center">
                  <Button
                    variant="outline"
                    onClick={() => setActiveTab("Dashboard")}
                  >
                    Cancel
                  </Button>
                  <Button variant="destructive">Logout</Button>
                </div>
              </CardContent>
            </Card>
          </div>
        );
      default:
        return renderDashboard();
    }
  };

  return (
    <div className="min-h-screen bg-gray-100">
      {/* Header */}
      <header
        className={`fixed top-0 h-16 bg-white border-b z-50 transition-all duration-300
        left-0 right-0
        ${isSidebarOpen ? "md:left-64" : "md:left-20"}
        md:right-0
      `}
      >
        <div className="flex items-center justify-between h-full px-4 md:px-6">
          <div className="flex items-center gap-4">
            <Button
              variant="ghost"
              size="icon"
              onClick={() => {
                if (window.innerWidth < 768) {
                  setIsMobileMenuOpen(!isMobileMenuOpen);
                } else {
                  setIsSidebarOpen(!isSidebarOpen);
                }
              }}
            >
              <Menu className="h-5 w-5" />
            </Button>
            <h1 className="text-lg md:text-xl font-semibold">
              Admin Dashboard
            </h1>
          </div>
          <div className="flex items-center gap-2 md:gap-4">
            <Button variant="ghost" size="icon" className="hidden md:flex">
              <Search className="h-5 w-5" />
            </Button>
            <Button variant="ghost" size="icon">
              <Bell className="h-5 w-5" />
            </Button>
            <Avatar>
              <AvatarFallback>AD</AvatarFallback>
            </Avatar>
          </div>
        </div>
      </header>

      {/* Mobile Sidebar Overlay */}
      {isMobileMenuOpen && (
        <div
          className="fixed inset-0 bg-black bg-opacity-50 z-40 md:hidden"
          onClick={() => setIsMobileMenuOpen(false)}
        />
      )}

      {/* Sidebar */}
      <aside
        className={`fixed sm:top-16 md:top-0 sm:rounded-tr-2xl md:rounded-none left-0 bottom-0 bg-white border-r transition-all duration-300 z-40
          ${isSidebarOpen ? "w-64" : "w-20"}
          ${isMobileMenuOpen ? "translate-x-0" : "-translate-x-full"}
          md:translate-x-0
        `}
      >
        <nav className="p-4 space-y-2">
          {sidebarItems.map((item) => (
            <Button
              key={item.id}
              variant={activeTab === item.id ? "secondary" : "ghost"}
              className={`w-full justify-start ${
                isSidebarOpen ? "px-4" : "px-2"
              }`}
              onClick={() => {
                setActiveTab(item.id);
                if (window.innerWidth < 768) {
                  setIsMobileMenuOpen(false);
                }
              }}
            >
              <item.icon className="h-5 w-5" />
              {isSidebarOpen && <span className="ml-3">{item.label}</span>}
            </Button>
          ))}
        </nav>
      </aside>

      {/* Main Content */}
      <main
        className={`transition-all duration-300 pt-16 ${
          isSidebarOpen ? "md:ml-64" : "md:ml-20"
        }`}
      >
        <div className="p-4 md:p-6">{renderContent()}</div>
      </main>
    </div>
  );
};

export default Dashboard;
