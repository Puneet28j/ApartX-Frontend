import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Plus } from "lucide-react";
const plans = [
  {
    name: "Basic Plan",
    minInvestment: "100",
    maxInvestment: "1,000",
    roi: "5%",
    duration: "30 days",
    status: "Active",
  },
  {
    name: "Gold Plan",
    minInvestment: "1,000",
    maxInvestment: "10,000",
    roi: "8%",
    duration: "60 days",
    status: "Active",
  },
  {
    name: "Platinum Plan",
    minInvestment: "10,000",
    maxInvestment: "50,000",
    roi: "12%",
    duration: "90 days",
    status: "Active",
  },
  {
    name: "Diamond Plan",
    minInvestment: "50,000",
    maxInvestment: "100,000",
    roi: "15%",
    duration: "120 days",
    status: "Inactive",
  },
];
export const renderPlans = () => (
  <div className="space-y-6">
    <div className="flex justify-between items-center">
      <h2 className="text-2xl font-bold">Investment Plans</h2>
      <Button>
        <Plus className="w-4 h-4 mr-2" />
        Create Plan
      </Button>
    </div>

    <div className="grid grid-cols-2 gap-6">
      {plans.map((plan, index) => (
        <Card key={index}>
          <CardHeader>
            <div className="flex justify-between items-center">
              <CardTitle className="text-lg">{plan.name}</CardTitle>
              <Badge
                variant={plan.status === "Active" ? "default" : "secondary"}
              >
                {plan.status}
              </Badge>
            </div>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <div>
                <div className="text-sm text-gray-500">Min Investment</div>
                <div className="font-semibold">${plan.minInvestment}</div>
              </div>
              <div>
                <div className="text-sm text-gray-500">Max Investment</div>
                <div className="font-semibold">${plan.maxInvestment}</div>
              </div>
              <div>
                <div className="text-sm text-gray-500">ROI</div>
                <div className="font-semibold text-green-600">{plan.roi}</div>
              </div>
              <div>
                <div className="text-sm text-gray-500">Duration</div>
                <div className="font-semibold">{plan.duration}</div>
              </div>
            </div>
            <div className="flex gap-2">
              <Button size="sm" variant="outline">
                Edit
              </Button>
              <Button
                size="sm"
                variant={plan.status === "Active" ? "destructive" : "default"}
              >
                {plan.status === "Active" ? "Deactivate" : "Activate"}
              </Button>
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  </div>
);
