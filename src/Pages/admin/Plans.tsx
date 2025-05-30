import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Plus } from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useState } from "react";

interface Plan {
  name: string;
  minInvestment: string;
  maxInvestment: string;
  roi: string;
  duration: string;
  status: "Active" | "Inactive";
}

interface PlanDialogProps {
  plan?: Plan | null;
  isEdit?: boolean;
}

// Replace CreatePlanDialog with this new component
const PlanDialog = ({ plan = null, isEdit = false }: PlanDialogProps) => {
  const [open, setOpen] = useState(false);
  const [formData, setFormData] = useState({
    name: plan?.name || "",
    minInvestment: plan?.minInvestment?.replace(/,/g, "") || "",
    maxInvestment: plan?.maxInvestment?.replace(/,/g, "") || "",
    roi: plan?.roi?.replace("%", "") || "",
    duration: plan?.duration || "",
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Handle form submission here
    if (isEdit) {
      console.log("Editing plan:", formData);
    } else {
      console.log("Creating plan:", formData);
    }
    setOpen(false);
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        {isEdit ? (
          <Button
            size="sm"
            variant="outline"
            className="w-full sm:w-auto text-xs md:text-sm"
          >
            Edit
          </Button>
        ) : (
          <Button className="w-full sm:w-auto bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800">
            <Plus className="w-4 h-4 mr-2" />
            Create Plan
          </Button>
        )}
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>
            {isEdit ? "Edit Investment Plan" : "Create New Investment Plan"}
          </DialogTitle>
          <DialogDescription>
            {isEdit
              ? "Modify the details of the investment plan."
              : "Fill in the details for the new investment plan."}
          </DialogDescription>
        </DialogHeader>
        <form onSubmit={handleSubmit}>
          <div className="grid gap-4 py-4">
            <div className="grid gap-2">
              <Label htmlFor="name">Plan Name</Label>
              <Input
                id="name"
                name="name"
                placeholder="Enter plan name"
                value={formData.name}
                onChange={handleChange}
                className="col-span-3"
              />
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div className="grid gap-2">
                <Label htmlFor="minInvestment">Min Investment ($)</Label>
                <Input
                  id="minInvestment"
                  name="minInvestment"
                  type="number"
                  placeholder="0.00"
                  value={formData.minInvestment}
                  onChange={handleChange}
                />
              </div>
              <div className="grid gap-2">
                <Label htmlFor="maxInvestment">Max Investment ($)</Label>
                <Input
                  id="maxInvestment"
                  name="maxInvestment"
                  type="number"
                  placeholder="0.00"
                  value={formData.maxInvestment}
                  onChange={handleChange}
                />
              </div>
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div className="grid gap-2">
                <Label htmlFor="roi">ROI (%)</Label>
                <Input
                  id="roi"
                  name="roi"
                  type="number"
                  placeholder="0"
                  value={formData.roi}
                  onChange={handleChange}
                />
              </div>
              <div className="grid gap-2">
                <Label htmlFor="duration">Duration</Label>
                <Input
                  id="duration"
                  name="duration"
                  placeholder="e.g., N/A"
                  value={formData.duration}
                  onChange={handleChange}
                />
              </div>
            </div>
          </div>
          <DialogFooter>
            <Button
              type="button"
              variant="outline"
              onClick={() => setOpen(false)}
            >
              Cancel
            </Button>
            <Button type="submit">
              {isEdit ? "Save Changes" : "Create Plan"}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
};

const plans: Plan[] = [
  {
    name: "Basic Plan",
    minInvestment: "100",
    maxInvestment: "1,000",
    roi: "5%",
    duration: "N/A",
    status: "Active",
  },
  {
    name: "Gold Plan",
    minInvestment: "1,000",
    maxInvestment: "10,000",
    roi: "8%",
    duration: "N/A",
    status: "Active",
  },
  {
    name: "Platinum Plan",
    minInvestment: "10,000",
    maxInvestment: "50,000",
    roi: "12%",
    duration: "N/A",
    status: "Active",
  },
  {
    name: "Diamond Plan",
    minInvestment: "50,000",
    maxInvestment: "100,000",
    roi: "15%",
    duration: "N/A",
    status: "Inactive",
  },
];
export const renderPlans = () => (
  <div className="space-y-2 p-4 md:p-6">
    {/* Header Section - Stack on mobile */}
    <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
      <h2 className="text-xl sm:text-2xl font-bold">Investment Plans</h2>
      <PlanDialog />
    </div>

    {/* Cards Grid - Single column on mobile, two columns on tablet and up */}
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6">
      {plans.map((plan, index) => (
        <Card key={index} className="w-full">
          <CardHeader className="p-4 md:p-6">
            <div className="flex flex-col sm:flex-row gap-2 sm:gap-0 justify-between items-start sm:items-center">
              <CardTitle className="text-base sm:text-lg">
                {plan.name}
              </CardTitle>
              <Badge
                variant={plan.status === "Active" ? "default" : "secondary"}
                className="text-xs"
              >
                {plan.status}
              </Badge>
            </div>
          </CardHeader>
          <CardContent className="p-4 md:p-6 pt-0 space-y-4">
            {/* Plan Details Grid */}
            <div className="grid grid-cols-2 gap-3 md:gap-4">
              <div className="space-y-1">
                <div className="text-xs md:text-sm text-gray-500">
                  Min Investment
                </div>
                <div className="text-sm md:text-base font-semibold">
                  ${plan.minInvestment}
                </div>
              </div>
              <div className="space-y-1">
                <div className="text-xs md:text-sm text-gray-500">
                  Max Investment
                </div>
                <div className="text-sm md:text-base font-semibold">
                  ${plan.maxInvestment}
                </div>
              </div>
              <div className="space-y-1">
                <div className="text-xs md:text-sm text-gray-500">ROI</div>
                <div className="text-sm md:text-base font-semibold text-green-600">
                  {plan.roi}
                </div>
              </div>
              <div className="space-y-1">
                <div className="text-xs md:text-sm text-gray-500">Duration</div>
                <div className="text-sm md:text-base font-semibold">
                  {plan.duration}
                </div>
              </div>
            </div>

            {/* Action Buttons - Full width on mobile */}
            <div className="flex flex-col sm:flex-row gap-2">
              <PlanDialog plan={plan} isEdit={true} />
              <Button
                size="sm"
                variant={plan.status === "Active" ? "destructive" : "default"}
                className="w-full sm:w-auto text-xs md:text-sm"
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
