import { Dispatch, SetStateAction, useState } from "react";
import Modal from "../modal";
import { getTotal } from "@/utils/helper";
import { NigeriaIcon } from "@/icons/countryIcons";
import ArrowDownIcon from "@/icons/arrowDown";
import { expensesInNaira, expensesInOther, option1 } from "@/utils/data";
import useUserStore, { CategoryType } from "@/store/user";
import useAlertStore from "@/store/alert";
import { API } from "@/utils/api";
import useFormatAmount from "@/hooks/useFormatAmount";
import useRateStore from "@/store/rate";
import CurrencyFlag from "../currencyFlag";

const AddExpensesModal = ({
  openModal,
  setOpenModal,
}: {
  openModal: boolean;
  setOpenModal: Dispatch<SetStateAction<boolean>>;
}) => {
  const { user, setUser } = useUserStore();
  const { formatAmount, formatOnly } = useFormatAmount();
  const { showAlert } = useAlertStore();
  const [value, setValue] = useState("");
  const [category, setCategory] = useState<CategoryType | null>(null);
  const [openCategoryModal, setOpenCategoryModal] = useState(false);

  const defaultCurrency = user?.budget?.defaultCurrency;
  const data = defaultCurrency === "NGN" ? expensesInNaira : expensesInOther;

  const formatData = (data: string) => {
    if (defaultCurrency === "NGN") {
      return data.replace(/\b(\d{1,3})000\b/g, function (match, p1) {
        return `₦${p1}k`;
      });
    } else if (defaultCurrency === "USD") {
      return `$${data}`;
    } else {
      return `€${data}`;
    }
  };

  const { totalBalance } = getTotal(user!);
  const balance = totalBalance - +value;

  const [loading, setLoading] = useState(false);
  const handleAdd = async () => {
    setLoading(true);

    const res = await API.post(
      `/expense/create-expense/${category?.id}?user=true`,
      {
        amount: +value,
        balance,
      }
    );

    if (res.data) {
      setUser(res.data);
      setValue("");
      setCategory(null);

      setOpenModal(false);
      showAlert(
        `Amount of ${formatOnly(+value)} has been added to your expenses`
      );
    } else {
      console.log(res.error);
    }

    setLoading(false);
  };

  return (
    <Modal
      openModal={openModal}
      closeModal={() => setOpenModal(false)}
      height="80vh"
      scroll
    >
      <h2 className="font-semibold text-gray1 text-xl">Add Expenses</h2>

      <div className="w-full space-y-8 mt-8">
        <div className="flex gap-x-4 gap-y-6 flex-wrap">
          {data.map((income, index) => (
            <button
              onClick={() => setValue(income)}
              key={index}
              className={`px-4 py-3 font-medium border  rounded-full transition-color duration-300 ${
                value === income
                  ? "text-primary border-primary shadow-blue-500"
                  : "border-gray4 text-gray1"
              }`}
            >
              {formatData(income)}
            </button>
          ))}
        </div>

        <div className="relative">
          <input
            type="text"
            className="bg-[#F5F5F5] px-4 py-5 rounded-lg w-full text-sm"
            placeholder="Enter Expense"
            value={value}
            onChange={(e) => {
              const value = e.target.value;
              const numericValue = value.replace(/[^0-9]/g, "");
              setValue(numericValue);
            }}
          />
          {value && (
            <span className="absolute bg-[#F5F5F5] pointer-events-none left-4 top-1/2 -translate-y-1/2 py-3 text-sm min-w-[30px]">
              {formatOnly(+value)}
            </span>
          )}
          <span className="absolute right-5 top-1/2 -translate-y-1/2 flex gap-1.5 items-center font-medium text-xs">
            <CurrencyFlag />
          </span>
        </div>

        <div className="relative">
          <button
            onClick={() => setOpenCategoryModal(true)}
            className="px-4 py-5 text-sm text-gray2 bg-[#F5F5F5] flex justify-between items-center w-full rounded-lg"
          >
            {category ? (
              <span className="flex gap-2 items-center">
                <span className="w-5 h-5 rounded-full bg-[#F7F9FA] grid place-content-center">
                  {category.icon}
                </span>

                <h3 className="font-semibold text-sm">{category.title}</h3>
              </span>
            ) : (
              "Choose Category"
            )}
            <ArrowDownIcon />
          </button>
        </div>

        <div className="flex justify-center">
          <button
            onClick={handleAdd}
            disabled={!value || !category || loading}
            className="mt-5 w-[90%] mx-auto py-5 flex gap-3 items-center justify-center font-semibold text-white rounded-lg bg-primary transition-colors duration-300 disabled:bg-gray3"
          >
            Add {value && formatOnly(+value)}
            {loading && <span className="loader-small"></span>}
          </button>
        </div>
      </div>

      <Modal
        openModal={openCategoryModal}
        closeModal={() => setOpenCategoryModal(false)}
        width="400px"
      >
        <h2 className="font-semibold text-gray1 text-xl">Choose Category</h2>

        <div className="mt-6 py-2 space-y-4 overflow-y-scroll h-[40vh]">
          {user?.budget?.category?.map((data, index) => (
            <button
              key={index}
              onClick={() => {
                setCategory(data);
                setOpenCategoryModal(false);
              }}
              className="flex gap-2 items-center"
            >
              <span className="w-8 h-8 rounded-full bg-[#F7F9FA] grid place-content-center">
                {data.icon}
              </span>

              <h3 className="font-semibold text-sm">{data.title}</h3>
            </button>
          ))}
        </div>
      </Modal>
    </Modal>
  );
};

export default AddExpensesModal;
