import { ChevronDown, MoreVertical } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

export function OrderTables() {
  return (
    <div className="grid gap-6">
      <Tabs defaultValue="sell" className="w-full">
        <TabsList className="grid grid-cols-2 h-10">
          <TabsTrigger value="sell">Sell Order</TabsTrigger>
          <TabsTrigger value="buy">Buy Order</TabsTrigger>
        </TabsList>

        <TabsContent value="sell" className="mt-4">
          <Card>
            <CardHeader className="pb-2 flex flex-row items-center justify-between">
              <CardTitle className="text-lg">Sell Order</CardTitle>
              <button>
                <MoreVertical className="h-5 w-5 text-gray-500" />
              </button>
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
                <span className="font-medium">Litecoin</span>
                <ChevronDown className="h-4 w-4 ml-auto" />
              </div>

              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead>
                    <tr className="text-left text-xs text-gray-500">
                      <th className="pb-2">Price</th>
                      <th className="pb-2">Amount</th>
                      <th className="pb-2 text-right">Total</th>
                    </tr>
                  </thead>
                  <tbody className="text-sm">
                    <tr className="border-t">
                      <td className="py-2">82.3</td>
                      <td className="py-2">0.15</td>
                      <td className="py-2 text-right">$134.12</td>
                    </tr>
                    <tr className="border-t bg-blue-50">
                      <td className="py-2">83.9</td>
                      <td className="py-2">0.18</td>
                      <td className="py-2 text-right">$237.31</td>
                    </tr>
                    <tr className="border-t">
                      <td className="py-2">84.2</td>
                      <td className="py-2">0.25</td>
                      <td className="py-2 text-right">$252.58</td>
                    </tr>
                    <tr className="border-t">
                      <td className="py-2">86.2</td>
                      <td className="py-2">0.35</td>
                      <td className="py-2 text-right">$126.26</td>
                    </tr>
                    <tr className="border-t">
                      <td className="py-2">91.6</td>
                      <td className="py-2">0.75</td>
                      <td className="py-2 text-right">$46.92</td>
                    </tr>
                    <tr className="border-t">
                      <td className="py-2">92.6</td>
                      <td className="py-2">0.21</td>
                      <td className="py-2 text-right">$123.27</td>
                    </tr>
                    <tr className="border-t">
                      <td className="py-2">93.9</td>
                      <td className="py-2">0.55</td>
                      <td className="py-2 text-right">$212.56</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="buy" className="mt-4">
          <Card>
            <CardHeader className="pb-2 flex flex-row items-center justify-between">
              <CardTitle className="text-lg">Buy Order</CardTitle>
              <button>
                <MoreVertical className="h-5 w-5 text-gray-500" />
              </button>
            </CardHeader>
            <CardContent>
              <div className="flex items-center gap-2 mb-4">
                <div className="w-8 h-8 rounded-full bg-orange-100 flex items-center justify-center">
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
                <ChevronDown className="h-4 w-4 ml-auto" />
              </div>

              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead>
                    <tr className="text-left text-xs text-gray-500">
                      <th className="pb-2">Price</th>
                      <th className="pb-2">Amount</th>
                      <th className="pb-2 text-right">Total</th>
                    </tr>
                  </thead>
                  <tbody className="text-sm">
                    <tr className="border-t">
                      <td className="py-2">86.2</td>
                      <td className="py-2">0.35</td>
                      <td className="py-2 text-right">$126.26</td>
                    </tr>
                    <tr className="border-t">
                      <td className="py-2">84.2</td>
                      <td className="py-2">0.25</td>
                      <td className="py-2 text-right">$252.58</td>
                    </tr>
                    <tr className="border-t">
                      <td className="py-2">93.9</td>
                      <td className="py-2">0.75</td>
                      <td className="py-2 text-right">$46.92</td>
                    </tr>
                    <tr className="border-t bg-orange-50">
                      <td className="py-2">93.9</td>
                      <td className="py-2">0.18</td>
                      <td className="py-2 text-right">$237.31</td>
                    </tr>
                    <tr className="border-t">
                      <td className="py-2">92.6</td>
                      <td className="py-2">0.21</td>
                      <td className="py-2 text-right">$123.27</td>
                    </tr>
                    <tr className="border-t">
                      <td className="py-2">82.3</td>
                      <td className="py-2">0.15</td>
                      <td className="py-2 text-right">$134.12</td>
                    </tr>
                    <tr className="border-t">
                      <td className="py-2">84.2</td>
                      <td className="py-2">0.18</td>
                      <td className="py-2 text-right">$129.26</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}
