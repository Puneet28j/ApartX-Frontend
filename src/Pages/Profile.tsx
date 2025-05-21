import { useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  Home,
  Wallet,
  LogOut,
  Mail,
  Phone,
  User2Icon,
  ArrowLeft,
} from "lucide-react";
import { DrawerDemo } from "@/components/Drawer";

const ProfileScreen = () => {
  const navigate = useNavigate();
  const [name, setName] = useState("John");
  const [image, setImage] = useState<File | null>(null);
  // store selected file
  const [preview, setPreview] = useState(""); // for previewing image

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setImage(file);
      setPreview(URL.createObjectURL(file));
    }
  };
  console.log(image);
  const handleSubmit = async () => {
    const formData = new FormData();
    formData.append("name", name);
    if (image) formData.append("photo", image);

    try {
      const res = await fetch("/api/update-profile", {
        method: "POST",
        body: formData,
      });
      const data = await res.json();
      console.log("Profile updated", data);
    } catch (err) {
      console.error("Update failed", err);
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
          <label htmlFor="photo-upload" className="cursor-pointer">
            <div className="w-[143px] h-[143px] rounded-full  bg-[#6552fe] overflow-hidden flex items-center justify-center mb-3 relative">
              {preview ? (
                <img
                  src={preview}
                  alt="Preview"
                  className="object-cover w-full h-full rounded-full"
                />
              ) : (
                <User2Icon className="w-[143px] h-[143px] text-white" />
              )}
              <input
                id="photo-upload"
                type="file"
                accept="image/*"
                className="hidden"
                onChange={handleImageChange}
              />
            </div>
          </label>
          <input
            className="bg-transparent border-b border-gray-500 text-center text-3xl font-bold focus:outline-none focus:border-white"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
        </div>

        {/* Quick Actions */}
        <QuickActions />

        {/* Action Buttons */}
        <div className="flex flex-col gap-2">
          <button className="w-full border-2 border-[#6552FE] text-[#6552FE] py-3 rounded-full text-center font-bold text-lg ">
            VIEW PORTFOLIO
          </button>
          <button
            onClick={() => navigate("/invite-and-earn")}
            className="w-full border-2 border-[#6552FE] text-[#FEF052] py-3 rounded-full text-center font-bold text-lg "
          >
            Invite & Earn
          </button>
          <button
            onClick={handleSubmit}
            className="w-full bg-[#6552FE] text-white py-3 rounded-full text-center font-bold text-lg mt-2"
          >
            Save Changes
          </button>
        </div>
      </div>

      {/* Bottom Navigation */}
      <div className="fixed bottom-0 left-1/2 -translate-x-1/2 max-w-lg w-full bg-[#6552FE] py-2 flex justify-around items-center z-50 rounded-t-xl shadow-inner">
        <div className="flex flex-col items-center text-white">
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
        <div className="flex flex-col items-center text-white">
          <LogOut className="w-5 h-5" />
          <span className="text-xs mt-1">Logout</span>
        </div>
      </div>
    </div>
  );
};

export default ProfileScreen;

const SeparatorNew = () => (
  <div className="h-10 w-px bg-gray-400 opacity-30"></div>
);

const QuickActions = () => {
  const navigate = useNavigate();
  return (
    <div className="bg-[#333] rounded-2xl p-2 flex items-center mx-10 mb-8">
      {/* E-Mail item */}
      <div className="flex flex-col items-center flex-1">
        <div className="bg-[#222] p-3 rounded-full mb-1">
          <Mail className="w-6 h-6 text-white" />
        </div>
        <span className="text-sm text-white">E-Mail</span>
      </div>

      <div className="flex items-center justify-center">
        <SeparatorNew />
      </div>

      {/* Mobile item */}
      <div className="flex flex-col items-center flex-1">
        <div className="bg-[#222] p-3 rounded-full mb-1">
          <Phone className="w-6 h-6 text-white" />
        </div>
        <span className="text-sm text-white">Mobile</span>
      </div>

      <div className="flex items-center justify-center">
        <SeparatorNew />
      </div>

      {/* Wallet item */}
      <div className="flex flex-col items-center flex-1">
        <div
          // onClick={() => navigate("/add-trust-wallet")}
          className="bg-[#222] p-3 rounded-full mb-1"
        >
          <Wallet className="w-6 h-6 text-white" />
        </div>
        <span className="text-sm text-white">Wallet</span>
      </div>
    </div>
  );
};
