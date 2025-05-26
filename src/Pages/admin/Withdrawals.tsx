import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

import { Download, Filter } from "lucide-react";
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

export const renderWithdrawals = () => (
  <div className="space-y-6">
    <div className="flex justify-between items-center">
      <h2 className="text-2xl font-bold">Withdrawal Management</h2>
      <div className="flex gap-2">
        <Button variant="outline">
          <Filter className="w-4 h-4 mr-2" />
          Filter
        </Button>
        <Button variant="outline">
          <Download className="w-4 h-4 mr-2" />
          Export
        </Button>
      </div>
    </div>

    <div className="grid grid-cols-4 gap-4 mb-6">
      <Card>
        <CardContent className="p-4">
          <div className="text-2xl font-bold text-red-600">$38,430</div>
          <div className="text-sm text-gray-500">Total Withdrawals</div>
        </CardContent>
      </Card>
      <Card>
        <CardContent className="p-4">
          <div className="text-2xl font-bold text-orange-600">89</div>
          <div className="text-sm text-gray-500">Pending</div>
        </CardContent>
      </Card>
      <Card>
        <CardContent className="p-4">
          <div className="text-2xl font-bold text-green-600">892</div>
          <div className="text-sm text-gray-500">Completed</div>
        </CardContent>
      </Card>
      <Card>
        <CardContent className="p-4">
          <div className="text-2xl font-bold text-red-600">23</div>
          <div className="text-sm text-gray-500">Rejected</div>
        </CardContent>
      </Card>
    </div>

    <Card>
      <CardHeader>
        <CardTitle>Withdrawal Requests</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {transactions.map((transaction, index) => (
            <div
              key={index}
              className="flex items-center justify-between p-4 border rounded-lg"
            >
              <div className="flex items-center gap-4">
                <Avatar>
                  <AvatarFallback>JW</AvatarFallback>
                </Avatar>
                <div>
                  <div className="font-medium">{transaction.user}</div>
                  <div className="text-sm text-gray-500">
                    {transaction.phone}
                  </div>
                </div>
              </div>
              <div className="text-right">
                <div className="font-semibold">${transaction.amount}</div>
                <Badge
                  variant={
                    transaction.status === "completed"
                      ? "default"
                      : transaction.status === "pending"
                      ? "secondary"
                      : "destructive"
                  }
                >
                  {transaction.status}
                </Badge>
              </div>
              <div className="text-sm text-gray-500">{transaction.date}</div>
              <div className="flex gap-2">
                <Button size="sm" variant="outline">
                  Approve
                </Button>
                <Button size="sm" variant="destructive">
                  Reject
                </Button>
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  </div>
);
