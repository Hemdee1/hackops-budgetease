import { HistoryType, UserType } from "@/store/user";

export function getDateInfo(createdAt: string) {
  const date = new Date(createdAt);

  // Get the current date
  const currentDate = date.getDate();

  // Get the current month in long format
  const month = date.toLocaleString("default", {
    month: "long",
  });

  // Create a new Date object for the next month
  const nextMonthDate = new Date(date);
  nextMonthDate.setMonth(date.getMonth() + 1);

  // Get the next month in long format
  const nextMonth = nextMonthDate.toLocaleString("default", {
    month: "long",
  });

  // Get the date exactly one month later
  const nextMonthExactDate = nextMonthDate.getDate();

  const year = date.getFullYear();

  return {
    currentDate,
    month,
    nextMonth,
    nextMonthExactDate,
    year,
  };
}
export function getTotal(user: UserType) {
  const expensesTotal = user?.budget?.expense.reduce(
    (total, expense) => total + expense.amount,
    0
  )!;

  const incomeTotal =
    user?.budget?.income
      .slice(1, user.budget.income.length)
      // .filter((b) => b.title !== "Monthly Income")
      .reduce((total, income) => total + income.amount, 0)! +
    user?.budget?.monthlyIncome!;

  const totalBalance = incomeTotal - expensesTotal;

  return { expensesTotal, incomeTotal, totalBalance };
}

export function getHistory(user: UserType) {
  const history = user?.budget?.income
    .concat(user.budget.expense as any)
    .sort((a, b) => {
      return new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime();
    }) as HistoryType[];

  return history;
}

export const getPoints = (user: UserType) => {
  const history = user?.budget?.income
    .concat(user.budget.expense as any)
    .sort((a, b) => {
      return new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime();
    }) as HistoryType[];

  const uniqueDays = new Set(
    history?.map((item) => new Date(item.createdAt).toDateString())
  ).size;

  const XPPoints =
    history?.reduce((totalPoints, item) => {
      if (item.categoryId) {
        // It's an expense
        return totalPoints + 7;
      } else {
        // It's an income
        return totalPoints + 5;
      }
    }, 0) ?? 0;

  return { flamePoints: uniqueDays, XPPoints };
};

export const converImageToBlob = (
  e: React.ChangeEvent<HTMLInputElement>,
  setImage: (value: string | undefined) => void
) => {
  const userFile = e.target.files;

  if (!userFile) return "";

  const file = userFile[0];

  if (!file || !file.type.includes("image")) return "";

  const reader = new FileReader();
  reader.readAsDataURL(file);

  reader.onloadend = () => {
    setImage(reader.result as string);
  };
};
