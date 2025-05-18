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

  const plans = [
    { id: 1, name: "Plan-1 demo" },
    { id: 2, name: "Plan-1 demo" },
    { id: 3, name: "Plan-1 demo" },
  ];

  return (
    <div className="min-h-screen relative  bg-black text-white">
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
      <div className="relative z-10 px-8  pt-12 pb-28 max-w-screen-sm mx-auto">
        {/* Profile Section */}
        <div className="flex flex-col items-center mb-6">
          <div className="w-[143px] h-[143px] rounded-full border-4 bg-[#6552fe] overflow-hidden flex items-center justify-center mb-3">
            <User2Icon className="w-[143px] h-[143px] text-white" />
          </div>
          <h1 className="text-3xl font-bold">John</h1>
        </div>
        {/* Quick Actions */}
        <QuickActions />
        {/* Plans */}
        <div className="mb-3">
          <h2 className="text-xl font-semibold mb-4">Top Plans</h2>
          <div className="grid grid-cols-2 gap-4 mb-4">
            {plans.slice(0, 2).map((plan) => (
              <button
                onClick={() => navigate("/investment-plan")}
                key={plan.id}
                className="bg-gradient-to-r  from-red-700 to-red-500 py-3 px-2 rounded-full text-sm font-semibold"
              >
                {plan.name}
              </button>
            ))}
          </div>
          <button className="w-full bg-gradient-to-r from-red-700 to-red-500 py-3 rounded-full text-sm font-semibold">
            {plans[2].name}
          </button>
        </div>
        <div className="flex flex-col gap-2">
          {/* Portfolio Button */}
          <button className="w-full border-2 border-[#6552FE] text-[#6552FE] py-3 rounded-full text-center font-bold text-lg ">
            VIEW PORTFOLIO
          </button>
          {/* Invite & Earn Button */}
          <button
            onClick={() => navigate("/invite-and-earn")}
            className="w-full border-2 border-[#6552FE] text-[#FEF052] py-3 rounded-full text-center font-bold text-lg "
          >
            Invite & Earn
          </button>
        </div>
      </div>

      {/* Bottom Navigation */}
      <div className="fixed bottom-0 left-1/2 -translate-x-1/2 max-w-lg w-full  bg-[#6552FE] py-2 flex justify-around items-center z-50 rounded-t-xl shadow-inner">
        <div className="flex flex-col items-center text-white">
          <Home className="w-5 h-5" />
          <span className="text-xs mt-1">Home</span>
        </div>
        <div className="flex flex-col items-center text-white">
          {/* <img  src={FoxImage} alt="Fox" className="w-[50px] h-[50px]" /> */}
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

const SeparatorNew = () => {
  return <div className="h-10 w-px bg-gray-400 opacity-30"></div>;
};

const QuickActions = () => {
  return (
    <div className="bg-[#333] rounded-2xl p-2 flex items-center mx-10 mb-8">
      {/* E-Mail item */}
      <div className="flex flex-col items-center flex-1">
        <div className="bg-[#222] p-3 rounded-full mb-1">
          <Mail className="w-6 h-6 text-white" />
        </div>
        <span className="text-sm text-white">E-Mail</span>
      </div>

      {/* Separator */}
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

      {/* Separator */}
      <div className="flex items-center justify-center">
        <SeparatorNew />
      </div>

      {/* Wallet item */}
      <div className="flex flex-col items-center flex-1">
        <div className="bg-[#222] p-3 rounded-full mb-1">
          <Wallet className="w-6 h-6 text-white" />
        </div>
        <span className="text-sm text-white">Wallet</span>
      </div>
    </div>
  );
};
