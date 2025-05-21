import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { TrendingUp } from "lucide-react";
import { CartesianGrid, Line, LineChart, XAxis } from "recharts";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  type ChartConfig,
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart";
const chartData = [
  { month: "January", desktop: 186, mobile: 80 },
  { month: "February", desktop: 305, mobile: 200 },
  { month: "March", desktop: 237, mobile: 120 },
  { month: "April", desktop: 73, mobile: 190 },
  { month: "May", desktop: 209, mobile: 130 },
  { month: "June", desktop: 214, mobile: 140 },
];
const chartConfig = {
  desktop: {
    label: "Desktop",
    color: "red",
  },
  mobile: {
    label: "Mobile",
    color: "blue",
  },
} satisfies ChartConfig;

export function MarketOverview() {
  return (
    <Card className="col-span-1 md:col-span-3">
      <CardHeader className="pb-2">
        <CardTitle className="text-lg">Market Overview</CardTitle>
        <p className="text-sm text-gray-500">
          Lorem ipsum dolor sit amet, consectetur
        </p>
      </CardHeader>
      <CardContent>
        <div className="flex items-center gap-2 mb-4">
          <Tabs defaultValue="eth" className="w-full">
            <TabsList className="grid grid-cols-4 h-8">
              <TabsTrigger value="eth" className="text-xs">
                ETH
              </TabsTrigger>
              <TabsTrigger value="xmr" className="text-xs">
                XMR
              </TabsTrigger>
              <TabsTrigger value="ltc" className="text-xs">
                LTC
              </TabsTrigger>
              <TabsTrigger value="xrp" className="text-xs">
                XRP
              </TabsTrigger>
            </TabsList>
            <div className="mt-2 text-right">
              <span className="text-xs font-medium">Weekly (2023)</span>
            </div>
            <TabsContent value="eth" className="mt-0 pt-2">
              <div className="h-[200px] w-full flex items-center justify-center text-sm text-gray-500">
                <ChartContainer config={chartConfig}>
                  <LineChart
                    accessibilityLayer
                    data={chartData}
                    margin={{
                      left: 12,
                      right: 12,
                    }}
                  >
                    <CartesianGrid vertical={false} />
                    <XAxis
                      dataKey="month"
                      tickLine={false}
                      axisLine={false}
                      tickMargin={8}
                      tickFormatter={(value) => value.slice(0, 3)}
                    />
                    <ChartTooltip
                      cursor={false}
                      content={<ChartTooltipContent />}
                    />
                    <Line
                      dataKey="desktop"
                      type="monotone"
                      stroke="red"
                      strokeWidth={2}
                      dot={false}
                    />
                    <Line
                      dataKey="mobile"
                      type="monotone"
                      stroke="blue"
                      strokeWidth={2}
                      dot={false}
                    />
                  </LineChart>
                </ChartContainer>
              </div>
            </TabsContent>
            <TabsContent value="xmr" className="mt-0 pt-2">
              <div className="h-[200px] w-full flex items-center justify-center text-sm text-gray-500">
                XMR chart data
              </div>
            </TabsContent>
            <TabsContent value="ltc" className="mt-0 pt-2">
              <div className="h-[200px] w-full flex items-center justify-center text-sm text-gray-500">
                LTC chart data
              </div>
            </TabsContent>
            <TabsContent value="xrp" className="mt-0 pt-2">
              <div className="h-[200px] w-full flex items-center justify-center text-sm text-gray-500">
                XRP chart data
              </div>
            </TabsContent>
          </Tabs>
        </div>
      </CardContent>
    </Card>
  );
}
