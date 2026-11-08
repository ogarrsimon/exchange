
import { useState } from "react";
import {
  US, NG, GB, EU, JP, CA, CH, AU
} from "country-flag-icons/react/3x2";
import { ChevronDown, Check } from "lucide-react";

const currencies = [
  { code: "USD", name: "US Dollar", Flag: US },
  { code: "NGN", name: "Nigerian Naira", Flag: NG },
  { code: "GBP", name: "British Pound", Flag: GB },
  { code: "EUR", name: "Euro", Flag: EU },
  { code: "JPY", name: "Japanese Yen", Flag: JP },
  { code: "CAD", name: "Canadian Dollar", Flag: CA },
  { code: "CHF", name: "Swiss Franc", Flag: CH },
  { code: "AUD", name: "Australian Dollar", Flag: AU },
];

export default function CurrencySelect({
  value = "USD",
  onChange
}) {
  const [isOpen, setIsOpen] = useState(false);

  const selected = currencies.find(
    (currency) => currency.code === value
  );

  const SelectedFlag = selected?.Flag;

  return (
    <div className="relative w-64">
      {/* Selected currency */}
      <button
        type="button"
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center justify-between
        bg-[#202022] border border-[#353535]
        rounded-md p-3 text-white"
      >
        <div className="flex items-center gap-3">
          {SelectedFlag && (
            <SelectedFlag className="w-7 h-5 rounded-sm" />
          )}

          <div className="text-left">
            <p className="font-semibold">
              {selected?.code}
            </p>
            <p className="text-xs text-gray-400">
              {selected?.name}
            </p>
          </div>
        </div>

        <ChevronDown
          size={18}
          className={`transition-transform ${
            isOpen ? "rotate-180" : ""
          }`}
        />
      </button>

      {/* Dropdown options */}
      {isOpen && (
        <div className="absolute z-50 top-full mt-2 w-full
          bg-[#171719] border border-[#353535]
          rounded-xl shadow-xl overflow-hidden">

          {currencies.map((currency) => {
            const Flag = currency.Flag;

            return (
              <button
                key={currency.code}
                type="button"
                onClick={() => {
                  onChange?.(currency.code);
                  setIsOpen(false);
                }}
                className="w-full flex items-center
                  justify-between p-3 text-white
                  hover:bg-[#292929] transition"
              >
                <div className="flex items-center gap-3">
                  <Flag className="w-7 h-5 rounded-sm" />

                  <div className="text-left">
                    <p className="text-sm font-semibold">
                      {currency.code}
                    </p>
                    <p className="text-xs text-gray-400">
                      {currency.name}
                    </p>
                  </div>
                </div>

                {value === currency.code && (
                  <Check size={16} className="text-[#CEF739]" />
                )}
              </button>
            );
          })}
        </div>
      )}
    </div>
  );
}
