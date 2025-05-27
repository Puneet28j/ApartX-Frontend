import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import {
  Check,
  X,
  Camera,
  MessageSquare,
  ArrowDownRight,
  // Loader2,
  QrCode,
} from "lucide-react";
import virat from "@/assets/viratnew.avif";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { useState, useEffect } from "react";

export interface DataTableProps {
  title: string;
  data: {
    id: number;
    type: string;
    plan: string;
    profileName: string;
    mobile: string;
    amount: string;
    dateTime: string;
    status: string;
    remarks: string;
  }[];
  onViewAll?: () => void;
  showViewAll?: boolean;
}

const getStatusStyles = (status: string) => {
  switch (status.toLowerCase()) {
    case "completed":
      return "bg-green-100 text-green-800 border-green-200";
    case "pending":
      return "bg-yellow-100 text-yellow-800 border-yellow-200";
    case "failed":
      return "bg-red-100 text-red-800 border-red-200";
    default:
      return "bg-gray-100 text-gray-800 border-gray-200";
  }
};

const MobileCard = ({
  dataColumns,
  title,
}: {
  dataColumns: DataTableProps["data"][0];
  title: DataTableProps["title"];
}) => (
  <div className="bg-white rounded-xl border border-gray-100 p-3 mb-3 shadow-md shadow-gray-100/50 mx-2">
    {/* Header Section */}
    <div className="flex items-center justify-between mb-4">
      <div className="flex items-center gap-2">
        <div className="h-8 w-8 rounded-lg bg-gradient-to-br from-green-500 to-green-600 flex items-center justify-center shadow-sm">
          <ArrowDownRight className="h-4 w-4 text-white" />
        </div>
        <div className="min-w-0 flex-1">
          <h3 className="font-bold text-base text-gray-900 truncate">
            {title}
          </h3>
          <p className="text-xs text-gray-500">Transaction</p>
        </div>
      </div>
      <span
        className={`inline-flex items-center px-2 py-1 rounded-lg text-xs font-medium ${getStatusStyles(
          dataColumns.status
        )}`}
      >
        {dataColumns.status}
      </span>
    </div>

    {/* Profile Section */}
    <div className="bg-gray-50 rounded-lg p-3 mb-3">
      <div className="flex items-center gap-3">
        <Avatar className="h-10 w-10 ring-1 ring-white shadow-sm">
          <AvatarImage src={virat} alt="User" className="object-cover" />
          <AvatarFallback className="bg-gradient-to-br from-blue-500 to-purple-600 text-white font-bold text-sm">
            {dataColumns.profileName
              .split(" ")
              .map((n) => n[0])
              .join("")}
          </AvatarFallback>
        </Avatar>
        <div className="flex-1 min-w-0">
          <h4 className="font-bold text-sm text-gray-900 truncate">
            {dataColumns.profileName}
          </h4>
          <p className="text-gray-600 text-xs truncate">{dataColumns.mobile}</p>
        </div>
      </div>
    </div>

    {/* Transaction Details */}
    <div className="space-y-2 mb-4">
      <div className="flex items-center justify-between py-2 border-b border-gray-100">
        <span className="text-xs font-medium text-gray-500">Plan</span>
        <span className="font-bold text-sm text-gray-900 truncate ml-2">
          {dataColumns.plan}
        </span>
      </div>

      <div className="flex items-center justify-between py-2 border-b border-gray-100">
        <span className="text-xs font-medium text-gray-500">Amount</span>
        <span className="font-bold text-sm text-green-600 truncate ml-2">
          {dataColumns.amount}
        </span>
      </div>

      <div className="flex items-center justify-between py-2 border-b border-gray-100">
        <span className="text-xs font-medium text-gray-500">Date</span>
        <span className="font-medium text-sm text-gray-900 truncate ml-2">
          {dataColumns.dateTime}
        </span>
      </div>

      {dataColumns.remarks && (
        <div className="flex items-start justify-between py-2">
          <span className="text-xs font-medium text-gray-500 mt-0.5">
            Remarks
          </span>
          <span className="font-medium text-sm text-gray-900 text-right flex-1 ml-2 leading-tight">
            {dataColumns.remarks}
          </span>
        </div>
      )}
    </div>

    {/* Action Buttons */}
    <div className="flex gap-2">
      {/* Primary Actions */}
      <Button
        className="flex-1 bg-green-500 hover:bg-green-600 text-white border-0 rounded-lg font-medium shadow-sm text-xs h-8"
        size="sm"
      >
        <Check className="h-3 w-3 mr-1" />
        Approve
      </Button>
      <Button
        className="flex-1 bg-red-500 hover:bg-red-600 text-white border-0 rounded-lg font-medium shadow-sm text-xs h-8"
        size="sm"
      >
        <X className="h-3 w-3 mr-1" />
        Reject
      </Button>

      {/* Secondary Actions */}
      <Button
        variant="outline"
        size="sm"
        className="rounded-lg border border-blue-200 text-blue-600 hover:bg-blue-50 p-0 w-8 h-8 flex items-center justify-center"
      >
        {title === "Deposit" ? (
          <Camera className="h-3 w-3" />
        ) : (
          <QrCode className="h-3 w-3" />
        )}
      </Button>
      <Button
        variant="outline"
        size="sm"
        className="rounded-lg border border-gray-200 text-gray-600 hover:bg-gray-50 p-0 w-8 h-8 flex items-center justify-center"
      >
        <MessageSquare className="h-3 w-3" />
      </Button>
    </div>
  </div>
);
// First, create a proper component instead of just a render function
const DepositComponent = ({ title, data }: DataTableProps) => {
  const [isMobile, setIsMobile] = useState(window.innerWidth < 768);
  // const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 768);
    };
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  // if (isLoading) {
  //   return (
  //     <div className="flex items-center justify-center h-[50vh]">
  //       <Loader2 className="h-8 w-8 animate-spin text-primary" />
  //     </div>
  //   );
  // }

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold">{title}</h2>
      </div>

      {isMobile ? (
        <div className="space-y-4">
          {data.map((dataColumns) => (
            <MobileCard
              key={dataColumns.id}
              title={title}
              dataColumns={dataColumns}
            />
          ))}
        </div>
      ) : (
        <Card>
          <CardContent className="font-[10px]">
            <Table>
              <TableCaption>A list of your {title}.</TableCaption>
              <TableHeader className="bg-gray-100 font-bold">
                <TableRow className="font-extrabold">
                  <TableHead>Type</TableHead>
                  <TableHead>Plan</TableHead>
                  <TableHead>Profile Name</TableHead>
                  <TableHead>Mobile</TableHead>
                  <TableHead>Amount</TableHead>
                  <TableHead>Date & Time</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead>Remarks</TableHead>
                  <TableHead className="text-right">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {data.map((dataColumns) => (
                  <TableRow key={dataColumns.id}>
                    <TableCell className="font-medium">
                      <ArrowDownRight className="inline h-8 w-8 rounded-full bg-green-500 text-white" />
                    </TableCell>
                    <TableCell>{dataColumns.plan}</TableCell>
                    <TableCell className="flex items-center gap-1">
                      <Avatar className="h-8 w-8 rounded-full ">
                        <AvatarImage
                          src={virat}
                          alt="User"
                          className="object-contain"
                        />
                        <AvatarFallback>CN</AvatarFallback>
                      </Avatar>
                      <div>{dataColumns.profileName}</div>
                    </TableCell>
                    <TableCell>{dataColumns.mobile}</TableCell>
                    <TableCell>{dataColumns.amount}</TableCell>
                    <TableCell>{dataColumns.dateTime}</TableCell>
                    <TableCell>
                      <span
                        className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium border ${getStatusStyles(
                          dataColumns.status
                        )}`}
                      >
                        {dataColumns.status}
                      </span>
                    </TableCell>
                    <TableCell>{dataColumns.remarks}</TableCell>
                    <TableCell className="text-right">
                      <div className="flex justify-end gap-2">
                        <Button
                          variant="outline"
                          size="sm"
                          className="h-8 w-8 p-0 hover:cursor-pointer text-green-600"
                          title="Approve"
                        >
                          <Check className="h-4 w-4" />
                        </Button>
                        <Button
                          variant="outline"
                          size="sm"
                          className="h-8 w-8 p-0 hover:cursor-pointer text-red-600"
                          title="Reject"
                        >
                          <X className="h-4 w-4" />
                        </Button>
                        {title === "Deposit" ? (
                          <Button
                            variant="outline"
                            size="sm"
                            className="h-8 w-8 p-0 hover:cursor-pointer text-blue-600"
                            title="Screenshot"
                          >
                            <Camera className="h-4 w-4" />
                          </Button>
                        ) : (
                          <Button
                            variant="outline"
                            size="sm"
                            className="h-8 w-8 p-0 hover:cursor-pointer text-blue-600"
                            title="Wallet QR"
                          >
                            <QrCode className="h-4 w-4" />
                          </Button>
                        )}
                        <Button
                          variant="outline"
                          size="sm"
                          className="h-8 w-8 p-0 hover:cursor-pointer text-gray-600"
                          title="Remarks"
                        >
                          <MessageSquare className="h-4 w-4" />
                        </Button>
                      </div>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </CardContent>
        </Card>
      )}
    </div>
  );
};

// Then update the render function to use the component
export const renderDashBoardTabs = (props: DataTableProps) => {
  return <DepositComponent {...props} />;
};
