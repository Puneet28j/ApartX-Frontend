import { ArrowLeft, CircleCheck } from "lucide-react";
import ReceiptBg from "../assets/ReceiptBg.tsx.svg";
import TransferCard from "../assets/Subtract.svg";
import { useNavigate } from "react-router-dom";
import Line from "../assets/Line 3 (1).svg";
import foxImage from "../assets/fox.svg";
import { Button } from "@/components/ui/button";

const RequestSubmitted = () => {
  const navigate = useNavigate();

  return (
    <div
      className="min-h-screen flex flex-col items-center justify-start px-4 py-6 bg-cover bg-no-repeat"
      style={{ backgroundImage: `url(${ReceiptBg})` }}
    >
      {/* Back button */}
      <button
        onClick={() => navigate(-1)}
        className="flex items-center gap-2 text-white self-start mb-4"
      >
        <ArrowLeft size={24} />
      </button>

      {/* Page Title */}
      <div className="text-white text-2xl font-semibold text-center mb-4">
        Request Submitted
      </div>

      {/* Card Wrapper */}
      <div className="relative w-full max-w-md">
        {/* Card Image */}
        <img src={TransferCard} alt="Transfer Card" className="w-full" />

        {/* Divider Line - positioned using % of card height */}
        <img
          src={Line}
          alt="Divider"
          className="absolute top-[53%] left-1/2 transform -translate-x-1/2 w-[90%] pointer-events-none"
        />

        {/* Overlay Content */}
        <div className="absolute inset-0 px-6 py-6 flex flex-col">
          {/* Top Section */}
          <div className="flex flex-col items-center">
            <CircleCheck className="w-20 h-20 fill-green-500 text-black mb-4" />
            <div className="text-black text-xl font-bold mb-1 text-center">
              Request Submitted
            </div>
            <div className="text-black text-sm mb-6 text-center">
              Your request for receiving crypto currency has been successfully
              submitted.
            </div>
            <div className="text-black text-sm">Total Amount</div>
            <div className="text-[#FF0000] text-4xl font-bold mb-6">4000</div>
          </div>

          {/* Bottom Section */}
          <div className="flex flex-col justify-center items-center gap-3 mt-auto pb-6">
            <div className="text-black text-center text-[14px] font-medium">
              In wallet
            </div>
            <div className="bg-black rounded-md flex items-center justify-center gap-3 w-[160px] h-[50px]">
              <img className="h-[55px] w-[55px]" src={foxImage} alt="" />
              <div className="text-white">Metamask</div>
            </div>
            <div className="text-black font-medium text-sm">
              Transfer Destination
            </div>
            <input
              type="text"
              value="Eaz5487568cvguytoxxxj"
              readOnly
              className="w-full bg-red-200 text-black px-4 py-2 rounded-md"
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

export default RequestSubmitted;
