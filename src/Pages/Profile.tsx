import { DrawerDemo } from "@/components/Drawer";
import {
  ArrowLeft,
  Camera,
  Check,
  Home,
  LogOut,
  Mail,
  Pencil,
  Phone,
  Plus,
  User,
  X,
} from "lucide-react";
import { useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import { MyWalletsManagement } from "@/components/MyWalletsManagement";
import { Button } from "@/components/ui/button";
import {
  Drawer,
  DrawerContent,
  DrawerHeader,
  DrawerTitle,
} from "@/components/ui/drawer";
import { toast } from "sonner";
import Binance from "../assets/binance.svg";
import CoinBase from "../assets/Coinbase.svg";
import MetaMask from "../assets/fox.svg";
import TrustWallet from "../assets/TrustWallet.svg";

// Update QuickActionsProps interface
interface QuickActionsProps {
  email: string;
  mobile: string;
  isEditingEmail: boolean;
  isEditingMobile: boolean;
  setEmail: (email: string) => void;
  setMobile: (mobile: string) => void;
  emailInputRef: React.RefObject<HTMLInputElement | null>;
  mobileInputRef: React.RefObject<HTMLInputElement | null>;
  startEditingEmail: () => void;
  startEditingMobile: () => void;
  setIsEditingEmail: (editing: boolean) => void;
  setIsEditingMobile: (editing: boolean) => void;
}
const userWallets = [
  {
    type: "binance",
    address: "0x1234567890abcdef1234567890abcdef12345678",
    isDefault: true,
  },
  {
    type: "metamask",
    address: "0xabcdef1234567890abcdef1234567890abcdef12",
    isDefault: false,
  },
  {
    type: "coinbase",
    address: "0x7890abcdef1234567890abcdef12345678901234",
    isDefault: false,
  },
  {
    type: "trustwallet",
    address: "0x567890abcdef1234567890abcdef123456789012",
    isDefault: false,
  },
];
const API_URL = "/api/auth"; //localhost:5000/api/auth
const IMAGE_BASE = "https://apart-x.pro";
const ProfileScreen: React.FC = () => {
  const navigate = useNavigate();
  const [name, setName] = useState<string>("");
  const [email, setEmail] = useState<string>("");
  const [mobile, setMobile] = useState<string>("");
  const [image, setImage] = useState<File | null>(null);
  const [isEditingName, setIsEditingName] = useState<boolean>(false);
  const [isEditingEmail, setIsEditingEmail] = useState<boolean>(false);
  const [isEditingMobile, setIsEditingMobile] = useState<boolean>(false);
  const [showWalletDrawer, setShowWalletDrawer] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const nameInputRef = useRef<HTMLInputElement>(
    null
  ) as React.RefObject<HTMLInputElement>;
  const emailInputRef = useRef<HTMLInputElement>(null);
  const mobileInputRef = useRef<HTMLInputElement>(null);

  // Add this near the top of the file, with other interfaces
  const [initialName, setInitialName] = useState<string>("");
  const [initialEmail, setInitialEmail] = useState<string>("");
  const [initialMobile, setInitialMobile] = useState<string>("");

  // store selected file
  const [preview, setPreview] = useState<string>(""); // for previewing image

  const hasChanges: boolean =
    name !== initialName ||
    email !== initialEmail ||
    mobile !== initialMobile ||
    image !== null;

  useEffect(() => {
    fetchUserProfile();
  }, []);
  useEffect(() => {
    return () => {
      // Cleanup blob URLs when component unmounts
      if (preview && preview.startsWith("blob:")) {
        URL.revokeObjectURL(preview);
      }
    };
  }, [preview]);

  const fetchUserProfile = async () => {
    setIsLoading(true);
    try {
      const token = localStorage.getItem("token");
      if (!token) {
        toast.error("Please login again");
        navigate("/login-register");
        return;
      }

      const response = await fetch(`${API_URL}/me`, {
        method: "GET",
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
          Accept: "application/json",
        },
        credentials: "include",
      });

      if (!response.ok) {
        if (response.status === 401) {
          localStorage.removeItem("token");
          navigate("/login-register");
          toast.error("Session expired. Please login again.");
          return;
        }
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const data = await response.json();
      console.log("Profile data received:", data); // Debug log

      // Update both current and initial values
      setName(data.name || "");
      setEmail(data.email || "");
      setMobile(data.mobile || "");
      setInitialName(data.name || "");
      setInitialEmail(data.email || "");
      setInitialMobile(data.mobile || "");

      // Handle profile picture - make sure the URL is correct
      if (data.profilePic) {
        const baseUrl = API_URL.split("/api/auth")[0]; // Get base URL without /api/auth
        const imageUrl = data.profilePic.startsWith("http")
  ? data.profilePic
  : `${IMAGE_BASE}/${data.profilePic}`;
 // Combine base URL with profile pic path

        console.log("Image URL construction:", {
          baseUrl,
          profilePic: data.profilePic,
          finalUrl: imageUrl,
        });

        const img = new Image();
        img.onload = () => {
          console.log("Image loaded successfully");
          setPreview(imageUrl);
        };
        img.onerror = (e) => {
          console.error("Failed to load image:", {
            error: e,
            attemptedUrl: imageUrl,
          });
          setPreview("");
        };
        img.src = imageUrl;
      }
    } catch (error) {
      console.error("Profile fetch error:", error);
      toast.error("Failed to fetch profile");
    } finally {
      setIsLoading(false);
    }
  };

  // useEffect(() => {
  //   fetchUserWallets();
  // }, []);

  // const fetchUserWallets = async () => {
  //   try {
  //     const response = await fetch("/api/wallet");
  //     if (response.ok) {
  //       const data = await response.json();
  //       setUserWallets(data.wallets);
  //     } else {
  //       toast.error("Failed to fetch wallets");
  //     }
  //   } catch (error) {
  //     toast.error("Error fetching wallets");
  //   }
  // };

  // const handleSetDefault = async (walletType: string) => {
  //   try {
  //     const response = await fetch("/api/wallet/set-default", {
  //       method: "POST",
  //       headers: {
  //         "Content-Type": "application/json",
  //       },
  //       body: JSON.stringify({ type: walletType }),
  //     });

  //     if (response.ok) {
  //       setUserWallets((prevWallets) =>
  //         prevWallets.map((wallet) =>
  //           wallet.type === walletType
  //             ? { ...wallet, isDefault: true }
  //             : { ...wallet, isDefault: false }
  //         )
  //       );
  //       toast.success("Default wallet updated successfully");
  //     } else {
  //       toast.error("Failed to update default wallet");
  //     }
  //   } catch (error) {
  //     toast.error("Error updating default wallet");
  //   }
  // };

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>): void => {
    const file = e.target.files?.[0];
    if (file) {
      // Check file size (e.g., max 5MB)
      if (file.size > 5 * 1024 * 1024) {
        toast.error("Image size should be less than 5MB");
        return;
      }

      // Check file type
      if (!file.type.startsWith("image/")) {
        toast.error("Please select an image file");
        return;
      }

      setImage(file);
      // Clean up previous preview URL to prevent memory leaks
      if (preview && preview.startsWith("blob:")) {
        URL.revokeObjectURL(preview);
      }
      setPreview(URL.createObjectURL(file));
    }
  };

  const handleLogout = (): void => {
    try {
      // auth.logout();
      toast.success("Logged out successfully");
      navigate("/login-register");
    } catch (error) {
      toast.error("Error logging out");
    }
  };

  const handleSubmit = async (): Promise<void> => {
    setIsSubmitting(true);
    try {
      const token = localStorage.getItem("token");
      if (!token) {
        toast.error("Please login again");
        navigate("/login-register");
        return;
      }

      const formData = new FormData();

      // Only append if values have changed
      if (name !== initialName) formData.append("name", name);
      if (email !== initialEmail) formData.append("email", email);
      if (mobile !== initialMobile) formData.append("mobile", mobile);
      if (image) formData.append("profilePic", image);

      // Debug log - add this to see what's being sent
      console.log("Sending data:", {
        name: name !== initialName ? name : "unchanged",
        email: email !== initialEmail ? email : "unchanged",
        mobile: mobile !== initialMobile ? mobile : "unchanged",
        hasImage: !!image,
        imageSize: image?.size,
        imageType: image?.type,
      });

      const response = await fetch(`${API_URL}/update-profile`, {
        method: "PUT",
        headers: {
          Authorization: `Bearer ${token}`,
          // Remove Content-Type header - let browser set it for FormData
        },
        body: formData,
      });

      // Better response handling
      if (!response.ok) {
        const errorText = await response.text();
        console.error("Server response:", response.status, errorText);
        throw new Error(`Server error: ${response.status}`);
      }

      const data = await response.json();
      console.log("Update response:", data); // Debug log

      // Update state with returned data
      setName(data.name || name);
      setEmail(data.email || email);
      setMobile(data.mobile || mobile);
      setInitialName(data.name || name);
      setInitialEmail(data.email || email);
      setInitialMobile(data.mobile || mobile);

      // Handle profile picture update
      if (data.profilePic) {
        const baseUrl = API_URL.split("/api/auth")[0];
        const newImageUrl = data.profilePic.startsWith("http")
          ? data.profilePic
          : `${baseUrl}/${data.profilePic}`;

        console.log("New profile image:", {
          baseUrl,
          profilePic: data.profilePic,
          finalUrl: newImageUrl,
        });

        if (preview && preview.startsWith("blob:")) {
          URL.revokeObjectURL(preview);
        }

        setPreview(newImageUrl);
      }

      // Reset edit states and image
      setIsEditingName(false);
      setIsEditingEmail(false);
      setIsEditingMobile(false);
      setImage(null); // This is important - clear the file input

      toast.success("Profile updated successfully");
    } catch (error) {
      console.error("Update failed:", error);
      toast.error(
        error instanceof Error ? error.message : "Failed to update profile"
      );
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleCancelEdits = (): void => {
    // Clean up blob URL if exists
    if (preview && preview.startsWith("blob:")) {
      URL.revokeObjectURL(preview);
    }

    // Reset edit states
    setIsEditingName(false);
    setIsEditingEmail(false);
    setIsEditingMobile(false);

    // Reset image
    setImage(null);

    // Refetch profile data to reset values
    fetchUserProfile();
  };

  const startEditingName = (): void => {
    setIsEditingName(true);
    setTimeout(() => {
      nameInputRef.current?.focus();
    }, 0);
  };

  const startEditingEmail = (): void => {
    setIsEditingEmail(true);
    setTimeout(() => {
      emailInputRef.current?.focus();
    }, 0);
  };

  const startEditingMobile = (): void => {
    setIsEditingMobile(true);
    setTimeout(() => {
      mobileInputRef.current?.focus();
    }, 0);
  };

  const handleKeyDown = (
    e: React.KeyboardEvent<HTMLInputElement>,
    setEditing: (editing: boolean) => void
  ): void => {
    if (e.key === "Enter") {
      setEditing(false);
    }
  };

  return (
    <div className="min-h-screen relative bg-black text-white">
      {/* Gradient Background */}
      <div className="absolute h-[180px] inset-x-0 top-0 bg-gradient-to-b from-[#6552FE] via-[#683594] to-[#6B1111] opacity-90 z-0" />

      {/* Back Button */}
      <div className="relative z-10 pt-6 pl-4">
        <button
          onClick={() => navigate(-1)}
          className="flex items-center gap-2 text-white text-sm"
        >
          <ArrowLeft size={20} className="h-8 w-8 text-white" />
        </button>
      </div>

      {/* Scrollable Content */}
      <div className="relative z-10 px-8 pt-12 pb-28 max-w-screen-sm mx-auto">
        {/* Profile Section */}
        <div className="flex flex-col items-center mb-6">
          <div className="relative">
            <div className="w-[143px] h-[143px] rounded-full bg-[#6552fe] overflow-hidden flex items-center justify-center mb-3">
              {preview ? (
                <img
                  src={preview}
                  alt="Preview"
                  className="object-cover w-full h-full rounded-full"
                  onError={(e) => {
                    const img = e.target as HTMLImageElement;
                    console.error("Image load error:", {
                      src: img.src,
                      time: new Date().toISOString(),
                    });
                    setPreview("");
                  }}
                  onLoad={() =>
                    console.log("Image loaded successfully:", preview)
                  }
                />
              ) : (
                <User className="w-[143px] h-[143px] text-white" />
              )}
            </div>

            {/* Camera Icon for Image Selection */}
            <label
              htmlFor="photo-upload"
              className="absolute bottom-3 right-0 cursor-pointer"
            >
              <div className="bg-white border-2 border-black rounded-full p-2 shadow-lg">
                <Camera size={20} className="text-[#6552fe]" />
              </div>
              <input
                id="photo-upload"
                type="file"
                accept="image/*"
                className="hidden"
                onChange={handleImageChange}
              />
            </label>
          </div>

          {/* Name Input */}
          <div className="relative w-full flex justify-center mb-4">
            <input
              ref={nameInputRef}
              className={`bg-transparent border-b ${
                isEditingName ? "border-white" : "border-gray-500"
              } text-center text-3xl font-bold focus:outline-none px-10 pt-3 transition-colors w-full`}
              value={name}
              readOnly={!isEditingName}
              onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                setName(e.target.value)
              }
              onBlur={() => setIsEditingName(false)}
              onKeyDown={(e) => handleKeyDown(e, setIsEditingName)}
            />
            <Pencil
              size={18}
              className="absolute top-1 right-3 text-gray-300 cursor-pointer hover:text-white transition-colors"
              onClick={startEditingName}
            />
          </div>
        </div>

        {/* Enhanced Quick Actions with Editable Fields */}
        <QuickActions
          email={email}
          mobile={mobile}
          isEditingEmail={isEditingEmail}
          isEditingMobile={isEditingMobile}
          setEmail={setEmail}
          setMobile={setMobile}
          emailInputRef={emailInputRef}
          mobileInputRef={mobileInputRef}
          startEditingEmail={startEditingEmail}
          startEditingMobile={startEditingMobile}
          setIsEditingEmail={setIsEditingEmail}
          setIsEditingMobile={setIsEditingMobile}
        />

        {/* Action Buttons */}
        <div className="flex flex-col gap-2 mx-4">
          <button
            onClick={() => navigate("/portfolio")}
            className="w-full border-2 border-[#6552FE] text-[#6552FE] py-3 rounded-full text-center font-bold text-lg"
          >
            View Portfolio
          </button>
          <button
            onClick={() => navigate("/invite-and-earn")}
            className="w-full border-2 border-[#6552FE] text-[#FEF052] py-3 rounded-full text-center font-bold text-lg"
          >
            Invite & Earn
          </button>

          {hasChanges && (
            <div className="flex gap-3 mt-4">
              <button
                onClick={handleSubmit}
                disabled={isSubmitting}
                className={`flex-1 bg-[#6552FE] text-white py-2.5 rounded-full text-center font-medium text-base flex items-center justify-center gap-2 ${
                  isSubmitting ? "opacity-50 cursor-not-allowed" : ""
                }`}
              >
                {isSubmitting ? (
                  <>
                    <span className="animate-spin">⏳</span>
                    Saving...
                  </>
                ) : (
                  <>
                    <Check size={18} />
                    Save Changes
                  </>
                )}
              </button>
              <button
                onClick={handleCancelEdits}
                disabled={isSubmitting}
                className="flex-1 bg-gray-600 text-white py-2.5 rounded-full text-center font-medium text-base flex items-center justify-center gap-2"
              >
                <X size={18} />
                Cancel
              </button>
            </div>
          )}
        </div>
      </div>

      {/* Wallet Management Drawer */}
      <Drawer open={showWalletDrawer} onOpenChange={setShowWalletDrawer}>
        <DrawerContent className="bg-[#1a1a1a] border-gray-800 text-white">
          <DrawerHeader>
            <DrawerTitle className="text-xl font-semibold">
              Manage Wallets
            </DrawerTitle>
          </DrawerHeader>
          <div className="p-4 space-y-4">
            {userWallets.map((wallet) => (
              <div
                key={wallet.type}
                className="flex items-center justify-between p-4 bg-[#262626] rounded-lg"
              >
                <div className="flex items-center gap-3">
                  <img
                    src={
                      wallet.type === "binance"
                        ? Binance
                        : wallet.type === "metamask"
                        ? MetaMask
                        : wallet.type === "coinbase"
                        ? CoinBase
                        : TrustWallet
                    }
                    alt={wallet.type}
                    className="w-10 h-10"
                  />
                  <div>
                    <p className="font-medium capitalize">{wallet.type}</p>
                    <p className="text-sm text-gray-400">{wallet.address}</p>
                  </div>
                </div>
                <button
                  // onClick={() => handleSetDefault(wallet.type)}
                  className={`px-4 py-2 rounded-full text-sm ${
                    wallet.isDefault
                      ? "bg-[#6552FE] text-white"
                      : "bg-gray-700 text-gray-300 hover:bg-gray-600"
                  }`}
                >
                  {wallet.isDefault ? "Default" : "Set as Default"}
                </button>
              </div>
            ))}
            <Button
              onClick={() => navigate("/add-wallet")}
              className="w-full bg-[#6552FE] hover:bg-[#5542EE] text-white"
            >
              <Plus size={20} className="mr-2" />
              Add New Wallet
            </Button>
          </div>
        </DrawerContent>
      </Drawer>

      {/* Bottom Navigation */}
      <div className="fixed bottom-0 left-1/2 -translate-x-1/2 max-w-lg w-full bg-[#6552FE] py-2 flex justify-around items-center z-50 rounded-t-xl shadow-inner">
        <div
          className="flex flex-col items-center text-white "
          onClick={() => navigate("/main-screen")}
        >
          <Home className="w-5 h-5" />
          <span className="text-xs mt-1">Home</span>
        </div>
        <div className="flex flex-col items-center text-white">
          <DrawerDemo />
          <span className="text-[10px] text-center leading-tight mt-1">
            Add Trust
            <br />
            Wallet A/c
          </span>
        </div>
        <div
          className="flex flex-col items-center text-white cursor-pointer"
          onClick={handleLogout}
        >
          <LogOut className="w-5 h-5" />
          <span className="text-xs mt-1">Logout</span>
        </div>
      </div>

      {/* Add loading state for initial profile load */}
      {isLoading && (
        <div className="flex justify-center items-center h-screen">
          <div className="animate-spin text-[#6552FE]">⏳</div>
        </div>
      )}
    </div>
  );
};

export default ProfileScreen;

const QuickActions: React.FC<QuickActionsProps> = ({
  email,
  mobile,
  isEditingEmail,
  isEditingMobile,
  setEmail,
  setMobile,
  emailInputRef,
  mobileInputRef,
  startEditingEmail,
  startEditingMobile,
  setIsEditingEmail,
  setIsEditingMobile,
}) => {
  // const navigate = useNavigate();
  // const [showWalletDrawer, setShowWalletDrawer] = useState(false);

  const handleKeyDown = (
    e: React.KeyboardEvent<HTMLInputElement>,
    setEditing: (editing: boolean) => void
  ): void => {
    if (e.key === "Enter") {
      setEditing(false);
    }
  };

  return (
    <div className="bg-gradient-to-r from-[#333] to-[#444] rounded-2xl p-4 mx-2 mb-8 shadow-lg">
      {/* Email Section */}
      <div className="mb-6">
        <div className="flex items-center gap-3 mb-3">
          <div className="bg-gradient-to-br from-[#6552FE] to-[#8B5CF6] p-3 rounded-xl shadow-md">
            <Mail className="w-5 h-5 text-white" />
          </div>
          <span className="text-sm text-white font-semibold">
            Email Address
          </span>
        </div>
        <div className="relative">
          <input
            ref={emailInputRef}
            type="email"
            className={`w-full bg-[#222] border-2 ${
              isEditingEmail
                ? "border-[#6552FE] shadow-lg shadow-[#6552FE]/20"
                : "border-gray-600"
            } rounded-lg px-4 py-3 text-sm text-white focus:outline-none transition-all duration-300 pr-10`}
            value={email}
            readOnly={!isEditingEmail}
            onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
              setEmail(e.target.value)
            }
            onBlur={() => setIsEditingEmail(false)}
            onKeyDown={(e) => handleKeyDown(e, setIsEditingEmail)}
            placeholder="Enter email address"
          />
          <button
            onClick={startEditingEmail}
            className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-[#6552FE] transition-colors duration-200 p-1 rounded-md hover:bg-gray-700"
          >
            <Pencil size={16} />
          </button>
        </div>
      </div>

      {/* Mobile Section */}
      <div className="mb-6">
        <div className="flex items-center gap-3 mb-3">
          <div className="bg-gradient-to-br from-[#10B981] to-[#059669] p-3 rounded-xl shadow-md">
            <Phone className="w-5 h-5 text-white" />
          </div>
          <span className="text-sm text-white font-semibold">
            Mobile Number
          </span>
        </div>
        <div className="relative">
          <input
            ref={mobileInputRef}
            type="tel"
            className={`w-full bg-[#222] border-2 ${
              isEditingMobile
                ? "border-[#10B981] shadow-lg shadow-[#10B981]/20"
                : "border-gray-600"
            } rounded-lg px-4 py-3 text-sm text-white focus:outline-none transition-all duration-300 pr-10`}
            value={mobile}
            readOnly={!isEditingMobile}
            onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
              setMobile(e.target.value)
            }
            onBlur={() => setIsEditingMobile(false)}
            onKeyDown={(e) => handleKeyDown(e, setIsEditingMobile)}
            placeholder="Enter mobile number"
          />
          <button
            onClick={startEditingMobile}
            className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-[#10B981] transition-colors duration-200 p-1 rounded-md hover:bg-gray-700"
          >
            <Pencil size={16} />
          </button>
        </div>
      </div>

      {/* Wallet Section */}
      <div
        className="bg-gradient-to-r from-[#262626] to-[#1f1f1f] rounded-xl p-4 border border-gray-600 cursor-pointer hover:bg-[#2a2a2a] transition-colors"
        // onClick={() => setShowWalletDrawer(true)}
      >
        {/* <div className="flex items-center justify-center gap-3">
          <div className="bg-gradient-to-br from-[#F59E0B] to-[#D97706] p-3 rounded-xl shadow-md">
            <Wallet className="w-5 h-5 text-white" />
          </div>
          <div className="text-center">
            <span className="text-sm text-white font-semibold block">
              Wallet Connected
            </span>
            <span className="text-xs text-gray-400">Tap to manage</span>
          </div>
        </div> */}
        <MyWalletsManagement />
      </div>
    </div>
  );
};
