import logo from "@/assets/ApartX 1.svg";
import Title from "@/assets/Group 48095580.svg";
import UserImage from "@/assets/viratnew.avif";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { renderDashboard } from "@/Pages/admin/Dashboard";
import { renderDashBoardTabs } from "@/Pages/admin/DashboardTabs";
import { renderInvestors } from "@/Pages/admin/Investors";
import { renderPlans } from "@/Pages/admin/Plans";
import { renderReferralsHistory } from "@/Pages/admin/ReferralsHistory";
import { renderSettings } from "@/Pages/admin/Settings";
import { renderWalletSetting } from "@/Pages/admin/WalletSetting";
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
  User,
  Users,
  Wallet,
} from "lucide-react";
import { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
const data = [
  {
    id: 1,
    type: "Deposit",
    plan: "Basic Plan",
    profileName: "John Doe",
    mobile: "+1234567890",
    amount: "$500.00",
    dateTime: "2023-10-01 12:00 PM",
    status: "Completed",
    remarks: "Deposit successful",
  },
  {
    id: 2,
    type: "Withdrawal",
    plan: "Premium Plan",
    profileName: "Jane Smith",
    mobile: "+0987654321",
    amount: "$1000.00",
    dateTime: "2023-10-02 1:30 PM",
    status: "Pending",
    remarks: "Withdrawal in process",
  },
  {
    id: 3,
    type: "Deposit",
    plan: "Standard Plan",
    profileName: "Alice Johnson",
    mobile: "+1122334455",
    amount: "$750.00",
    dateTime: "2023-10-03 2:45 PM",
    status: "Completed",
    remarks: "Deposit successful",
  },
  {
    id: 4,
    type: "Withdrawal",
    plan: "Basic Plan",
    profileName: "Bob Brown",
    mobile: "+5566778899",
    amount: "$300.00",
    dateTime: "2023-10-04 3:15 PM",
    status: "Failed",
    remarks: "Insufficient funds",
  },
  {
    id: 5,
    type: "Deposit",
    plan: "Premium Plan",
    profileName: "Charlie Davis",
    mobile: "+2233445566",
    amount: "$1200.00",
    dateTime: "2023-10-05 4:00 PM",
    status: "Completed",
    remarks: "Deposit successful",
  },

  {
    id: 6,
    type: "Withdrawal",
    plan: "Standard Plan",
    profileName: "Eve Wilson",
    mobile: "+3344556677",
    amount: "$800.00",
    dateTime: "2023-10-06 5:30 PM",
    status: "Pending",
    remarks: "Withdrawal in process",
  },
  {
    id: 7,
    type: "Deposit",
    plan: "Basic Plan",
    profileName: "Frank Miller",
    mobile: "+4455667788",
    amount: "$600.00",
    dateTime: "2023-10-07 6:15 PM",
    status: "Completed",
    remarks: "Deposit successful",
  },
  {
    id: 8,
    type: "Withdrawal",
    plan: "Premium Plan",
    profileName: "Grace Lee",
    mobile: "+9988776655",
    amount: "$400.00",
    dateTime: "2023-10-08 7:45 PM",
    status: "Failed",
    remarks: "Insufficient funds",
  },
];
const Dashboard = () => {
  const location = useLocation();
  const navigate = useNavigate();
  // Get the current tab from URL, remove the '/admin/' prefix and capitalize first letter
  const getCurrentTab = () => {
    const path = location.pathname.split("/admin/")[1] || "dashboard";
    // Convert known path values to match the exact IDs
    const pathMap: { [key: string]: string } = {
      walletsetting: "WalletSetting",
      referralshistory: "ReferralsHistory",
      logout: "LogOut",
      dashboard: "Dashboard",
    };
    return (
      pathMap[path.toLowerCase()] ||
      path.charAt(0).toUpperCase() + path.slice(1)
    );
  };

  const [activeTab, setActiveTab] = useState(getCurrentTab());
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
        return renderDashBoardTabs({ title: "Deposit", data });
      case "Withdrawals":
        return renderDashBoardTabs({ title: "Withdrawals", data });
      case "Investments":
        return renderDashBoardTabs({ title: "Investments", data });
      case "Transaction":
        return renderDashBoardTabs({ title: "Transaction", data });
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
          <div className="flex  items-center justify-center h-96">
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
        console.log("Current activeTab:", activeTab);
        return renderDashboard();
    }
  };

  // Update activeTab when URL changes
  useEffect(() => {
    setActiveTab(getCurrentTab());
  }, [location.pathname]);

  const handleTabChange = (tabId: string) => {
    setActiveTab(tabId);
    // Convert the URL to lowercase for consistency
    const urlPath = tabId.toLowerCase();
    navigate(`/admin/${urlPath}`);
    if (window.innerWidth < 768) {
      setIsMobileMenuOpen(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-100">
      {/* Header */}
      <header
        className={`fixed top-0 font-display h-16 bg-white border-b z-50 transition-all duration-300
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
          className="fixed inset-0 font-display bg-transparent bg-opacity-50 z-40 md:hidden"
          onClick={() => setIsMobileMenuOpen(false)}
        />
      )}

      {/* Sidebar */}
      <aside
        className={`fixed font-display bg-white border-r transition-all duration-300 z-40
          ${isSidebarOpen ? "w-64" : "w-20"}
          ${isMobileMenuOpen ? "translate-x-0" : "-translate-x-full"}
          
          // Mobile specific styles
          top-16 bottom-0
          
          // Desktop specific styles
          md:top-0 md:bottom-0 md:translate-x-0
          
          // Shared styles
          left-0
        `}
      >
        <div
          className={`flex items-center justify-center ${
            !isSidebarOpen ? "flex-col gap-0" : "flex"
          }  gap-0.5`}
        >
          <img className="h-24 w-24" src={logo} alt="" />
          <img className=" w-32" src={Title} alt="" />
        </div>
        <Avatar
          className={`${
            isSidebarOpen && !isMobileMenuOpen
              ? "h-[93px] w-[93px]"
              : "h-[30px] w-[30px]"
          } mx-auto my-2 border-1`}
        >
          <AvatarImage
            src={UserImage}
            alt="User Avatar"
            className={`${
              isSidebarOpen ? "h-[93px] w-[93px]" : "h-[30px] w-[30px]"
            } mx-auto my-2 transition-all duration-300 object-contain `}
          />

          <AvatarFallback>
            <User
              className={`${
                isSidebarOpen ? "h-[93px] w-[93px]" : "h-[30px] w-[30px]"
              }`}
            />
          </AvatarFallback>
        </Avatar>
        {isSidebarOpen && (
          <div className="mx-auto text-center flex flex-col text-lg ">
            Hello,William
            <span className="text-[15px] font-[400px]">admin</span>
          </div>
        )}
        <nav className="p-4 space-y-1 ">
          {sidebarItems.map((item) => (
            <Button
              key={item.id}
              variant={activeTab === item.id ? "secondary" : "ghost"}
              className={`w-full justify-start ${
                isSidebarOpen ? "px-4" : "px-2"
              }`}
              onClick={() => handleTabChange(item.id)}
            >
              <item.icon className="h-10 w-10" />
              {isSidebarOpen && <span className="ml-3">{item.label}</span>}
            </Button>
          ))}
        </nav>
      </aside>

      {/* Main Content */}
      <main
        className={`transition-all duration-300 font-display pt-16 ${
          isSidebarOpen ? "md:ml-64" : "md:ml-20"
        }`}
      >
        <div className="p-4 md:p-6">{renderContent()}</div>
      </main>
    </div>
  );
};

export default Dashboard;
