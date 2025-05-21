import { Bell, MessageSquare, Menu, Search, ShoppingCart } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Link } from "react-router-dom";

export function DashboardHeader() {
  return (
    <header className="bg-white border-b px-4 sm:px-6 py-3 flex items-center justify-between sticky top-0 z-10">
      <div className="flex items-center gap-2 sm:gap-4">
        <Button variant="ghost" size="icon" className="md:hidden">
          <Menu className="h-5 w-5" />
          <span className="sr-only">Toggle menu</span>
        </Button>
        <div className="relative w-full sm:w-72">
          <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-gray-400" />
          <Input
            type="search"
            placeholder="Find something here..."
            className="w-full bg-gray-100 border-0 pl-9"
          />
        </div>
      </div>
      <nav className="hidden md:flex items-center gap-6">
        <Link to="#" className="text-sm font-medium">
          Socials
        </Link>
        <Link to="#" className="text-sm font-medium">
          +Live Training
        </Link>
        <Link to="#" className="text-sm font-medium">
          Blog
        </Link>
        <Link to="#" className="text-sm font-medium">
          Trading News
        </Link>
      </nav>
      <div className="flex items-center gap-1 sm:gap-3">
        <Button variant="ghost" size="icon" className="relative">
          <Bell className="h-5 w-5" />
          <span className="absolute top-1 right-1 h-4 w-4 bg-blue-600 text-[10px] font-bold text-white rounded-full flex items-center justify-center">
            12
          </span>
        </Button>
        <Button variant="ghost" size="icon" className="relative">
          <MessageSquare className="h-5 w-5" />
          <span className="absolute top-1 right-1 h-4 w-4 bg-blue-600 text-[10px] font-bold text-white rounded-full flex items-center justify-center">
            5
          </span>
        </Button>
        <Button variant="ghost" size="icon" className="relative">
          <ShoppingCart className="h-5 w-5" />
          <span className="absolute top-1 right-1 h-4 w-4 bg-blue-600 text-[10px] font-bold text-white rounded-full flex items-center justify-center">
            2
          </span>
        </Button>
        <Button
          variant="ghost"
          size="icon"
          className="rounded-full bg-blue-600 text-white"
        >
          <span className="sr-only">User menu</span>
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
            <path d="M19 21v-2a4 4 0 0 0-4-4H9a4 4 0 0 0-4 4v2" />
            <circle cx="12" cy="7" r="4" />
          </svg>
        </Button>
      </div>
    </header>
  );
}
