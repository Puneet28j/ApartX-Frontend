import { useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  Home,
  Wallet,
  LogOut,
  Mail,
  Phone,
  User,
  ArrowLeft,
  Camera,
  Pencil,
  Check,
  X,
} from "lucide-react";
import { DrawerDemo } from "@/components/Drawer";
import { auth } from "@/services/api";
import { toast } from "sonner";

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

const ProfileScreen: React.FC = () => {
  const navigate = useNavigate();
  const [name, setName] = useState<string>("John");
  const [email, setEmail] = useState<string>("john@example.com");
  const [mobile, setMobile] = useState<string>("+1 234 567 8900");
  const [image, setImage] = useState<File | null>(null);
  const [isEditingName, setIsEditingName] = useState<boolean>(false);
  const [isEditingEmail, setIsEditingEmail] = useState<boolean>(false);
  const [isEditingMobile, setIsEditingMobile] = useState<boolean>(false);
  const nameInputRef = useRef<HTMLInputElement>(null);
  const emailInputRef = useRef<HTMLInputElement>(null);
  const mobileInputRef = useRef<HTMLInputElement>(null);

  // store selected file
  const [preview, setPreview] = useState<string>(""); // for previewing image

  const hasChanges: boolean =
    isEditingName || isEditingEmail || isEditingMobile;

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>): void => {
    const file = e.target.files?.[0];
    if (file) {
      setImage(file);
      setPreview(URL.createObjectURL(file));
    }
  };

  const handleLogout = (): void => {
    try {
      auth.logout();
      toast.success("Logged out successfully");
      navigate("/login-register");
    } catch (error) {
      toast.error("Error logging out");
    }
  };

  const handleSubmit = async (): Promise<void> => {
    const formData = new FormData();
    formData.append("name", name);
    formData.append("email", email);
    formData.append("mobile", mobile);
    if (image) formData.append("photo", image);

    try {
      const res = await fetch("/api/update-profile", {
        method: "POST",
        body: formData,
      });
      const data = await res.json();
      console.log("Profile updated", data);

      // Reset editing states
      setIsEditingName(false);
      setIsEditingEmail(false);
      setIsEditingMobile(false);

      toast.success("Profile updated successfully");
    } catch (err) {
      console.error("Update failed", err);
      toast.error("Failed to update profile");
    }
  };

  const handleCancelEdits = (): void => {
    setIsEditingName(false);
    setIsEditingEmail(false);
    setIsEditingMobile(false);
    // Optionally reset values to original state
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
            onClick={() => navigate("/invite-and-earn")}
            className="w-full border-2 border-[#6552FE] text-[#FEF052] py-3 rounded-full text-center font-bold text-lg"
          >
            Invite & Earn
          </button>

          {hasChanges && (
            <div className="flex gap-3 mt-2">
              <button
                onClick={handleSubmit}
                className="flex-1 bg-[#6552FE] text-white py-2.5 rounded-full text-center font-medium text-base flex items-center justify-center gap-2"
              >
                <Check size={18} />
                Save
              </button>
              <button
                onClick={handleCancelEdits}
                className="flex-1 bg-gray-600 text-white py-2.5 rounded-full text-center font-medium text-base flex items-center justify-center gap-2"
              >
                <X size={18} />
                Cancel
              </button>
            </div>
          )}
        </div>
      </div>

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
    </div>
  );
};

export default ProfileScreen;

const SeparatorNew: React.FC = () => (
  <div className="h-10 w-px bg-gray-400 opacity-30"></div>
);

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
  const navigate = useNavigate();

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
      <div className="bg-gradient-to-r from-[#262626] to-[#1f1f1f] rounded-xl p-4 border border-gray-600">
        <div className="flex items-center justify-center gap-3">
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
      </div>
    </div>
  );
};
