import { ArrowLeft } from "lucide-react";
import { useNavigate } from "react-router-dom";
import inviteearn from "../assets/InviteEarn.svg";
import CopyButton from "../components/CopyButton";

const referredFriends = Array(5).fill({
  mobile: "9456789658",
  name: "Demo name",
  date: "05-May-2025",
});

const InviteAndEarn = () => {
  const navigate = useNavigate();
  const referralCode = "VU5AXIJT";

  // Method 1: Get current domain dynamically
  const getCurrentDomain = () => {
    const protocol = window.location.protocol; // http: or https:
    const hostname = window.location.hostname; // domain name
    const port = window.location.port ? `:${window.location.port}` : "";
    return `${protocol}//${hostname}${port}`;
  };

  const referralLink = `${getCurrentDomain()}/register?ref=${referralCode}`;

  return (
    <div className="relative flex flex-col h-screen max-h-screen bg-black text-white overflow-hidden">
      {/* Top Section (Fixed Height) */}
      <div className="shrink-0">
        {/* Gradient Overlay */}
        <div className="absolute h-[180px] inset-x-0 top-0 bg-gradient-to-b from-[#6552FE] via-[#683594] to-[#6B1111] opacity-90 z-10" />

        {/* Top Bar */}
        <div className="relative z-20 pt-6 pl-4">
          <button
            onClick={() => navigate(-1)}
            className="flex items-center gap-2 text-white text-sm"
          >
            <ArrowLeft size={20} className="h-8 w-8 text-white" />
          </button>
        </div>

        {/* Title Row */}
        <div className="flex justify-around items-center mt-[40px] relative z-10">
          <div className="text-[26px] font-racing leading-[100%]">
            Invite & Earn
          </div>
          <img
            src={inviteearn}
            className="h-[100px] sm:h-[146px] w-auto"
            alt=""
          />
        </div>

        {/* Subtitle */}
        <div className="text-center my-3 text-xl font-bold z-10">
          <span className="text-white">Apart-</span>
          <span className="text-[#6552FE] font-bold">X</span>
          <span className="text-white"> Referral Program</span>
        </div>

        <div className="text-[14px] mx-auto max-w-[380px] p-3 text-center">
          Invite & Earn upto 6% extra income bonus on deposit by your friend as
          a reward. Be your own boss!
        </div>

        {/* Code Section */}
        <div className="mx-auto py-2 mt-2 w-[200px] h-[40px] text-center bg-[#4C4343] rounded-md flex items-center justify-center px-4">
          <div className="text-white leading-[32px] text-[28px] font-medium">
            {referralCode}
          </div>
          <CopyButton textToCopy={referralCode} />
        </div>

        {/* Share Link */}
        <div className="ml-1 mt-2 flex items-center space-x-2 px-3">
          <div className="w-[90%] h-10 px-1 flex items-center text-[14px] text-black bg-white rounded-md">
            {referralLink}
          </div>
          <CopyButton textToCopy={referralLink} />
        </div>
      </div>

      {/* Scrollable Table Section */}
      <div className="flex-1 overflow-y-auto mt-4 mb-4 px-4">
        <div className="text-sm mb-2">Referred Friends</div>
        <div className="rounded-md overflow-hidden">
          <div className="grid grid-cols-3 text-center bg-[#3d3b3b] py-2 text-xs font-bold">
            <div>Mobile Number</div>
            <div>Profile Name</div>
            <div>Date to Join</div>
          </div>
          {referredFriends.map((friend, idx) => (
            <div
              key={idx}
              className={`grid grid-cols-3 text-center py-2 text-sm border-t border-gray-700 ${
                idx % 2 === 0 ? "bg-[#4c4343]" : "bg-[#716666]"
              }`}
            >
              <div>{friend.mobile}</div>
              <div>{friend.name}</div>
              <div>{friend.date}</div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default InviteAndEarn;
