import {
  BarChart2,
  CreditCard,
  History,
  LayoutDashboard,
  Settings,
  Wallet,
} from "lucide-react";
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";
import { Link } from "react-router-dom";

export function Sidebar() {
  return (
    <div className="hidden md:flex flex-col w-64 bg-white border-r">
      <div className="p-4 border-b">
        <Link to="/" className="flex items-center gap-2">
          <div className="bg-blue-600 text-white p-1 rounded-full">
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
              <path d="M12 2L2 7l10 5 10-5-10-5z" />
              <path d="M2 17l10 5 10-5" />
              <path d="M2 12l10 5 10-5" />
            </svg>
          </div>
          <span className="font-bold text-xl">Boltz</span>
        </Link>
      </div>
      <div className="p-4 border-b">
        <div className="flex items-center gap-3">
          <div className="w-12 h-12 rounded-full bg-gray-200 overflow-hidden">
            <Avatar>
              <AvatarImage
                width={48}
                height={48}
                src="https://github.com/shadcn.png"
              />
              <AvatarFallback>CN</AvatarFallback>
            </Avatar>
          </div>
          <div>
            <h3 className="font-medium">Hello, William</h3>
            <p className="text-xs text-gray-500">williamfrancis@gmail.com</p>
          </div>
        </div>
      </div>
      <nav className="flex-1 p-4">
        <ul className="space-y-1">
          <li>
            <Link
              to="#"
              className="flex items-center gap-3 px-3 py-2 text-blue-600 bg-blue-50 rounded-md font-medium"
            >
              <LayoutDashboard className="h-5 w-5" />
              Dashboard
            </Link>
          </li>
          <li>
            <Link
              to="#"
              className="flex items-center gap-3 px-3 py-2 text-gray-600 hover:bg-gray-100 rounded-md"
            >
              <Wallet className="h-5 w-5" />
              My Wallet
            </Link>
          </li>
          <li>
            <Link
              to="#"
              className="flex items-center gap-3 px-3 py-2 text-gray-600 hover:bg-gray-100 rounded-md"
            >
              <CreditCard className="h-5 w-5" />
              Card List
            </Link>
          </li>
          <li>
            <Link
              to="#"
              className="flex items-center gap-3 px-3 py-2 text-gray-600 hover:bg-gray-100 rounded-md"
            >
              <History className="h-5 w-5" />
              History
            </Link>
          </li>
          <li>
            <Link
              to="#"
              className="flex items-center gap-3 px-3 py-2 text-gray-600 hover:bg-gray-100 rounded-md"
            >
              <BarChart2 className="h-5 w-5" />
              Transaction
            </Link>
          </li>
          <li>
            <Link
              to="#"
              className="flex items-center gap-3 px-3 py-2 text-gray-600 hover:bg-gray-100 rounded-md"
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
                <circle cx="12" cy="12" r="10" />
                <path d="M16 8h-6.5a2.5 2.5 0 0 0 0 5h3a2.5 2.5 0 0 1 0 5H6" />
                <path d="M12 18V6" />
              </svg>
              Crypto
            </Link>
          </li>
          <li>
            <Link
              to="#"
              className="flex items-center gap-3 px-3 py-2 text-gray-600 hover:bg-gray-100 rounded-md"
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
                <path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2" />
                <circle cx="9" cy="7" r="4" />
                <path d="M22 21v-2a4 4 0 0 0-3-3.87" />
                <path d="M16 3.13a4 4 0 0 1 0 7.75" />
              </svg>
              Exchange
            </Link>
          </li>
          <li>
            <Link
              to="#"
              className="flex items-center gap-3 px-3 py-2 text-gray-600 hover:bg-gray-100 rounded-md"
            >
              <Settings className="h-5 w-5" />
              Settings
            </Link>
          </li>
        </ul>
      </nav>
      <div className="p-4 border-t text-xs text-gray-500">
        <p>© 2023 All Rights Reserved</p>
        <div className="flex items-center gap-1 mt-1">
          <span>Boltz v1.0</span>
          <span>•</span>
          <span>By Developer</span>
        </div>
      </div>
    </div>
  );
}
