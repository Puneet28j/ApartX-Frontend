import { Button } from "@/components/ui/button";
import { ArrowLeft } from "lucide-react";
import { useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "sonner";

const Setmpin = () => {
  const navigate = useNavigate();
  const [mpin, setMpin] = useState(["", "", "", ""]);
  const inputRefs = [useRef(null), useRef(null), useRef(null), useRef(null)];

  const handlePinChange = (value: string, index: number) => {
    if (value.length <= 1 && /^[0-9]*$/.test(value)) {
      const newMpin = [...mpin];
      newMpin[index] = value;
      setMpin(newMpin);

      // Move to next input if value is entered
      if (value !== "" && index < 3) {
        (inputRefs[index + 1].current as unknown as HTMLInputElement)?.focus();
      }
    }
  };

  const handleKeyDown = (
    e: React.KeyboardEvent<HTMLInputElement>,
    index: number
  ) => {
    // Move to previous input on backspace if current input is empty
    if (e.key === "Backspace" && index > 0 && mpin[index] === "") {
      (inputRefs[index - 1].current as unknown as HTMLInputElement)?.focus();
    }
  };

  const handleSubmit = () => {
    const pin = mpin.join("");
    if (pin.length === 4) {
      // Handle PIN submission
      toast.success("MPIN set successfully!");
    } else {
      toast.error("Please enter a complete 4-digit MPIN");
    }
  };

  return (
    <div className="flex flex-col h-full w-full bg-[#070707] py-6">
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

      <div className="flex flex-col gap-6 w-full px-3 h-full">
        {/* Header */}
        <div className="flex-none text-start">
          <h2 className="mt-3 font-medium text-[#F7F7F7] text-[28px] leading-tight">
            Set MPIN
          </h2>
          <p className="text-[#F7F7F7] text-sm mt-1">
            Create a 4-digit MPIN to secure your account
          </p>
        </div>

        {/* MPIN Input Section */}
        <div className="flex flex-col items-center gap-8 mt-8">
          <div className="flex justify-center gap-4">
            {[0, 1, 2, 3].map((index) => (
              <input
                key={index}
                type="password"
                maxLength={1}
                ref={inputRefs[index]}
                value={mpin[index]}
                onChange={(e) => handlePinChange(e.target.value, index)}
                onKeyDown={(e) => handleKeyDown(e, index)}
                className="w-14 h-14 text-center text-2xl font-bold bg-transparent 
                          border-2 border-white/20 rounded-xl text-white
                          focus:border-white focus:outline-none"
              />
            ))}
          </div>

          {/* Submit Button */}
          <Button
            className="w-full h-12 bg-[#6552FE] text-white font-semibold hover:bg-slate-500 rounded-[16px]"
            onClick={handleSubmit}
          >
            Continue
          </Button>
        </div>
      </div>
    </div>
  );
};

export default Setmpin;
