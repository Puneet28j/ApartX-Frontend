"use client";

import * as React from "react";
import { Check, ChevronsUpDown } from "lucide-react";

import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
  CommandShortcut,
} from "@/components/ui/command";
import USDTLogo from "../assets/usdt logo.svg";
import BNBLogo from "../assets/bnb logo.svg";
import Etherium from "../assets/etherium logo.svg";
import Bitcoin from "../assets/Bitcoin Logo.svg";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { TbCoinBitcoinFilled, TbCurrencyEthereum } from "react-icons/tb";
import { RiBnbFill } from "react-icons/ri";

const CryptoCurrencyWallets = [
  {
    value: "usdt",
    label: "USDT",
    icon: USDTLogo,
  },
  {
    value: "etherium",
    label: "Etherium",
    icon: Etherium,
  },
  {
    value: "bitcoin",
    label: "Bitcoin",
    icon: Bitcoin,
  },
  {
    value: "bnb",
    label: "BNB",
    icon: BNBLogo,
  },
];

const Combobox = () => {
  const [open, setOpen] = React.useState(false);
  const [value, setValue] = React.useState("");

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger className="bg-[#171717] text-white border-none" asChild>
        <Button
          variant="outline"
          role="combobox"
          aria-expanded={open}
          className="min-w-[230px] h-16 justify-center text-md"
        >
          {value ? (
            <div className="flex items-center gap-2">
              {
                <img
                  src={
                    CryptoCurrencyWallets.find(
                      (wallet) => wallet.value === value
                    )?.icon
                  }
                  alt=""
                />
              }
              <span>
                {
                  CryptoCurrencyWallets.find((wallet) => wallet.value === value)
                    ?.label
                }
              </span>
            </div>
          ) : (
            "Select crypto currency..."
          )}
          {/* <ChevronsUpDown className="opacity-50 ml-2" /> */}
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-[250px]  p-0">
        <Command className="bg-[#171717] text-white">
          <CommandInput placeholder="Search crypto currency..." />
          <CommandList>
            <CommandEmpty>No crypto found.</CommandEmpty>
            <CommandGroup>
              {CryptoCurrencyWallets.map((wallet) => (
                <CommandItem
                  key={wallet.value}
                  value={wallet.value}
                  onSelect={(currentValue) => {
                    setValue(currentValue === value ? "" : currentValue);
                    setOpen(false);
                  }}
                  className="bg-[#171717] text-white"
                >
                  <div>
                    <img src={wallet.icon} alt="icons" className="h-10 w-10" />
                  </div>
                  <div className="text-lg">{wallet.label.toUpperCase()}</div>
                  <Check
                    className={cn(
                      "ml-auto",
                      value === wallet.value ? "opacity-100" : "opacity-0"
                    )}
                  />
                </CommandItem>
              ))}
            </CommandGroup>
          </CommandList>
        </Command>
      </PopoverContent>
    </Popover>
  );
};

export default Combobox;
