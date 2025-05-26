import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Plus, Settings } from "lucide-react";

const walletStats = [
  { label: "Memecoin", value: "$107,884.21" },
  { label: "Binance", value: "$55,411.33" },
  { label: "Trust Wallet", value: "$81,880.22" },
  { label: "Coinbase", value: "$12,432.51" },
];

export const renderWalletSetting = () => (
  <div className="space-y-6">
    <div className="flex justify-between items-center">
      <h2 className="text-2xl font-bold">Wallet Settings</h2>
      <Button>
        <Plus className="w-4 h-4 mr-2" />
        Add Wallet
      </Button>
    </div>

    <div className="grid grid-cols-2 gap-6">
      {walletStats.map((wallet, index) => (
        <Card key={index}>
          <CardContent className="p-6">
            <div className="flex justify-between items-start mb-4">
              <div>
                <h3 className="font-semibold text-lg">{wallet.label}</h3>
                <p className="text-2xl font-bold text-green-600">
                  {wallet.value}
                </p>
              </div>
              <Button variant="outline" size="sm">
                <Settings className="w-4 h-4" />
              </Button>
            </div>
            <div className="flex gap-2">
              <Button size="sm" variant="outline">
                View
              </Button>
              <Button size="sm">Transfer</Button>
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  </div>
);
