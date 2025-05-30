import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useState } from "react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

const investors: Investor[] = [
  {
    name: "John William",
    mobile: "+1 234-567-8901",
    totalInvested: "25,000",
    status: "Active",
    joinDate: "2023-01-15",
  },
  {
    name: "Sarah Johnson",
    mobile: "+1 345-678-9012",
    totalInvested: "18,500",
    status: "Active",
    joinDate: "2023-02-20",
  },
  {
    name: "Mike Chen",
    mobile: "+1 456-789-0123",
    totalInvested: "32,000",
    status: "Inactive",
    joinDate: "2023-01-10",
  },
  {
    name: "Emily Davis",
    mobile: "+1 567-890-1234",
    totalInvested: "15,750",
    status: "Active",
    joinDate: "2023-03-05",
  },
];

// Add interface for type safety
interface Investor {
  name: string;
  mobile: string;
  totalInvested: string;
  status: "Active" | "Inactive";
  joinDate: string;
}

// Change from function expression to component
export const InvestorsList = function () {
  const [investorsList, setInvestorsList] = useState<Investor[]>(investors);

  const handleStatusChange = (
    index: number,
    newStatus: "Active" | "Inactive"
  ) => {
    const updatedInvestors = [...investorsList];
    updatedInvestors[index] = {
      ...updatedInvestors[index],
      status: newStatus,
    };
    setInvestorsList(updatedInvestors);
    // Here you can make your API call to update the backend
  };

  return (
    <div className="space-y-6 p-4 md:p-6">
      {/* Header */}
      <div className="flex justify-between items-center">
        <h2 className="text-xl sm:text-2xl font-bold tracking-tight">
          Investor Management
        </h2>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-3 md:gap-4">
        <Card>
          <CardContent className="p-4">
            <div className="text-xl sm:text-2xl font-bold text-blue-600">
              1,243
            </div>
            <div className="text-xs sm:text-sm text-gray-500">
              Total Investors
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <div className="text-xl sm:text-2xl font-bold text-green-600">
              1,156
            </div>
            <div className="text-xs sm:text-sm text-gray-500">
              Active Investors
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <div className="text-xl sm:text-2xl font-bold text-orange-600">
              87
            </div>
            <div className="text-xs sm:text-sm text-gray-500">Inactive</div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <div className="text-xl sm:text-2xl font-bold text-purple-600">
              45
            </div>
            <div className="text-xs sm:text-sm text-gray-500">
              New This Month
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Investors List */}
      <Card>
        <CardHeader>
          <CardTitle className="text-lg sm:text-xl">Investor List</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {investorsList.map((investor, index) => (
              <div
                key={index}
                className="flex flex-col sm:flex-row sm:items-center justify-between p-4 border rounded-lg gap-4"
              >
                {/* Investor Info */}
                <div className="flex items-center gap-4">
                  <Avatar className="h-10 w-10">
                    <AvatarFallback>
                      {investor.name
                        .split(" ")
                        .map((n) => n[0])
                        .join("")}
                    </AvatarFallback>
                  </Avatar>
                  <div>
                    <div className="font-medium">{investor.name}</div>
                    <div className="text-sm text-gray-500">
                      {investor.mobile}
                    </div>
                  </div>
                </div>

                {/* Mobile: Stack info vertically, Desktop: Show in row */}
                <div className="flex flex-col sm:flex-row sm:items-center gap-4 sm:gap-6 mt-4 sm:mt-0">
                  {/* Investment Amount */}
                  <div className="text-right sm:text-left">
                    <div className="font-semibold">
                      ${investor.totalInvested}
                    </div>
                    <div className="text-xs sm:text-sm text-gray-500">
                      Total Invested
                    </div>
                  </div>

                  {/* Join Date */}
                  <div className="text-right sm:text-left">
                    <div className="text-xs sm:text-sm text-gray-500">
                      Joined: {new Date(investor.joinDate).toLocaleDateString()}
                    </div>
                  </div>

                  {/* Status Badge */}
                  <div className="relative flex items-center justify-end sm:justify-start w-[100px]">
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <Badge
                          variant={
                            investor.status === "Active"
                              ? "default"
                              : "secondary"
                          }
                          className="cursor-pointer hover:opacity-80 w-full text-center"
                        >
                          {investor.status}
                        </Badge>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent
                        align="end"
                        alignOffset={0}
                        sideOffset={5}
                        className="w-[100px]"
                      >
                        <DropdownMenuItem
                          onClick={() => handleStatusChange(index, "Active")}
                          className={`${
                            investor.status === "Active" ? "text-green-600" : ""
                          } justify-center`}
                        >
                          Active
                        </DropdownMenuItem>
                        <DropdownMenuItem
                          onClick={() => handleStatusChange(index, "Inactive")}
                          className={`${
                            investor.status === "Inactive"
                              ? "text-gray-600"
                              : ""
                          } justify-center`}
                        >
                          Inactive
                        </DropdownMenuItem>
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
};
