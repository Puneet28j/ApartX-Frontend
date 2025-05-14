import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";

const LoginForm = () => {
  const navigate = useNavigate();
  return (
    <div className="flex flex-col h-full w-full bg-[#070707] px-3 py-6">
      {/* 1. Header (always at top) */}
      <div className="flex-none text-center">
        <div className="text-white text-xl font-bold">
          Orchid<span className="text-[#6552FE]">Sky</span>
        </div>
        <div className="mt-3 font-medium text-[#F7F7F7] text-[32px] leading-tight">
          Let's Get Started
        </div>
      </div>

      {/* 2. Center box (grows to fill, then centers its children) */}
      <div className="flex-1 flex flex-col justify-center space-y-4">
        <input
          type="text"
          className="h-12 bg-white rounded-lg px-4 w-full"
          placeholder="Login / Mobile No."
        />
        <input
          type="password"
          className="h-12 bg-white rounded-lg px-4 w-full"
          placeholder="Password"
        />
        <div className="text-white no-underline text-right text-sm ">
          Forgot Password?
        </div>
      </div>

      {/* 3. Footer (flex-none, sits at bottom of the outer flex) */}
      <div className="flex-none flex flex-col gap-3">
        <Button
          className="w-full h-12 bg-white text-black font-semibold rounded-[16px]"
          onClick={() => navigate("/main-screen")}
        >
          Login
        </Button>
        <Button
          className="w-full h-12 bg-[#6552FE] text-white font-semibold rounded-[16px]"
          onClick={() => navigate("/register")}
        >
          Register
        </Button>
      </div>
    </div>
  );
};

export default LoginForm;
