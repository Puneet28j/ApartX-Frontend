"use client";

import * as React from "react";
import { Minus, Plus } from "lucide-react";
// import { Bar, BarChart, ResponsiveContainer } from "recharts"

import { Button } from "@/components/ui/button";
import {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerDescription,
  DrawerFooter,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from "@/components/ui/drawer";
import FoxImage from "../assets/fox.svg";
import { useNavigate } from "react-router-dom";
import { Separator } from "./ui/separator";

export function DrawerDemo() {
  const navigate = useNavigate();

  return (
    <Drawer>
      <DrawerTrigger asChild>
        <img src={FoxImage} alt="Fox" className="w-[50px] h-[50px]" />
      </DrawerTrigger>
      <DrawerContent className="bg-gray-600 border-none font-display ">
        <div className="mx-auto w-full ">
          <DrawerHeader>
            <DrawerTitle>Add Wallet</DrawerTitle>
            <DrawerDescription>Set your daily activity goal.</DrawerDescription>
          </DrawerHeader>
          <div className="p-4 pb-0">
            <div className="flex flex-col space-y-2">
              <label className="text-white font-medium text-sm">
                Enter Wallet ID
              </label>
              <input
                type="text"
                placeholder="Wallet ID"
                //   value={password}
                //   onChange={(e) => setPassword(e.target.value)}
                className="h-12  px-4 border border-white rounded-xl bg-transparent text-white  outline-none"
              />
            </div>
            <div className="flex items-center justify-center gap-0.5">
              <Separator /> <span className="text-white">And </span>
              <Separator />
            </div>
            <div className="min-h-32"></div>
          </div>
          <DrawerFooter>
            <DrawerClose asChild>
              <div className="mt-auto flex flex-col gap-3 pt-10">
                <Button
                  className="w-full h-12 bg-[#6552FE] text-white font-semibold rounded-[16px]"
                  onClick={() => navigate("/login-register")}
                >
                  Submit
                </Button>
              </div>
            </DrawerClose>
          </DrawerFooter>
        </div>
      </DrawerContent>
    </Drawer>
  );
}
