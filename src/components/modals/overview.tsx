import { Dispatch, SetStateAction, useEffect, useState } from "react";
import Modal from "../modal";
import useOnboardStore, { BudgetType } from "@/store/onboard";
import AddNewCategoryModal from "./addCategory";
import { API } from "@/utils/api";
import { useRouter } from "next/router";
import useUserStore from "@/store/user";
import useFormatAmount from "@/hooks/useFormatAmount";
import useRateStore from "@/store/rate";

const BudgetOverviewModal = ({
  openModal,
  setOpenModal,
  setOpenPrevModal,
}: {
  openModal: boolean;
  setOpenModal: Dispatch<SetStateAction<boolean>>;
  setOpenPrevModal: Dispatch<SetStateAction<boolean>>;
}) => {
  const router = useRouter();
  const { setUser } = useUserStore();
  const { selectedBudget, rent, income, gender, transport, status } =
    useOnboardStore();
  const { formatOnly } = useFormatAmount();
  const { rateSelected } = useRateStore();

  const [calculatedBudget, setCalculatedBudget] = useState([] as BudgetType[]);

  useEffect(() => {
    // if (calculatedBudget.find((b) => b.title === "Other")) return;

    if (rent) {
      const monthlyRent = Math.round(+rent / 12);
      const rentPercent = Math.round((monthlyRent / +income) * 100);
      const remainderPercent = 100 - rentPercent;

      const percent = Math.round(
        remainderPercent / (selectedBudget.length + 1)
      );
      const price = Math.round((percent / 100) * +income);

      const rentValue = {
        icon: "💸",
        title: "Rent",
        desc: "Monthly Rent Saving",
        price: monthlyRent,
        percent: rentPercent,
      };

      const otherValue = {
        icon: "🧩",
        title: "Other",
        desc: "Other Expenses",
        price,
        percent,
      };

      const budget = selectedBudget.map((b) => ({
        ...b,
        percent,
        price,
      }));

      setCalculatedBudget([rentValue, ...budget, otherValue]);
    } else {
      const percent = Math.round(100 / (selectedBudget.length + 1));
      const price = Math.round((percent / 100) * +income);

      const budget = selectedBudget.map((b) => ({
        ...b,
        percent: percent,
        price,
      }));

      const otherValue = {
        icon: "🧩",
        title: "Other",
        desc: "Other Expenses",
        price,
        percent,
      };

      setCalculatedBudget([...budget, otherValue]);
    }
  }, [rent, income, selectedBudget]);

  const totalPercent = calculatedBudget.reduce(
    (total, budget) => total + budget.percent,
    0
  );

  const handleChangePercent = (type: "minus" | "plus", index: number) => {
    setCalculatedBudget((prev) =>
      prev.map((budget, i) =>
        index === i
          ? {
              ...budget,
              percent:
                type === "minus" ? budget.percent - 1 : budget.percent + 1,
              price:
                type === "minus"
                  ? Math.round(((budget.percent - 1) / 100) * +income)
                  : Math.round(((budget.percent + 1) / 100) * +income),
            }
          : budget
      )
    );
  };

  const [openAddCategoryModal, setOpenAddCategoryModal] = useState(false);

  const [loading, setLoading] = useState(false);

  const handleCreate = async () => {
    setLoading(true);

    const res = await API.post("/budget/create-budget?user=true", {
      annualRent: rent ? +rent : 0,
      monthlyIncome: +income,
      gender,
      maritalStatus: status,
      modeOfTransport: transport,
      defaultCurrency: rateSelected,
      categories: calculatedBudget,
    });
    if (res.data) {
      setUser(res.data);
      router.push("/dashboard");
    } else {
      console.log(res.error);
    }

    setLoading(false);
  };

  return (
    <Modal
      openModal={openModal}
      // closeModal={() => setOpenModal(false)}
      width="700px"
      height="90vh"
    >
      <div className="flex justify-between items-center">
        <div className="flex items-center gap-4">
          <button
            onClick={() => {
              setOpenModal(false);
              setOpenPrevModal(true);
            }}
          >
            <ArrowBackIcon />
          </button>
          <div>
            <h2 className="font-semibold text-gray1 text-xl">
              Budget Overview
            </h2>

            <h4 className="text-sm text-gray1 mt-1">
              Monthly Income: {formatOnly(+income)}
            </h4>
          </div>
        </div>
        <div className="pr-8 text-right">
          <span
            className={`font-bold text-lg ${
              totalPercent < 100
                ? "text-yellow-500"
                : totalPercent > 100
                ? "text-red"
                : "text-green"
            }`}
          >
            {totalPercent}%
          </span>
          <h4 className="text-sm text-gray1 mt-1">
            Total Budget:{" "}
            {formatOnly(
              calculatedBudget.reduce((total, b) => total + b.price, 0)
            )}
          </h4>
        </div>
      </div>

      <h4 className="text-sm text-gray1 mt-4 text-center">
        Customize the percent and the price allocated for your categories
      </h4>

      <div className="mt-3 space-y-4 h-[45vh] p-4 overflow-y-scroll">
        {calculatedBudget.map((budget, index) => (
          <article
            key={index}
            className={`p-4 border-gray3 border rounded-2xl flex justify-between items-center text-gray1 ${
              budget.title === "Rent" ? "bg-green/10" : ""
            }`}
          >
            <div className="flex gap-2">
              <span className="w-11 h-11 rounded-full bg-[#F7F9FA] grid place-content-center text-xl">
                {budget.icon}
              </span>
              <div>
                <h3 className="font-semibold">{budget.title}</h3>
                <h5 className="font-medium text-sm">{budget.desc}</h5>
              </div>
            </div>
            <div className="flex flex-col items-end">
              <h3 className="font-semibold">{formatOnly(budget.price)}</h3>
              <div className="flex gap-2 items-center mt-2">
                <button
                  disabled={budget.title === "Rent"}
                  onClick={() => handleChangePercent("minus", index)}
                  className="disabled:opacity-0"
                >
                  <MinusIcon />
                </button>
                <span className="text-sm">{budget.percent}%</span>
                <button
                  disabled={budget.title === "Rent"}
                  onClick={() => handleChangePercent("plus", index)}
                  className="disabled:opacity-0"
                >
                  <PlusIcon />
                </button>
              </div>
            </div>
          </article>
        ))}
      </div>

      <div className="px-8 mt-4">
        <div className="flex justify-end">
          <button
            className="flex gap-2 items-center text-sm font-semibold text-primary"
            onClick={() => setOpenAddCategoryModal(true)}
          >
            <PlusIconAlt />
            Add new category
          </button>
        </div>

        <h4 className="text-sm text-gray1 mt-6 text-center">
          To proceed forward, ensure the total percentage across all categories
          equals <span className="text-primary font-semibold">100%</span>
        </h4>

        <div className="mt-4 flex justify-center">
          <button
            onClick={handleCreate}
            disabled={totalPercent !== 100 || loading}
            className="w-[90%] mx-auto py-5 font-semibold text-white rounded-lg bg-primary transition-colors duration-300 disabled:bg-gray3"
          >
            {loading ? <span className="loader-small" /> : "Create budget"}
          </button>
        </div>
      </div>

      <AddNewCategoryModal
        openModal={openAddCategoryModal}
        setOpenModal={setOpenAddCategoryModal}
      />
    </Modal>
  );
};

const PlusIconAlt = () => (
  <svg
    width="16"
    height="16"
    viewBox="0 0 16 16"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path
      d="M15 7H9V1C9 0.734784 8.89464 0.48043 8.70711 0.292893C8.51957 0.105357 8.26522 0 8 0C7.73478 0 7.48043 0.105357 7.29289 0.292893C7.10536 0.48043 7 0.734784 7 1V7H1C0.734784 7 0.48043 7.10536 0.292893 7.29289C0.105357 7.48043 0 7.73478 0 8C0 8.26522 0.105357 8.51957 0.292893 8.70711C0.48043 8.89464 0.734784 9 1 9H7V15C7 15.2652 7.10536 15.5196 7.29289 15.7071C7.48043 15.8946 7.73478 16 8 16C8.26522 16 8.51957 15.8946 8.70711 15.7071C8.89464 15.5196 9 15.2652 9 15V9H15C15.2652 9 15.5196 8.89464 15.7071 8.70711C15.8946 8.51957 16 8.26522 16 8C16 7.73478 15.8946 7.48043 15.7071 7.29289C15.5196 7.10536 15.2652 7 15 7Z"
      fill="#0257EF"
    />
  </svg>
);

const MinusIcon = () => (
  <svg
    width="16"
    height="16"
    viewBox="0 0 16 16"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <g clip-path="url(#clip0_61_740)">
      <path
        d="M8 0C12.4219 0 16 3.57812 16 8C16 12.4219 12.4219 16 8 16C3.57812 16 0 12.4219 0 8C0 3.57812 3.57812 0 8 0ZM8 15.0156C11.8594 15.0156 15 11.8594 15 8C15 4.14062 11.8594 1 8 1C4.14062 1 1 4.14062 1 8C1 11.8594 4.14062 15.0156 8 15.0156ZM7.45312 8.5H4.5C4.21875 8.5 4 8.28125 4 8C4 7.71875 4.21875 7.5 4.5 7.5H11.5C11.7812 7.5 12 7.71875 12 8C12 8.28125 11.7812 8.5 11.5 8.5H7.45312Z"
        fill="#CCCCCC"
      />
    </g>
    <defs>
      <clipPath id="clip0_61_740">
        <rect width="16" height="16" fill="white" />
      </clipPath>
    </defs>
  </svg>
);

const PlusIcon = () => (
  <svg
    width="16"
    height="16"
    viewBox="0 0 16 16"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <g clip-path="url(#clip0_61_743)">
      <path
        d="M8 0C3.58175 0 0 3.58175 0 8C0 12.4185 3.58175 16 8 16C12.4185 16 16 12.4185 16 8C16 3.58175 12.4185 0 8 0ZM8 15.0157C4.14025 15.0157 1 11.8597 1 7.99997C1 4.14022 4.14025 0.999969 8 0.999969C11.8597 0.999969 15 4.14023 15 7.99997C15 11.8597 11.8597 15.0157 8 15.0157ZM11.5 7.5H8.5V4.5C8.5 4.224 8.276 4 8 4C7.724 4 7.5 4.224 7.5 4.5V7.5H4.5C4.224 7.5 4 7.724 4 8C4 8.276 4.224 8.5 4.5 8.5H7.5V11.5C7.5 11.776 7.724 12 8 12C8.276 12 8.5 11.776 8.5 11.5V8.5H11.5C11.776 8.5 12 8.276 12 8C12 7.724 11.776 7.5 11.5 7.5Z"
        fill="#CCCCCC"
      />
    </g>
    <defs>
      <clipPath id="clip0_61_743">
        <rect width="16" height="16" fill="white" />
      </clipPath>
    </defs>
  </svg>
);

const ArrowBackIcon = () => (
  <svg
    width="32"
    height="32"
    viewBox="0 0 32 32"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <circle cx="16" cy="16" r="16" fill="#F3F3F3" />
    <path
      d="M18.25 11.5L13.75 16L18.25 20.5"
      stroke="#092256"
      stroke-width="2"
      stroke-linecap="round"
      stroke-linejoin="round"
    />
  </svg>
);

export default BudgetOverviewModal;
