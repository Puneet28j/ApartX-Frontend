import { ArrowLeft, CircleCheck } from "lucide-react";
import ReceiptBg from "../assets/ReceiptBg.tsx.svg";
import TransferCard from "../assets/Subtract.svg";
import { useNavigate } from "react-router-dom";
import Line from "../assets/Line 3 (1).svg";
import { Button } from "@/components/ui/button";

const TransferReceipt = () => {
  const navigate = useNavigate();
  return (
    <div
      className="min-h-screen flex flex-col px-4 py-6 w-full bg-cover bg-no-repeat items-center"
      style={{ backgroundImage: `url(${ReceiptBg})` }}
    >
      {/* Back button */}
      <button
        onClick={() => navigate(-1)}
        className="flex items-center gap-2 text-white self-start mb-4"
      >
        <ArrowLeft size={24} />
      </button>

      {/* Title */}
      <div className="text-white text-2xl font-semibold text-center mb-4">
        Transfer Receipt
      </div>

      {/* Receipt Card Wrapper */}
      <div className="relative w-full max-w-md">
        {/* Background Card Image */}
        <img src={TransferCard} alt="Transfer Card" className="w-full" />

        {/* Overlay content */}
        <div className="absolute  inset-0 px-6 py-6 flex flex-col items-center">
          {/* Check icon */}
          <div className=" flex items-center justify-center mb-8">
            <CircleCheck className="w-24 h-24 rounded-full fill-green-500 text-black" />
          </div>

          {/* Title */}
          <div className="text-black text-xl font-bold mb-1 whitespace-nowrap">
            Transfer Successful
          </div>

          {/* Subtext */}
          <div className="text-black text-sm mb-8 text-center">
            Your transfer has been successfully done.
          </div>

          {/* Total Transfer */}
          <div className="text-black text-sm">Total Transfer</div>
          <div className="text-green-600 text-4xl font-bold mb-6">4000</div>

          {/* Dashed Divider - Now Centered */}
          <img
            src={Line}
            className="w-full absolute top-[53%] mb-6"
            alt="Divider"
          />

          {/* Done Button */}
          <div className="mt-auto w-full flex flex-col gap-3 mb-20">
            {/* Transfer Destination */}
            <div className="w-full text-left text-black font-medium text-sm mb-2">
              Transfer Destination
            </div>
            <input
              type="text"
              value="Eaz5487568cvguytoxxxj"
              readOnly
              className="w-full bg-red-200 text-black px-4 py-2 rounded-md mb-6"
            />
            <Button
              className="w-full h-12 bg-[#38AD46] text-white font-semibold rounded-[16px]"
              onClick={() => navigate("/main-screen")}
            >
              Done
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TransferReceipt;
