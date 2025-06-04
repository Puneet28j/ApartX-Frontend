import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import {
  Drawer,
  DrawerContent,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from "@/components/ui/drawer";
import { Wallet, Check } from "lucide-react";
import { toast } from "sonner";
import Binance from "../assets/binance.svg";
import MetaMask from "../assets/fox.svg";
import CoinBase from "../assets/Coinbase.svg";
import TrustWallet from "../assets/TrustWallet.svg";

// Update WalletData interface to match backend model
interface WalletData {
  id: string;
  type: string;
  address: string;
  isActive: boolean;
  balance: number;
  qrImage?: string;
}

export const MyWalletsManagement = () => {
  const navigate = useNavigate();
  const [openDrawer, setOpenDrawer] = useState(false);
  const [userWallets, setUserWallets] = useState<WalletData[]>([]);
  const [selectedWallet, setSelectedWallet] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [isUpdating, setIsUpdating] = useState(false);

  // Fetch user wallets when drawer opens
  const fetchUserWallets = async () => {
    try {
      setIsLoading(true);
      const token = localStorage.getItem("token");

      if (!token) {
        toast.error("Please login again");
        navigate("/login-register");
        return;
      }

      const response = await axios.get(`${import.meta.env.VITE_URL}/wallet`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      const formattedWallets = response.data.wallets.map((wallet: any) => ({
        id: wallet._id,
        type: wallet.walletType,
        address: wallet.walletID,
        isActive: wallet.isActive,
        balance: wallet.balance || 0,
        qrImage: wallet.qrImage,
      }));

      setUserWallets(formattedWallets);

      // Set active wallet as selected
      const activeWallet = formattedWallets.find((w: WalletData) => w.isActive);
      if (activeWallet) {
        setSelectedWallet(activeWallet.id);
      } else if (formattedWallets.length > 0) {
        // If no active wallet but wallets exist, select the first one
        setSelectedWallet(formattedWallets[0].id);
      }
    } catch (error) {
      console.error("Error fetching wallets:", error);
      toast.error("Failed to fetch wallets");
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    if (openDrawer) {
      fetchUserWallets();
    }
  }, [openDrawer]);

  const handleWalletSelection = async (walletId: string) => {
    if (isUpdating) return; // Prevent multiple simultaneous updates

    try {
      setIsUpdating(true);
      const token = localStorage.getItem("token");
      if (!token) {
        toast.error("Please login again");
        return;
      }

      // Optimistically update the UI first
      setSelectedWallet(walletId);
      setUserWallets((prevWallets) =>
        prevWallets.map((wallet) => ({
          ...wallet,
          isActive: wallet.id === walletId,
        }))
      );

      // Make API calls to update the backend
      // First, deactivate all wallets
      const deactivatePromises = userWallets
        .filter((wallet) => wallet.isActive && wallet.id !== walletId)
        .map((wallet) =>
          axios.patch(
            `${import.meta.env.VITE_URL}/wallet/${wallet.id}/toggle`,
            {},
            {
              headers: { Authorization: `Bearer ${token}` },
            }
          )
        );

      await Promise.all(deactivatePromises);

      // Then activate the selected wallet (only if it's not already active)
      const targetWallet = userWallets.find((w) => w.id === walletId);
      if (!targetWallet?.isActive) {
        await axios.patch(
          `${import.meta.env.VITE_URL}/wallet/${walletId}/toggle`,
          {},
          {
            headers: { Authorization: `Bearer ${token}` },
          }
        );
      }

      toast.success("Default wallet updated successfully");
    } catch (error) {
      console.error("Error setting default wallet:", error);
      if (axios.isAxiosError(error)) {
        const errorMessage =
          error.response?.data?.message || "Failed to update default wallet";
        toast.error(errorMessage);
      }
      // Refresh wallets to ensure UI is in sync with backend
      await fetchUserWallets();
    } finally {
      setIsUpdating(false);
    }
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

  const activeWallet = userWallets.find((w) => w.isActive);

  return (
    <Drawer open={openDrawer} onOpenChange={setOpenDrawer}>
      <DrawerTrigger asChild>
        <div className="flex items-center justify-center gap-3 cursor-pointer">
          <div className="bg-gradient-to-br from-[#F59E0B] to-[#D97706] p-3 rounded-xl shadow-md">
            <Wallet className="w-5 h-5 text-white" />
          </div>
          <div className="text-center">
            <span className="text-sm text-white font-semibold block">
              {activeWallet?.type.toUpperCase() || "No Active Wallet"}
            </span>
            <span className="text-sm text-white font-semibold block">
              {activeWallet?.address.slice(0, 6)}...
              {activeWallet?.address.slice(-4) || "N/A"}
            </span>
            <span className="text-xs text-gray-400">Tap to manage</span>
          </div>
        </div>
      </DrawerTrigger>

      <DrawerContent className="bg-[#1a1a1a] border-gray-800 text-white font-display max-w-lg w-full mx-auto h-[70vh]">
        <DrawerHeader className="border-b border-gray-800 sticky top-0 bg-[#1a1a1a] z-10">
          <DrawerTitle className="text-xl text-white font-semibold flex items-center justify-between">
            My Wallets
            {/* <Button
              onClick={() => {
                setOpenDrawer(false);
                navigate("/add-wallet");
              }}
              size="sm"
              className="bg-[#6552FE] hover:bg-[#5542EE] text-white"
            >
              <Plus size={16} className="mr-1" />
              Add
            </Button> */}
          </DrawerTitle>
        </DrawerHeader>

        <div className="flex-1 overflow-y-auto p-4">
          {isLoading ? (
            <div className="flex items-center justify-center h-full">
              <div className="text-center">
                <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-[#6552FE] mx-auto mb-2"></div>
                <p className="text-gray-400">Loading wallets...</p>
              </div>
            </div>
          ) : userWallets.length === 0 ? (
            <div className="h-full flex flex-col items-center justify-center">
              <div className="text-center space-y-4">
                <div className="w-16 h-16 bg-gray-800 rounded-full flex items-center justify-center mx-auto">
                  <Wallet className="w-8 h-8 text-gray-500" />
                </div>
                <div>
                  <p className="text-lg font-medium text-white mb-2">
                    No wallets found
                  </p>
                  <p className="text-gray-400 mb-6">
                    Add your first wallet to get started
                  </p>
                </div>
                {/* <Button
                  onClick={() => {
                    setOpenDrawer(false);
                    navigate("/add-wallet");
                  }}
                  className="bg-[#6552FE] hover:bg-[#5542EE] text-white px-6 py-2"
                >
                  <Plus size={20} className="mr-2" />
                  Add New Wallet
                </Button> */}
              </div>
            </div>
          ) : (
            <div className="space-y-3">
              <div className="mb-4">
                <p className="text-sm text-gray-400">
                  Select a wallet to set as default ({userWallets.length} wallet
                  {userWallets.length !== 1 ? "s" : ""} available)
                </p>
              </div>

              {userWallets.map((wallet) => (
                <div
                  key={wallet.id}
                  className={`relative p-4 rounded-xl border-2 transition-all duration-200 cursor-pointer ${
                    selectedWallet === wallet.id
                      ? "border-[#6552FE] bg-[#6552FE]/10 shadow-lg"
                      : "border-gray-700 hover:border-gray-600 hover:bg-gray-800/50"
                  } ${isUpdating ? "opacity-70 pointer-events-none" : ""}`}
                  onClick={() => handleWalletSelection(wallet.id)}
                >
                  <div className="flex items-center gap-4">
                    {/* Wallet Icon */}
                    <div className="flex-shrink-0">
                      <img
                        src={getWalletIcon(wallet.type)}
                        alt={wallet.type}
                        className="w-12 h-12 rounded-lg"
                      />
                    </div>

                    {/* Wallet Info */}
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-2 mb-1">
                        <p className="font-semibold capitalize text-lg text-white truncate">
                          {wallet.type}
                        </p>
                        {wallet.isActive && (
                          <span className="px-2 py-1 text-xs bg-[#6552FE] text-white rounded-full">
                            Active
                          </span>
                        )}
                      </div>
                      <p className="text-sm text-gray-400 truncate font-mono">
                        {wallet.address}
                      </p>
                      <p className="text-sm text-green-400 font-medium mt-1">
                        Balance: ${wallet.balance.toFixed(2)}
                      </p>
                    </div>

                    {/* Radio Button */}
                    <div className="flex-shrink-0">
                      <div
                        className={`w-6 h-6 rounded-full border-2 flex items-center justify-center transition-all duration-200 ${
                          selectedWallet === wallet.id
                            ? "border-[#6552FE] bg-[#6552FE] shadow-lg"
                            : "border-gray-400 hover:border-gray-300"
                        }`}
                      >
                        {selectedWallet === wallet.id && (
                          <Check className="w-4 h-4 text-white" />
                        )}
                      </div>
                    </div>
                  </div>

                  {/* Loading indicator for this specific wallet */}
                  {isUpdating && selectedWallet === wallet.id && (
                    <div className="absolute inset-0 bg-black/20 rounded-xl flex items-center justify-center">
                      <div className="animate-spin rounded-full h-6 w-6 border-b-2 border-[#6552FE]"></div>
                    </div>
                  )}
                </div>
              ))}
            </div>
          )}
        </div>
      </DrawerContent>
    </Drawer>
  );
};
