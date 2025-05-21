import { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import {
  BarChart3,
  CreditCard,
  GanttChart,
  Home,
  LineChart,
  MessagesSquare,
  PackageCheck,
  Settings,
  ShoppingCart,
  Users,
  Wallet,
} from "lucide-react";

export function DashboardSidebar() {
  const [collapsed, setCollapsed] = useState(false);
  const location = useLocation();

  const navigation = [
    { name: "Dashboard", href: "/admin/dashboard", icon: Home },
    { name: "Trading", href: "/dashboard/trading", icon: LineChart },
    { name: "Market", href: "/dashboard/market", icon: BarChart3 },
    { name: "Orders", href: "/dashboard/orders", icon: ShoppingCart },
    { name: "Payments", href: "/dashboard/payments", icon: CreditCard },
    { name: "Wallet", href: "/dashboard/wallet", icon: Wallet },
    { name: "Analytics", href: "/dashboard/analytics", icon: GanttChart },
    { name: "Products", href: "/dashboard/products", icon: PackageCheck },
    { name: "Messages", href: "/dashboard/messages", icon: MessagesSquare },
    { name: "Customers", href: "/dashboard/customers", icon: Users },
    { name: "Settings", href: "/dashboard/settings", icon: Settings },
  ];

  const isActive = (path: any) => {
    return location.pathname === path;
  };

  const toggleSidebar = () => {
    setCollapsed(!collapsed);
  };

  return (
    <aside
      className={`bg-blue-900 text-white ${
        collapsed ? "w-16" : "w-64"
      } transition-all duration-300 ease-in-out hidden md:block sticky top-0 h-screen`}
    >
      <div className="flex items-center justify-between p-4 border-b border-blue-800">
        {!collapsed && (
          <Link to="/dashboard" className="font-bold text-xl">
            CryptoTrade
          </Link>
        )}
        <button
          onClick={toggleSidebar}
          className={`p-1 rounded-lg hover:bg-blue-800 ${
            collapsed ? "mx-auto" : ""
          }`}
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            className="h-5 w-5"
          >
            {collapsed ? (
              <>
                <path d="M9 18l6-6-6-6" />
              </>
            ) : (
              <>
                <path d="M15 18l-6-6 6-6" />
              </>
            )}
          </svg>
        </button>
      </div>
      <nav className="p-2">
        <ul className="space-y-1">
          {navigation.map((item) => {
            const Icon = item.icon;
            return (
              <li key={item.name}>
                <Link
                  to={item.href}
                  className={`flex items-center ${
                    collapsed ? "justify-center" : "justify-start"
                  } px-3 py-2 rounded-md ${
                    isActive(item.href) ? "bg-blue-700" : "hover:bg-blue-800"
                  }`}
                >
                  <Icon className={`h-5 w-5 ${collapsed ? "" : "mr-3"}`} />
                  {!collapsed && <span>{item.name}</span>}
                </Link>
              </li>
            );
          })}
        </ul>
      </nav>
      <div className="absolute bottom-0 w-full p-4 border-t border-blue-800">
        <div
          className={`flex items-center ${collapsed ? "justify-center" : ""}`}
        >
          <div className="h-8 w-8 rounded-full bg-blue-600 flex items-center justify-center mr-3">
            <span className="font-semibold">JD</span>
          </div>
          {!collapsed && (
            <div>
              <div className="font-medium">John Doe</div>
              <div className="text-xs text-blue-300">Premium Account</div>
            </div>
          )}
        </div>
      </div>
    </aside>
  );
}
