import { ChevronDown } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

export function QuickActions() {
  return (
    <div className="grid gap-6">
      <Card>
        <CardHeader className="pb-2">
          <CardTitle className="text-lg">Quick Transfer</CardTitle>
          <p className="text-sm text-gray-500">
            Lorem ipsum dolor sit amet, consectetur
          </p>
        </CardHeader>
        <CardContent>
          <div className="flex items-center gap-2 mb-4">
            <div className="w-8 h-8 rounded-full bg-blue-100 flex items-center justify-center">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                fill="none"
                stroke="blue"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                className="h-4 w-4"
              >
                <path d="M12 2v20M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6" />
              </svg>
            </div>
            <span className="font-medium">23.511 LTC</span>
            <ChevronDown className="h-4 w-4 ml-auto" />
          </div>

          <div className="space-y-4">
            <div className="bg-gray-100 rounded-md p-4 flex items-center justify-between">
              <span className="text-sm font-medium">Amount BTC</span>
              <span className="text-lg font-bold">742.4</span>
            </div>

            <Button className="w-full bg-blue-600 hover:bg-blue-700">
              TRANSFER NOW
            </Button>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader className="pb-2">
          <CardTitle className="text-lg">Quick Trade</CardTitle>
          <p className="text-sm text-gray-500">
            Lorem ipsum dolor sit amet, consectetur
          </p>
        </CardHeader>
        <CardContent>
          <div className="flex items-center gap-2 mb-4">
            <div className="w-8 h-8 rounded-full bg-yellow-100 flex items-center justify-center">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                fill="none"
                stroke="orange"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                className="h-4 w-4"
              >
                <path d="M11.767 19.089c4.924.868 6.14-6.025 1.216-6.894m-1.216 6.894L5.86 18.047m5.908 1.042-.347 1.97m1.563-8.864c4.924.869 6.14-6.025 1.215-6.893m-1.215 6.893-3.94-.694m5.155-6.2L8.29 4.26m5.908 1.042.348-1.97M7.48 20.364l3.126-17.727" />
              </svg>
            </div>
            <span className="font-medium">224.551 BTC</span>
            <ChevronDown className="h-4 w-4 ml-auto" />
          </div>

          <div className="space-y-3">
            <div className="bg-gray-100 rounded-md p-4 flex items-center justify-between">
              <span className="text-sm font-medium">Amount BTC</span>
              <span className="text-lg font-bold">52.5</span>
            </div>

            <div className="bg-gray-100 rounded-md p-4 flex items-center justify-between">
              <span className="text-sm font-medium">Price BPL</span>
            </div>

            <div className="bg-gray-100 rounded-md p-4 flex items-center justify-between">
              <span className="text-sm font-medium">Fee (1%)</span>
            </div>

            <div className="bg-gray-100 rounded-md p-4 flex items-center justify-between">
              <span className="text-sm font-medium">Total BPL</span>
            </div>

            <div className="flex gap-4 mt-4">
              <Button className="flex-1 bg-green-500 hover:bg-green-600">
                BUY
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  className="h-4 w-4 ml-2"
                >
                  <path d="m6 9 6 6 6-6" />
                </svg>
              </Button>
              <Button className="flex-1 bg-red-500 hover:bg-red-600">
                SELL
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  className="h-4 w-4 ml-2"
                >
                  <path d="m6 15 6-6 6 6" />
                </svg>
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
