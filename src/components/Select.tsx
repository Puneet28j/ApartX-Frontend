type Tariff = {
  duration: string;
  label: string;
  value: string;
  rate: string;
  minAmount: number;
  maxAmount: number;
};

import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
} from "@/components/ui/select";

const SelectComponent = ({
  TariffList,
  selectedTariff,
  setSelectedTariff,
}: {
  TariffList: Tariff[];
  selectedTariff: Tariff;
  setSelectedTariff: (tariff: Tariff) => void;
}) => {
  return (
    <Select
      value={selectedTariff.value}
      onValueChange={(val) => {
        const selected = TariffList.find((t) => t.value === val);
        if (selected) setSelectedTariff(selected);
      }}
    >
      <SelectTrigger className="w-full px-4 py-6 border border-white rounded-xl bg-transparent text-white">
        <div className="flex justify-between items-center w-full">
          <span className="font-semibold">{selectedTariff.label}</span>
          <span className="text-sm text-gray-300">
            {selectedTariff.rate} / {selectedTariff.duration}
          </span>
        </div>
      </SelectTrigger>

      <SelectContent className="bg-[#1F1F1F] text-white border w-full ">
        <SelectGroup>
          {TariffList.map((tariff) => (
            <SelectItem key={tariff.value} value={tariff.value} className="p-2">
              {[tariff.label, `${tariff.rate} / ${tariff.duration}`]}
            </SelectItem>
          ))}
        </SelectGroup>
      </SelectContent>
    </Select>
  );
};

export default SelectComponent;
