import { ArrowDownRight, ArrowUpRight } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";

export function CryptoCards() {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
      <Card>
        <CardContent className="p-6">
          <div className="flex items-center justify-between">
            <div className="bg-yellow-100 p-3 rounded-full">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                fill="none"
                stroke="orange"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                className="h-6 w-6"
              >
                <path d="M11.767 19.089c4.924.868 6.14-6.025 1.216-6.894m-1.216 6.894L5.86 18.047m5.908 1.042-.347 1.97m1.563-8.864c4.924.869 6.14-6.025 1.215-6.893m-1.215 6.893-3.94-.694m5.155-6.2L8.29 4.26m5.908 1.042.348-1.97M7.48 20.364l3.126-17.727" />
              </svg>
            </div>
            <div className="flex items-center gap-1 text-green-500 text-sm">
              <ArrowUpRight className="h-4 w-4" />
              <span>48% This week</span>
            </div>
          </div>
          <div className="mt-4">
            <h3 className="text-3xl font-bold">$984</h3>
          </div>
        </CardContent>
      </Card>
      <Card>
        <CardContent className="p-6">
          <div className="flex items-center justify-between">
            <div className="bg-orange-100 p-3 rounded-full">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                fill="none"
                stroke="orange"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                className="h-6 w-6"
              >
                <path d="M12 12.5a.5.5 0 1 0 0-1 .5.5 0 0 0 0 1Z" />
                <path d="M5 5h14v14H5z" />
                <path d="M12 7v1" />
                <path d="M12 16v1" />
                <path d="M13.5 9.5 16 7" />
                <path d="M13.5 14.5 16 17" />
                <path d="M10.5 9.5 8 7" />
                <path d="M10.5 14.5 8 17" />
              </svg>
            </div>
            <div className="flex items-center gap-1 text-red-500 text-sm">
              <ArrowDownRight className="h-4 w-4" />
              <span>48% This week</span>
            </div>
          </div>
          <div className="mt-4">
            <h3 className="text-3xl font-bold">$22,567</h3>
          </div>
        </CardContent>
      </Card>
      <Card>
        <CardContent className="p-6">
          <div className="flex items-center justify-between">
            <div className="bg-blue-100 p-3 rounded-full">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                fill="none"
                stroke="blue"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                className="h-6 w-6"
              >
                <circle cx="12" cy="12" r="10" />
                <path d="M12 6v6l4 2" />
              </svg>
            </div>
            <div className="flex items-center gap-1 text-red-500 text-sm">
              <ArrowDownRight className="h-4 w-4" />
              <span>48% This week</span>
            </div>
          </div>
          <div className="mt-4">
            <h3 className="text-3xl font-bold">$168,331.09</h3>
          </div>
        </CardContent>
      </Card>
      <Card>
        <CardContent className="p-6">
          <div className="flex items-center justify-between">
            <div className="bg-purple-100 p-3 rounded-full">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                fill="none"
                stroke="purple"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                className="h-6 w-6"
              >
                <path d="M12 2v20M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6" />
              </svg>
            </div>
            <div className="flex items-center gap-1 text-green-500 text-sm">
              <ArrowUpRight className="h-4 w-4" />
              <span>48% This week</span>
            </div>
          </div>
          <div className="mt-4">
            <h3 className="text-3xl font-bold">$7,784</h3>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
