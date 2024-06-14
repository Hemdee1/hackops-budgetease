import { create } from "zustand";
import { combine } from "zustand/middleware";

export type ExpenseType = {
  id: string;
  amount: number;
  balance: number;
  categoryId: string;
  createdAt: string;
};

export type IncomeType = {
  id: string;
  title: string;
  amount: number;
  balance: number;
  createdAt: string;
};

export type HistoryType = {
  id: string;
  amount: number;
  categoryId: string;
  title: string;
  createdAt: string;
  balance: number;
};

export type CategoryType = {
  id: string;
  icon: string;
  title: string;
  desc: string;
  price: number;
  percent: number;

  expense: ExpenseType[];
};

export type UserType = {
  id: string;
  firstName: string;
  lastName: string;
  email: string;
  avatar: string;

  budget?: {
    id: string;
    monthlyIncome: number;
    annualRent: number;
    gender: string;
    maritalStatus: string;
    modeOfTransport: string;
    defaultCurrency: string;
    createdAt: string;

    category: CategoryType[];
    expense: ExpenseType[];
    income: IncomeType[];
  };
};

const useUserStore = create(
  combine(
    {
      user: null as null | undefined | UserType,
    },

    (set) => ({
      setUser: (value: UserType | null | undefined) =>
        set(() => ({ user: value })),
    })
  )
);

export default useUserStore;
