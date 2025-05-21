import { ArrowDown, ArrowUp } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

export function RecentTrading() {
  return (
    <Card>
      <CardHeader className="pb-2">
        <CardTitle className="text-lg">Recent Trading Activities</CardTitle>
        <p className="text-sm text-gray-500">
          Lorem ipsum dolor sit amet, consectetur
        </p>
      </CardHeader>
      <CardContent>
        <Tabs defaultValue="today" className="w-full">
          <div className="flex justify-end mb-4">
            <TabsList className="grid grid-cols-3 h-8">
              <TabsTrigger value="monthly" className="text-xs">
                Monthly
              </TabsTrigger>
              <TabsTrigger value="weekly" className="text-xs">
                Weekly
              </TabsTrigger>
              <TabsTrigger value="today" className="text-xs">
                Today
              </TabsTrigger>
            </TabsList>
          </div>

          <TabsContent value="today" className="mt-0">
            <div className="space-y-4">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-green-100 flex items-center justify-center text-green-600">
                  <ArrowUp className="h-5 w-5" />
                </div>
                <div className="flex-1">
                  <div className="flex items-center">
                    <div className="flex items-center gap-2">
                      <div className="w-5 h-5 rounded-full bg-yellow-100 flex items-center justify-center">
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          viewBox="0 0 24 24"
                          fill="none"
                          stroke="orange"
                          strokeWidth="2"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          className="h-3 w-3"
                        >
                          <path d="M11.767 19.089c4.924.868 6.14-6.025 1.216-6.894m-1.216 6.894L5.86 18.047m5.908 1.042-.347 1.97m1.563-8.864c4.924.869 6.14-6.025 1.215-6.893m-1.215 6.893-3.94-.694m5.155-6.2L8.29 4.26m5.908 1.042.348-1.97M7.48 20.364l3.126-17.727" />
                        </svg>
                      </div>
                      <span className="font-medium">Bitcoin</span>
                    </div>
                  </div>
                </div>
                <div className="text-right">
                  <div className="text-sm font-medium">06:24:45 AM</div>
                  <div className="text-green-500">+$5,553</div>
                </div>
                <div className="px-3 py-1 bg-green-100 text-green-600 text-xs rounded-full">
                  Completed
                </div>
              </div>

              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-red-100 flex items-center justify-center text-red-600">
                  <ArrowDown className="h-5 w-5" />
                </div>
                <div className="flex-1">
                  <div className="flex items-center">
                    <div className="flex items-center gap-2">
                      <div className="w-5 h-5 rounded-full bg-blue-100 flex items-center justify-center">
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          viewBox="0 0 24 24"
                          fill="none"
                          stroke="blue"
                          strokeWidth="2"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          className="h-3 w-3"
                        >
                          <path d="M12 2v20M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6" />
                        </svg>
                      </div>
                      <span className="font-medium">Ethereum</span>
                    </div>
                  </div>
                </div>
                <div className="text-right">
                  <div className="text-sm font-medium">06:24:45 AM</div>
                  <div className="text-red-500">-$542</div>
                </div>
                <div className="px-3 py-1 bg-gray-100 text-gray-600 text-xs rounded-full">
                  Pending
                </div>
              </div>

              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-red-100 flex items-center justify-center text-red-600">
                  <ArrowDown className="h-5 w-5" />
                </div>
                <div className="flex-1">
                  <div className="flex items-center">
                    <div className="flex items-center gap-2">
                      <div className="w-5 h-5 rounded-full bg-orange-100 flex items-center justify-center">
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          viewBox="0 0 24 24"
                          fill="none"
                          stroke="orange"
                          strokeWidth="2"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          className="h-3 w-3"
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
                      <span className="font-medium">Monero</span>
                    </div>
                  </div>
                </div>
                <div className="text-right">
                  <div className="text-sm font-medium">06:24:45 AM</div>
                  <div className="text-red-500">-$912</div>
                </div>
                <div className="px-3 py-1 bg-red-100 text-red-600 text-xs rounded-full">
                  Cancelled
                </div>
              </div>

              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-green-100 flex items-center justify-center text-green-600">
                  <ArrowUp className="h-5 w-5" />
                </div>
                <div className="flex-1">
                  <div className="flex items-center">
                    <div className="flex items-center gap-2">
                      <div className="w-5 h-5 rounded-full bg-gray-100 flex items-center justify-center">
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          viewBox="0 0 24 24"
                          fill="none"
                          stroke="gray"
                          strokeWidth="2"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          className="h-3 w-3"
                        >
                          <path d="M11.767 19.089c4.924.868 6.14-6.025 1.216-6.894m-1.216 6.894L5.86 18.047m5.908 1.042-.347 1.97m1.563-8.864c4.924.869 6.14-6.025 1.215-6.893m-1.215 6.893-3.94-.694m5.155-6.2L8.29 4.26m5.908 1.042.348-1.97M7.48 20.364l3.126-17.727" />
                        </svg>
                      </div>
                      <span className="font-medium">Litecoin</span>
                    </div>
                  </div>
                </div>
                <div className="text-right">
                  <div className="text-sm font-medium">06:24:45 AM</div>
                  <div className="text-green-500">+$7,762</div>
                </div>
                <div className="px-3 py-1 bg-green-100 text-green-600 text-xs rounded-full">
                  Completed
                </div>
              </div>
            </div>
          </TabsContent>

          <TabsContent value="weekly" className="mt-0">
            <div className="h-[300px] flex items-center justify-center text-sm text-gray-500">
              Weekly trading data
            </div>
          </TabsContent>

          <TabsContent value="monthly" className="mt-0">
            <div className="h-[300px] flex items-center justify-center text-sm text-gray-500">
              Monthly trading data
            </div>
          </TabsContent>
        </Tabs>
      </CardContent>
    </Card>
  );
}
