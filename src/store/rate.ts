import { create } from "zustand";
import { combine } from "zustand/middleware";

export type RateType = { NGN: number; USD: number; EUR: number };
export type CurrencyType = "NGN" | "USD" | "EUR";

const useRateStore = create(
  combine(
    {
      rateSelected: "NGN" as CurrencyType,
      ratesCache: null as null | RateType,
    },

    (set) => ({
      setRateSelected: (value: CurrencyType) =>
        set(() => ({ rateSelected: value })),
      updateRatesCache: (value: RateType) => set(() => ({ ratesCache: value })),
    })
  )
);

export default useRateStore;
