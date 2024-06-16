import useOutsideClick from "@/hooks/useOutsideClick";
import ArrowDownIcon from "@/icons/arrowDown";
import { NigeriaIcon, UKIcon, USIcon } from "@/icons/countryIcons";
import useRateStore from "@/store/rate";
import { useEffect, useState } from "react";

const ChangeCurrencyDropdown = ({ input }: { input?: boolean }) => {
  const { rateSelected, setRateSelected } = useRateStore();
  const rateRef = useOutsideClick(() => setOpenRate(false));
  const [openRate, setOpenRate] = useState(false);

  useEffect(() => {
    setOpenRate(false);
  }, [rateSelected]);

  return (
    <div className="relative" ref={rateRef}>
      <button
        onClick={() => setOpenRate((prev) => !prev)}
        className={`rounded-full border-gray4 bg-white flex items-center gap-2.5 font-medium text-sm ${
          input ? "border-none p-1.5" : "border p-3"
        }`}
      >
        {rateSelected === "NGN" ? (
          <>
            <NigeriaIcon />
            NGN
          </>
        ) : rateSelected === "USD" ? (
          <>
            <UKIcon />
            USD
          </>
        ) : (
          <>
            <USIcon />
            EUR
          </>
        )}
        <ArrowDownIcon />
      </button>

      <div
        className={`absolute left-0 border z-[2] border-gray4-lg w-[110px] p-4 space-y-4 bg-white rounded-lg transition-all duration-300 ${
          openRate && input
            ? "top-8 opacity-100 visible"
            : openRate
            ? "top-14 opacity-100 visible"
            : "top-6 opacity-0 invisible"
        }`}
      >
        {rateSelected !== "NGN" && (
          <button
            onClick={() => setRateSelected("NGN")}
            className="flex gap-2 w-full items-center font-medium text-xs"
          >
            <NigeriaIcon />
            NGN
          </button>
        )}
        {rateSelected !== "USD" && (
          <button
            onClick={() => setRateSelected("USD")}
            className="flex gap-2 w-full items-center font-medium text-xs"
          >
            <UKIcon />
            USD
          </button>
        )}
        {rateSelected !== "EUR" && (
          <button
            onClick={() => setRateSelected("EUR")}
            className="flex gap-2 w-full items-center font-medium text-xs"
          >
            <USIcon />
            EUR
          </button>
        )}
      </div>
    </div>
  );
};

export default ChangeCurrencyDropdown;
