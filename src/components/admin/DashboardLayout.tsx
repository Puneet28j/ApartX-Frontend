import { Outlet } from "react-router-dom";
import { DashboardSidebar } from "./dashboardSidebar";
import { DashboardHeader } from "./dashboardHeader";
export function DashboardLayout() {
  return (
    <div className="flex min-h-screen font-display bg-gray-50">
      <DashboardSidebar />
      <div className="flex-1 flex flex-col">
        <DashboardHeader />
        <main className="flex-1 p-3 sm:p-4 md:p-6 overflow-auto">
          <Outlet />
        </main>
      </div>
    </div>
  );
}
