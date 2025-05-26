import * as React from "react";
import { Check } from "lucide-react";

import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "@/components/ui/command";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";

const Combobox = ({
  placeholder,
  wallets,
  onChange, // ✅ Accept onChange from parent
}: {
  placeholder: string;
  wallets: {
    value: string;
    label: string;
    icon: string;
  }[];
  onChange?: (value: string) => void; // ✅ Optional function prop
}) => {
  const [open, setOpen] = React.useState(false);
  const [value, setValue] = React.useState("");

  const selectedWallet = wallets.find((wallet) => wallet.value === value);

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger
        className="bg-[#171717] hover:text-black text-white border-none max-w-[250px] mx-auto"
        asChild
      >
        <Button
          variant="outline"
          role="combobox"
          aria-expanded={open}
          className="group min-w-[230px] h-16 justify-center text-md bg-[#171717] border-none mx-auto"
        >
          {selectedWallet ? (
            <div className="flex items-center gap-2">
              <img
                src={selectedWallet.icon}
                alt=""
                className="h-[55px] w-[55px]"
              />
              <span className="text-white group-hover:text-black">
                {selectedWallet.label}
              </span>
            </div>
          ) : (
            <span className="group-hover:text-black">{placeholder}</span>
          )}
        </Button>
      </PopoverTrigger>
      <PopoverContent className="max-w-[250px] bg-[#171717] text-white p-0">
        <Command className="bg-[#171717] text-white">
          <CommandInput placeholder="Search crypto currency..." />
          <CommandList>
            <CommandEmpty>No crypto found.</CommandEmpty>
            <CommandGroup>
              {wallets.map((wallet) => (
                <CommandItem
                  key={wallet.value}
                  value={wallet.value}
                  onSelect={(currentValue) => {
                    const newValue = currentValue === value ? "" : currentValue;
                    setValue(newValue);
                    onChange?.(newValue); // ✅ Inform parent
                    setOpen(false);
                  }}
                  className="text-white hover:text-black hover:bg-[#2a2a2a] cursor-pointer"
                >
                  <div className="flex items-center gap-3 w-full">
                    <img
                      src={wallet.icon}
                      alt={wallet.label}
                      className="h-8 w-8"
                    />
                    <span className="text-md font-medium">{wallet.label}</span>
                    <Check
                      className={cn(
                        "ml-auto h-5 w-5 text-green-500",
                        value === wallet.value ? "opacity-100" : "opacity-0"
                      )}
                    />
                  </div>
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
