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
    icon: <TbCoinBitcoinFilled size={24} />,
  },
  {
    value: "etherium",
    label: "Etherium",
    icon: <TbCurrencyEthereum className="h-10 w-10" />,
  },
  {
    value: "bitcoin",
    label: "Bitcoin",
    icon: <TbCoinBitcoinFilled className="h-10 w-10" />,
  },
  {
    value: "bnb",
    label: "BNB",
    icon: <RiBnbFill className="h-20 w-20" />,
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
          className="max-w-[300px] h-16 justify-between text-md"
        >
          {value ? (
            <div className="flex items-center gap-2">
              {
                CryptoCurrencyWallets.find((wallet) => wallet.value === value)
                  ?.icon
              }
              <span>
                {
                  CryptoCurrencyWallets.find((wallet) => wallet.value === value)
                    ?.label
                }
              </span>
            </div>
          ) : (
            "Select crypto currency wallet..."
          )}
          <ChevronsUpDown className="opacity-50 ml-2" />
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-[250px]  p-0">
        <Command className="bg-[#171717] text-white">
          <CommandInput placeholder="Search framework..." />
          <CommandList>
            <CommandEmpty>No framework found.</CommandEmpty>
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
                  <div>{wallet.icon}</div>
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
