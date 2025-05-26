import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Download } from "lucide-react";

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
export const renderReferralsHistory = () => (
  <div className="space-y-6">
    <div className="flex justify-between items-center">
      <h2 className="text-2xl font-bold">Referrals History</h2>
      <Button variant="outline">
        <Download className="w-4 h-4 mr-2" />
        Export Report
      </Button>
    </div>

    <div className="grid grid-cols-4 gap-4 mb-6">
      <Card>
        <CardContent className="p-4">
          <div className="text-2xl font-bold text-purple-600">453</div>
          <div className="text-sm text-gray-500">Total Referrals</div>
        </CardContent>
      </Card>
      <Card>
        <CardContent className="p-4">
          <div className="text-2xl font-bold text-green-600">$12,450</div>
          <div className="text-sm text-gray-500">Total Earnings</div>
        </CardContent>
      </Card>
      <Card>
        <CardContent className="p-4">
          <div className="text-2xl font-bold text-blue-600">89</div>
          <div className="text-sm text-gray-500">This Month</div>
        </CardContent>
      </Card>
      <Card>
        <CardContent className="p-4">
          <div className="text-2xl font-bold text-orange-600">5.5%</div>
          <div className="text-sm text-gray-500">Commission Rate</div>
        </CardContent>
      </Card>
    </div>

    <Card>
      <CardHeader>
        <CardTitle>Referral Activity</CardTitle>
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
                  <div className="text-sm text-gray-500">
                    Referred by: John Doe
                  </div>
                </div>
              </div>
              <div className="text-right">
                <div className="font-semibold">$125.50</div>
                <div className="text-sm text-gray-500">Commission Earned</div>
              </div>
              <div className="text-sm text-gray-500">{investor.joinDate}</div>
              <Badge variant="default">Paid</Badge>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  </div>
);
