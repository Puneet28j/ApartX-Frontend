import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import {
  Drawer,
  DrawerContent,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from "@/components/ui/drawer";
import { Wallet, Plus, Check } from "lucide-react";
import { toast } from "sonner";
import Binance from "../assets/binance.svg";
import MetaMask from "../assets/fox.svg";
import CoinBase from "../assets/Coinbase.svg";
import TrustWallet from "../assets/TrustWallet.svg";
import { useState } from "react";

interface WalletData {
  id: string;
  type: string;
  address: string;
  isDefault: boolean;
}

const dummyWallets: WalletData[] = [
  {
    id: "meta1",
    type: "MetaMask",
    address: "0x742d35Cc6634C0532925a3b844Bc454e4438cddfv",
    isDefault: false,
  },
  {
    id: "new1",
    type: "new",
    address: "bnb1jxfh2g85q3v0tdq56fnevx6xcxtcnhtsmcu64m",
    isDefault: false,
  },
  {
    id: "coin1",
    type: "Coinbase",
    address: "0x123f681646d4A755815f9CB19e1aCc8565a0c2AC",
    isDefault: false,
  },
  {
    id: "trust1",
    type: "TrustWallet",
    address: "0x456f681646d4A755815f9CB19e1aCc8565a0c2BD",
    isDefault: false,
  },
  {
    id: "meta2",
    type: "MetaMask",
    address: "0x742d35Cc6634C0532925a3b844Bc454e4438f44e",
    isDefault: false,
  },
  {
    id: "new2",
    type: "new",
    address: "bnb1jxfh2g85q3v0tdq56fnevx6xcxtcnhtsmcu64m",
    isDefault: false,
  },
  {
    id: "coin2",
    type: "Coinbase",
    address: "0x123f681646d4A755815f9CB19e1aCc8565a0c2AC",
    isDefault: false,
  },
  {
    id: "trust2",
    type: "TrustWallet",
    address: "0x456f681646d4A755815f9CB19e1aCc8565a0c2BD",
    isDefault: false,
  },
];

export const MyWalletsManagement = () => {
  const navigate = useNavigate();
  const [openDrawer, setOpenDrawer] = useState(false);
  const [userWallets, setUserWallets] = useState<WalletData[]>(dummyWallets);
  const [selectedWallet, setSelectedWallet] = useState<string | null>(
    dummyWallets.find((w) => w.isDefault)?.id || null
  );
  const handleSetDefault = (walletId: string) => {
    setUserWallets((prevWallets) =>
      prevWallets.map((wallet) => ({
        ...wallet,
        isDefault: wallet.id === walletId,
      }))
    );
    setSelectedWallet(walletId);
    setOpenDrawer(false);
    toast.success("Default wallet updated successfully");
  };

  const getWalletIcon = (type: string) => {
    switch (type.toLowerCase()) {
      case "binance":
        return Binance;
      case "metamask":
        return MetaMask;
      case "coinbase":
        return CoinBase;
      case "trustwallet":
        return TrustWallet;
      case "new":
        return TrustWallet;
      default:
        return TrustWallet;
    }
  };

  return (
    <Drawer open={openDrawer} onOpenChange={setOpenDrawer}>
      <DrawerTrigger asChild>
        <div className="flex items-center justify-center gap-3 cursor-pointer">
          <div className="bg-gradient-to-br from-[#F59E0B] to-[#D97706] p-3 rounded-xl shadow-md">
            <Wallet className="w-5 h-5 text-white" />
          </div>
          <div className="text-center">
            <span className="text-sm text-white font-semibold block">
              Wallet Connected
            </span>
            <span className="text-xs text-gray-400">Tap to manage</span>
          </div>
        </div>
      </DrawerTrigger>

      <DrawerContent className="bg-[#1a1a1a] border-gray-800 text-white font-display max-w-lg w-full mx-auto h-[60vh]">
        <DrawerHeader className="border-b border-gray-800 sticky top-0 bg-[#1a1a1a] z-10">
          <DrawerTitle className="text-xl text-white font-semibold">
            My Wallets
          </DrawerTitle>
        </DrawerHeader>

        <div className="flex-1 overflow-y-auto p-4 space-y-4">
          {userWallets.length === 0 ? (
            <div className="h-full flex flex-col items-center justify-center">
              <p className="text-gray-400 mb-4">No wallets added yet</p>
              <Button
                onClick={() => {
                  setOpenDrawer(false);
                  navigate("/add-wallet");
                }}
                className="bg-[#6552FE] hover:bg-[#5542EE] text-white"
              >
                <Plus size={20} className="mr-2" />
                Add New Wallet
              </Button>
            </div>
          ) : (
            <div className="grid grid-cols-1 gap-4 pb-4">
              {userWallets.map((wallet) => (
                <div
                  key={wallet.id}
                  className={`relative p-4 rounded-xl border-2 transition-all cursor-pointer ${
                    selectedWallet === wallet.id
                      ? "border-[#6552FE] bg-[#6552FE]/10"
                      : "border-gray-700 hover:border-gray-600"
                  }`}
                  onClick={() => handleSetDefault(wallet.id)}
                >
                  <div className="flex items-center gap-4">
                    <img
                      src={getWalletIcon(wallet.type)}
                      alt={wallet.type}
                      className="w-12 h-12 flex-shrink-0"
                    />
                    <div className="flex-1 min-w-0">
                      <p className="font-medium capitalize text-lg">
                        {wallet.type}
                      </p>
                      <p className="text-sm text-gray-400 truncate">
                        {wallet.address}
                      </p>
                    </div>
                    <div className="w-8 h-8 flex-shrink-0 flex items-center justify-center">
                      {selectedWallet === wallet.id && (
                        <div className="bg-[#6552FE] rounded-full p-1">
                          <Check className="w-5 h-5 text-white" />
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </DrawerContent>
    </Drawer>
  );
};
