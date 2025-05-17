import React from "react";

interface MobileLayoutProps {
  children: React.ReactNode;
}

// MobileLayout.tsx
const MobileLayout = ({ children }: MobileLayoutProps) => {
  return (
    <div className="max-h-screen w-full fixed inset-0 bg-[#070707] font-display flex justify-center overflow-y-auto overflow-x-hidden">
      <div className="w-full max-w-lg bg-[#070707] shadow-lg flex flex-col max-h-screen overflow-x-hidden relative">
        {children}
      </div>
    </div>
  );
};

export default MobileLayout;
