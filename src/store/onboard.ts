import { option1 } from "@/utils/data";
import { create } from "zustand";
import { combine } from "zustand/middleware";

type GenderType = "male" | "female";
type TransportType = "private car" | "public transport";
type MaritalStatusType = "single" | "married";
export type BudgetType = (typeof option1)[0];

const useOnboardStore = create(
  combine(
    {
      firstName: "",
      lastName: "",
      email: "",
      password: "",
      gender: "" as GenderType,
      status: "" as MaritalStatusType,
      transport: "" as TransportType,
      income: "",
      rent: "",
      selectedBudget: [] as [] | BudgetType[],
      selectedOption: [] as [] | BudgetType[],
    },

    (set) => ({
      setFirstName: (value: string) => set(() => ({ firstName: value })),
      setLastName: (value: string) => set(() => ({ lastName: value })),
      setEmail: (value: string) => set(() => ({ email: value })),
      setPassword: (value: string) => set(() => ({ password: value })),
      setGender: (value: GenderType) => set(() => ({ gender: value })),
      setStatus: (value: MaritalStatusType) => set(() => ({ status: value })),
      setTransport: (value: TransportType) => set(() => ({ transport: value })),
      setIncome: (value: string) => set(() => ({ income: value })),
      setRent: (value: string) => set(() => ({ rent: value })),

      setSelectedOption: (value: BudgetType[]) =>
        set(() => ({ selectedOption: value })),

      emptyBudget: () => set(() => ({ selectedBudget: [] })),

      setSelectedBudget: (budget: BudgetType) =>
        set((state) => {
          if (state.selectedBudget.find((b) => b.title === budget.title)) {
            const newBudget = state.selectedBudget.filter(
              (b) => b.title !== budget.title
            );

            return { selectedBudget: newBudget };
          } else {
            return { selectedBudget: [...state.selectedBudget, budget] };
          }
        }),
    })
  )
);

export default useOnboardStore;
