import AnalyticsBar from "@/components/analytics";
import AuthHeader from "@/components/authHeader";
import CategoryBox from "@/components/categoryBox";
import Header from "@/components/header";
import HistoryBox from "@/components/historyBox";
import AddExpensesModal from "@/components/modals/addExpenses";
import AddIncomeModal from "@/components/modals/addIncome";
import CategoryModal from "@/components/modals/category";
import EditCategoryModal from "@/components/modals/editCategory";
import HistoryModal from "@/components/modals/history";
import NewBudgetModal from "@/components/modals/newBugdet";
import useFormatAmount from "@/hooks/useFormatAmount";
import DateIcon from "@/icons/dateIcon";
import EditIcon from "@/icons/editIcon";
import PlusIcon from "@/icons/plusIcon";
import useUserStore from "@/store/user";
import { getDateInfo, getHistory, getTotal } from "@/utils/helper";
import { useRouter } from "next/router";
import { useEffect, useLayoutEffect, useState } from "react";

const Page = () => {
  const router = useRouter();
  const { user } = useUserStore();
  const { formatAmount } = useFormatAmount();

  const [openAddIncomeModal, setOpenAddIncomeModal] = useState(false);
  const [openAddExpensesModal, setOpenAddExpensesModal] = useState(false);
  const [openCategoryModal, setOpenCategoryModal] = useState(false);
  const [openHistoryModal, setOpenHistoryModal] = useState(false);
  const [openNewBudgetModal, setOpenNewBudgetModal] = useState(false);
  const [openEditCategoryModal, setOpenEditCategoryModal] = useState(false);

  const { currentDate, month, nextMonth, nextMonthExactDate, year } =
    getDateInfo(user?.budget?.createdAt!);

  const { expensesTotal, incomeTotal, totalBalance } = getTotal(user!);

  const history = getHistory(user!);

  useLayoutEffect(() => {
    if (user === undefined) {
      router.push("/login");
    } else if (user && !user?.budget) {
      router.push("/generate");
    }
  }, [user, router]);

  if (user === null) {
    return (
      <>
        <AuthHeader />
        <main className="w-fullscreen h-[60vh] grid place-content-center max-w-full mx-auto px-20 my-32">
          <span className="loader"></span>
        </main>
      </>
    );
  }

  return (
    <main className="w-fullscreen max-w-full mx-auto px-20 my-32">
      <Header />
      <div>
        <h2 className="font-bold text-3xl text-[#092256]">
          Welcome back, {user?.firstName}
        </h2>
        <p className="text-gray2 mt-1">
          Seamless tracking and engaging reward all in one app.
        </p>
      </div>

      <div className="mt-10 flex gap-5">
        <div className="w-[700px] 2xl:w-[820px]">
          <section className="w-full h-[415px] py-5 px-6 border border-gray4 bg-white rounded-xl">
            <div className="flex justify-between items-center">
              <div>
                <h4 className="font-semibold text-xl text-gray1">
                  Net account Value
                </h4>
                <h5 className="font-semibold text-gray1 mt-1">
                  Monthly Income:{" "}
                  <span className="text-primary font-bold">
                    {formatAmount(user?.budget?.monthlyIncome!)}
                  </span>
                </h5>
              </div>
              <div className="flex gap-3 items-center">
                <div className="p-4 border border-gray4 rounded-lg flex items-center gap-2.5">
                  <DateIcon />
                  <span className="text-gray1 font-semibold text-sm">
                    {month} {currentDate} - {nextMonth} {nextMonthExactDate},{" "}
                    {year}
                  </span>
                </div>
                <button
                  className="w-12 h-12 rounded-full bg-primary grid place-content-center"
                  onClick={() => setOpenNewBudgetModal(true)}
                >
                  <PlusIcon />
                </button>
              </div>
            </div>

            <div className="mt-20 flex gap-6">
              <article className="w-full h-[200px] bg-[#F2FFF2] px-4 py-6 rounded-2xl">
                <h5 className="text-gray1 font-semibold text-sm">Balance</h5>
                <h3 className="mt-2 text-[25px] 2xl:text-[32px] font-bold text-green">
                  {formatAmount(totalBalance)}
                </h3>
              </article>
              <article className="w-full h-[200px] bg-[#EFF5FF] px-4 py-6 rounded-2xl">
                <h5 className="text-gray1 font-semibold text-sm">Income</h5>
                <h3 className="mt-2 text-[25px] 2xl:text-[32px] font-bold text-primary">
                  {formatAmount(incomeTotal)}
                </h3>
                <button
                  onClick={() => setOpenAddIncomeModal(true)}
                  className="w-full py-4 mt-7 bg-primary rounded-lg flex justify-center items-center gap-2 text-sm font-semibold text-white"
                >
                  <PlusIcon />
                  Add Income
                </button>
              </article>
              <article className="w-full h-[200px] bg-[#FFF4F5] px-4 py-6 rounded-2xl">
                <h5 className="text-gray1 font-semibold text-sm">Expenses</h5>
                <h3 className="mt-2 text-[25px] 2xl:text-[32px] font-bold text-red">
                  {formatAmount(expensesTotal)}
                </h3>
                <button
                  onClick={() => setOpenAddExpensesModal(true)}
                  className="w-full py-4 mt-7 bg-red rounded-lg flex justify-center items-center gap-2 text-sm font-semibold text-white"
                >
                  <PlusIcon />
                  Add Expenses
                </button>
              </article>
            </div>
          </section>

          <section className="mt-5 w-full h-[415px] py-5 px-6 border border-gray4 bg-white rounded-xl overflow-clip">
            <div className="flex justify-between items-center">
              <h4 className="font-semibold text-xl text-gray1">
                Transaction history
              </h4>
              <button
                className="p-2 font-semibold text-sm"
                onClick={() => setOpenHistoryModal(true)}
              >
                See all
              </button>
            </div>
            <div className="mt-5 flex justify-between p-4 bg-[#FBFAFA] rounded-lg font-semibold text-gray1 text-center">
              <h4 className="w-[200px] text-left">Title</h4>
              <h4 className="w-[200px]">Date</h4>
              <h4 className="w-[200px]">Amount</h4>
              <h4 className="w-[200px]">Balance</h4>
            </div>
            <div className="space-y-2 mt-2">
              {history?.slice(0, 4).map((data, index) => (
                <HistoryBox key={index} data={data} />
              ))}
            </div>
          </section>
        </div>

        <div className="w-full">
          <section className="w-full h-[415px] py-5 px-6 border border-gray4 bg-white rounded-xl">
            <h4 className="font-semibold text-xl text-gray1">Analytics</h4>

            <AnalyticsBar />

            <div className="flex mt-5 justify-between">
              <div className="flex gap-3 items-center">
                <span className="w-4 h-4 rounded bg-[#EFF5FF] inline-block" />
                <div>
                  <h4 className="text-gray2 font-medium">Income</h4>
                  <h3 className="text-primary mt-1 text-xl font-bold">
                    {formatAmount(incomeTotal)}
                  </h3>
                </div>
              </div>
              <div className="flex gap-3 items-center">
                <span className="w-4 h-4 rounded bg-[#FFE3E6] inline-block" />
                <div>
                  <h4 className="text-gray2 font-medium">Expenses</h4>
                  <h3 className="text-red mt-1 text-xl font-bold">
                    {formatAmount(expensesTotal)}
                  </h3>
                </div>
              </div>
            </div>
          </section>

          <section className="w-full h-[415px] py-5 px-6 border border-gray4 bg-white rounded-xl mt-5">
            <div className="flex justify-between items-center">
              <h4 className="font-semibold text-xl text-gray1">Categories</h4>
              <button
                className="flex gap-1.5 items-center text-primary text-sm font-semibold"
                onClick={() => setOpenEditCategoryModal(true)}
              >
                <EditIcon />
                Edit
              </button>
            </div>

            <div className="mt-7 space-y-5">
              {user?.budget?.category.slice(0, 2).map((data, index) => (
                <CategoryBox key={index} data={data} />
              ))}
            </div>
            <div className="flex justify-end mt-8">
              <button
                className="text-sm font-semibold text-[#092256] underline"
                onClick={() => setOpenCategoryModal(true)}
              >
                View all
              </button>
            </div>
          </section>
        </div>
      </div>

      {/* MODALS */}
      <AddIncomeModal
        openModal={openAddIncomeModal}
        setOpenModal={setOpenAddIncomeModal}
      />
      <AddExpensesModal
        openModal={openAddExpensesModal}
        setOpenModal={setOpenAddExpensesModal}
      />
      <CategoryModal
        openModal={openCategoryModal}
        setOpenModal={setOpenCategoryModal}
      />
      <HistoryModal
        openModal={openHistoryModal}
        setOpenModal={setOpenHistoryModal}
      />
      <NewBudgetModal
        openModal={openNewBudgetModal}
        setOpenModal={setOpenNewBudgetModal}
      />
      <EditCategoryModal
        openModal={openEditCategoryModal}
        setOpenModal={setOpenEditCategoryModal}
      />
    </main>
  );
};

export default Page;
