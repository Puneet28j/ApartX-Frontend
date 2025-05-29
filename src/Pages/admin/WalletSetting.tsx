import Qrlogo from "@/assets/qrnew.svg"; // Example QR code image
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Copy, LucideDelete, Plus, Settings } from "lucide-react";
import { useState } from "react";

// Add these types at the top of the file
type WalletData = {
  label: string;
  value: string;
  icon: string;
  walletId: string;
  network: string;
  qrCode?: string; // URL for the QR code image
};

// Updated wallet data structure
const walletStats: WalletData[] = [
  {
    label: "Memecoin",
    value: "$107,884.21",
    icon: "🪙",
    walletId: "0x1234d34x43454r5678",
    network: "ETH",
    qrCode: Qrlogo,
  },
  {
    label: "Bitcoin",
    value: "$45,678.90",
    icon: "₿",
    walletId: "0x5678d34x43454r5678",
    network: "BTC",
    qrCode: Qrlogo, // Example QR code URL
  },
  {
    label: "Ethereum",
    value: "$3,456.78",
    icon: "Ξ",
    walletId: "0x9abc1234d34x43454r5678",
    network: "ETH",
    qrCode: Qrlogo, // Example QR code URL
  },
  {
    label: "Litecoin",
    value: "$123.45",
    icon: "Ł",
    walletId: "0xdefg1234d34x43454r5678",
    network: "LTC",
    qrCode: Qrlogo, // Example QR code URL
  },
  {
    label: "Ripple",
    value: "$67.89",
    icon: "XRP",
    walletId: "0xhijk1234d34x43454r5678",
    network: "XRP",
    qrCode: Qrlogo, // Example QR code URL
  },
];

// Add Wallet Dialog Component
const AddWalletDialog = () => {
  const [open, setOpen] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    walletId: "",
    network: "",
    qrCode: "",
  });
  const [previewUrl, setPreviewUrl] = useState<string>("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Handle wallet addition here
    console.log(formData);
    setOpen(false);
  };

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setPreviewUrl(reader.result as string);
        setFormData((prev) => ({ ...prev, qrCode: reader.result as string }));
      };
      reader.readAsDataURL(file);
    }
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button className="w-full sm:w-auto bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 shadow-sm">
          <Plus className="w-4 h-4 mr-2" />
          Add Wallet
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Add New Wallet</DialogTitle>
          <DialogDescription>
            Fill in the details to add a new wallet.
          </DialogDescription>
        </DialogHeader>
        <form onSubmit={handleSubmit} className="space-y-4 py-4">
          <div className="space-y-2">
            <Label htmlFor="name">Wallet Name</Label>
            <Input
              id="name"
              value={formData.name}
              onChange={(e) =>
                setFormData({ ...formData, name: e.target.value })
              }
              placeholder="Enter wallet name"
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="walletId">Wallet Address</Label>
            <Input
              id="walletId"
              value={formData.walletId}
              onChange={(e) =>
                setFormData({ ...formData, walletId: e.target.value })
              }
              placeholder="Enter wallet address"
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="network">Network</Label>
            <Input
              id="network"
              value={formData.network}
              onChange={(e) =>
                setFormData({ ...formData, network: e.target.value })
              }
              placeholder="e.g., ETH, BSC"
            />
          </div>

          {/* Add QR Code upload field */}
          <div className="space-y-2">
            <Label htmlFor="qrCode">QR Code</Label>
            <div className="flex flex-col gap-2">
              <Input
                id="qrCode"
                type="file"
                accept="image/*"
                onChange={handleImageUpload}
                className="file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-medium file:bg-blue-50 file:text-blue-700 hover:file:bg-blue-100"
              />
              {previewUrl && (
                <div className="relative w-24 h-24">
                  <img
                    src={previewUrl}
                    alt="QR Code Preview"
                    className="w-full h-full object-contain rounded-lg border border-gray-200"
                  />
                </div>
              )}
            </div>
          </div>

          <div className="flex justify-end gap-2 pt-4">
            <Button
              variant="outline"
              type="button"
              onClick={() => setOpen(false)}
            >
              Cancel
            </Button>
            <Button type="submit">Add Wallet</Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
};

// Updated Card Component
export const renderWalletSetting = () => (
  <div className="space-y-6 p-4 md:p-6">
    {/* Header with responsive layout */}
    <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
      <div className="space-y-1">
        <h2 className="text-xl sm:text-2xl font-bold tracking-tight">
          Wallet Settings
        </h2>
        <p className="text-sm text-muted-foreground">
          Manage your crypto wallets and settings
        </p>
      </div>
      <AddWalletDialog />
    </div>

    {/* Updated wallet cards grid */}
    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-6">
      {walletStats.map((wallet, index) => (
        <Card
          key={index}
          className="border-0 shadow-md hover:shadow-lg transition-all duration-200"
        >
          <CardContent className="p-4 md:p-6">
            <div className="flex items-start justify-between mb-4">
              <div className="flex items-start gap-3">
                <div className="text-2xl">{wallet.icon}</div>
                <div>
                  <h3 className="font-medium text-base text-gray-600">
                    {wallet.label}
                  </h3>
                  <p className="text-xl md:text-2xl font-bold text-gray-900 mt-1">
                    {wallet.value}
                  </p>
                </div>
              </div>
              <Button
                variant="outline"
                size="sm"
                className="h-8 w-8 p-0 rounded-full hover:bg-gray-100"
              >
                <Settings className="w-4 h-4 text-gray-600" />
              </Button>
            </div>

            {/* Wallet Details with QR Code */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-4">
              <div className="space-y-2 p-3 bg-gray-50 rounded-lg">
                <div className="space-y-1">
                  <span className="text-sm text-gray-500">Wallet ID</span>
                  <div className="flex items-center gap-2 bg-white p-2 rounded border border-gray-100">
                    <span className="text-sm font-medium truncate">
                      {wallet.walletId}
                    </span>
                    <Button
                      variant="ghost"
                      size="sm"
                      className="h-6 w-6 p-0 ml-auto shrink-0"
                      onClick={() =>
                        navigator.clipboard.writeText(wallet.walletId)
                      }
                      title="Copy to clipboard"
                    >
                      <Copy className="h-3 w-3" />
                    </Button>
                  </div>
                </div>
                <div className="flex items-center justify-between pt-1">
                  <span className="text-sm text-gray-500">Network</span>
                  <span className="text-sm font-medium px-2 py-1 bg-white rounded border border-gray-100">
                    {wallet.network}
                  </span>
                </div>
              </div>

              {wallet.qrCode && (
                <div className="flex items-center justify-center p-3 bg-gray-50 rounded-lg">
                  <div className="relative w-full aspect-square max-w-[150px]">
                    <img
                      src={wallet.qrCode}
                      alt={`${wallet.label} QR Code`}
                      className="w-full h-full object-contain rounded-lg"
                    />
                  </div>
                </div>
              )}
            </div>

            {/* Transfer Button */}
            <Button className="w-full h-9 font-medium bg-red-600 hover:bg-red-700">
              <LucideDelete className="w-4 h-4 mr-2" />
              Delete
            </Button>
          </CardContent>
        </Card>
      ))}
    </div>
  </div>
);
