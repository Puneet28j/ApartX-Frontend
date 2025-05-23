"use client";

import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import {
  Drawer,
  DrawerContent,
  DrawerDescription,
  DrawerFooter,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from "@/components/ui/drawer";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import FoxImage from "../assets/fox.svg";
import Binance from "../assets/binance.svg";
import MetaMask from "../assets/fox.svg";
import CoinBase from "../assets/Coinbase.svg";
import TrustWallet from "../assets/TrustWallet.svg";
import Combobox from "./ComboBox";
import { Separator } from "./ui/separator";

const wallets = [
  { value: "binance", label: "Binance", icon: Binance },
  { value: "metamask", label: "MetaMask", icon: MetaMask },
  { value: "coinbase", label: "CoinBase", icon: CoinBase },
  { value: "trustWallet", label: "Trust Wallet", icon: TrustWallet },
];

export function DrawerDemo() {
  const navigate = useNavigate();
  const [openDialog, setOpenDialog] = useState(false);
  const [openDrawer, setOpenDrawer] = useState(false);

  const handleOpenDialog = () => {
    setOpenDrawer(false); // close drawer
    setTimeout(() => setOpenDialog(true), 200); // small delay to avoid overlap
  };

  return (
    <>
      {/* Dialog outside Drawer */}
      <Dialog open={openDialog} onOpenChange={setOpenDialog}>
        <DialogContent className="sm:max-w-[425px] bg-[#4C4343] rounded-[30px] text-white border-none outline-none ">
          <DialogHeader>
            <DialogTitle className="text-center">
              Wallet Status Updated.
            </DialogTitle>
            <DialogDescription className="text-center text-[12px] text-white font-medium">
              Your Wallet account for crypto transaction has been successfully
              added.
            </DialogDescription>
          </DialogHeader>

          <DialogFooter>
            <div className="flex justify-around w-full">
              <Button
                className="rounded-[50px] px-6 min-w-[100px] border-white border-1 bg-[linear-gradient(90deg,rgba(11,4,210,0.43)_0%,rgba(34,66,127,0)_50%)]"
                type="submit"
                onClick={() => setOpenDialog(false)}
              >
                Cancel
              </Button>
              <Button
                className="rounded-[50px] px-6 min-w-[100px] border-white border-1 bg-[linear-gradient(90deg,rgba(11,4,210,0.43)_0%,rgba(34,66,127,0)_50%)]"
                type="submit"
                onClick={() => setOpenDialog(false)}
              >
                Ok
              </Button>
            </div>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Drawer */}
      <Drawer open={openDrawer} onOpenChange={setOpenDrawer}>
        <DrawerTrigger asChild>
          <img src={FoxImage} alt="Fox" className="w-[50px] h-[50px]" />
        </DrawerTrigger>
        <DrawerContent className="bg-[#4C4343] border-none font-display max-w-lg w-full mx-auto">
          <div className="mx-auto w-full p-4">
            <DrawerHeader>
              <DrawerTitle></DrawerTitle>
              <DrawerDescription></DrawerDescription>
            </DrawerHeader>

            <div className="flex flex-col space-y-2">
              <label className="text-white font-medium text-sm">
                Enter Wallet ID
              </label>
              <input
                type="text"
                placeholder="Wallet ID"
                className="h-12 px-4 border border-white rounded-xl bg-transparent text-white outline-none"
              />
            </div>

            <div className="flex items-center justify-center gap-0.5 mt-4">
              <Separator className="max-w-[150px]" />
              <span className="text-white">And</span>
              <Separator className="max-w-[150px]" />
            </div>

            <Button
              className="w-full h-12 mt-4 bg-[#38AD46] text-white font-semibold rounded-[16px]"
              // onClick={() => navigate("/verify-otp")}
            >
              Upload Wallet QR Code
            </Button>

            <div className="flex flex-col space-y-4 mt-4">
              <label className="text-white font-medium text-sm">
                Select a supported wallet type.
              </label>
              <Combobox placeholder="Enter Wallet" wallets={wallets} />
            </div>

            <DrawerFooter className=" p-0">
              <div className="mt-auto flex flex-col w-full gap-3 pt-10">
                <Button
                  className="w-full h-12 bg-[#6552FE] text-white font-semibold rounded-[16px]"
                  onClick={handleOpenDialog}
                >
                  Submit
                </Button>
              </div>
            </DrawerFooter>
          </div>
        </DrawerContent>
      </Drawer>
    </>
  );
}
