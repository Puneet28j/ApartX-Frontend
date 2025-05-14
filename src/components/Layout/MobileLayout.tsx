import React from "react";

interface MobileLayoutProps {
  children: React.ReactNode;
}

const MobileLayout = ({ children }: MobileLayoutProps) => {
  return (
    <div className="fixed inset-0 flex justify-center font-display bg-[#070707]">
      <div className="w-full max-w-lg h-full  bg-[#070707] shadow-lg overflow-hidden">
        {children}
      </div>
    </div>
  );
};

export default MobileLayout;
