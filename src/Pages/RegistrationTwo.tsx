import { Button } from "@/components/ui/button";
import { ArrowLeft } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { REGEXP_ONLY_DIGITS } from "input-otp";

import {
  InputOTP,
  InputOTPGroup,
  InputOTPSlot,
} from "@/components/ui/input-otp";

const RegistrationTwo = () => {
  const navigate = useNavigate();
  return (
    <div className="flex flex-col h-full w-full bg-[#070707]  py-6 ">
      {/* Top Back Button + Line */}
      <div className="flex flex-col gap-2 mb-6">
        <button
          onClick={() => navigate("/login-register")}
          className="flex items-center gap-2 text-white text-sm"
        >
          <ArrowLeft size={20} className=" h-8 w-8 m-1 text-white" />
        </button>
        <div className="border-t  border-white border-4 w-full" />
      </div>

      <div className=" flex flex-col gap-6 w-full px-3 h-full">
        {/* Header */}
        <div className="flex-none text-start">
          <h2 className="mt-3 font-medium text-[#F7F7F7] text-[28px] leading-tight">
            Confirm your phone
          </h2>
          <p className="text-[#F7F7F7] text-sm mt-1">
            We send 6 digit code to +91 17205566
          </p>
        </div>

        {/* Form */}
        <div className="flex flex-col gap-5 mt-10 items-center text-white">
          <InputOTP
            maxLength={6}
            pattern={REGEXP_ONLY_DIGITS}
            className="w-full"
          >
            <InputOTPGroup>
              <InputOTPSlot index={0} className="text-3xl font-semibold " />
              <InputOTPSlot index={1} className="text-3xl font-semibold " />
              <InputOTPSlot index={2} className="text-3xl font-semibold" />
              <InputOTPSlot index={3} className="text-3xl font-semibold" />
              <InputOTPSlot index={4} className="text-3xl font-semibold" />
              <InputOTPSlot index={5} className="text-3xl font-semibold " />
            </InputOTPGroup>
          </InputOTP>
          <div className="text-base leading-[18px]">
            Didn't get a code? Resend.
          </div>
        </div>

        {/* Footer */}
        <div className="mt-auto flex flex-col gap-3 pt-10">
          <Button
            className="w-full h-12 bg-[#6552FE] hover:bg-slate-500 text-white font-semibold rounded-[16px]"
            onClick={() => navigate("/login-register")}
          >
            Register
          </Button>
        </div>
      </div>
    </div>
  );
};

export default RegistrationTwo;
