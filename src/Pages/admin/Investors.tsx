import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Eye, Plus } from "lucide-react";

const investors = [
  {
    name: "John William",
    email: "john@example.com",
    totalInvested: "25,000",
    status: "Active",
    joinDate: "2023-01-15",
  },
  {
    name: "Sarah Johnson",
    email: "sarah@example.com",
    totalInvested: "18,500",
    status: "Active",
    joinDate: "2023-02-20",
  },
  {
    name: "Mike Chen",
    email: "mike@example.com",
    totalInvested: "32,000",
    status: "Inactive",
    joinDate: "2023-01-10",
  },
  {
    name: "Emily Davis",
    email: "emily@example.com",
    totalInvested: "15,750",
    status: "Active",
    joinDate: "2023-03-05",
  },
];
export const renderInvestors = () => (
  <div className="space-y-6">
    <div className="flex justify-between items-center">
      <h2 className="text-2xl font-bold">Investor Management</h2>
      <Button>
        <Plus className="w-4 h-4 mr-2" />
        Add Investor
      </Button>
    </div>

    <div className="grid grid-cols-4 gap-4 mb-6">
      <Card>
        <CardContent className="p-4">
          <div className="text-2xl font-bold text-blue-600">1,243</div>
          <div className="text-sm text-gray-500">Total Investors</div>
        </CardContent>
      </Card>
      <Card>
        <CardContent className="p-4">
          <div className="text-2xl font-bold text-green-600">1,156</div>
          <div className="text-sm text-gray-500">Active Investors</div>
        </CardContent>
      </Card>
      <Card>
        <CardContent className="p-4">
          <div className="text-2xl font-bold text-orange-600">87</div>
          <div className="text-sm text-gray-500">Inactive</div>
        </CardContent>
      </Card>
      <Card>
        <CardContent className="p-4">
          <div className="text-2xl font-bold text-purple-600">45</div>
          <div className="text-sm text-gray-500">New This Month</div>
        </CardContent>
      </Card>
    </div>

    <Card>
      <CardHeader>
        <CardTitle>Investor List</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {investors.map((investor, index) => (
            <div
              key={index}
              className="flex items-center justify-between p-4 border rounded-lg"
            >
              <div className="flex items-center gap-4">
                <Avatar>
                  <AvatarFallback>
                    {investor.name
                      .split(" ")
                      .map((n) => n[0])
                      .join("")}
                  </AvatarFallback>
                </Avatar>
                <div>
                  <div className="font-medium">{investor.name}</div>
                  <div className="text-sm text-gray-500">{investor.email}</div>
                </div>
              </div>
              <div className="text-right">
                <div className="font-semibold">${investor.totalInvested}</div>
                <div className="text-sm text-gray-500">Total Invested</div>
              </div>
              <div className="text-sm text-gray-500">
                Joined: {investor.joinDate}
              </div>
              <Badge
                variant={investor.status === "Active" ? "default" : "secondary"}
              >
                {investor.status}
              </Badge>
              <Button size="sm" variant="outline">
                <Eye className="w-4 h-4" />
              </Button>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  </div>
);
