import { Dispatch, SetStateAction, useState } from "react";
import Modal from "../modal";
import { getTotal } from "@/utils/helper";
import { NigeriaIcon } from "@/icons/countryIcons";
import { API } from "@/utils/api";
import useUserStore from "@/store/user";
import useAlertStore from "@/store/alert";
import useFormatAmount from "@/hooks/useFormatAmount";
import { expensesInNaira, expensesInOther } from "@/utils/data";
import CurrencyFlag from "../currencyFlag";

const AddIncomeModal = ({
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
  const [title, setTitle] = useState("");

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
  const balance = totalBalance + +value;

  const [loading, setLoading] = useState(false);
  const handleAdd = async () => {
    setLoading(true);

    const res = await API.post("/income/create-income?user=true", {
      amount: +value,
      balance,
      title: title ? title : "Income",
    });

    if (res.data) {
      setUser(res.data);
      setValue("");
      setTitle("");

      setOpenModal(false);
      showAlert(
        `Amount of ${formatOnly(+value)} has been added to your income`
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
      <h2 className="font-semibold text-gray1 text-xl">Add Income</h2>

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
            placeholder="Enter Income"
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

        <div className="relative w-full">
          <input
            type="text"
            className="bg-[#F5F5F5] px-4 py-5 rounded-lg w-full text-sm"
            placeholder="Title (Leave blank if there's none)"
            value={title}
            onChange={(e) => {
              const newValue = e.target.value;
              if (newValue.length > 15) {
                setTitle(newValue.slice(0, 15));
              } else {
                setTitle(newValue);
              }
            }}
            required
          />
          <span className="absolute right-8 top-1/2 text-xs -translate-y-1/2">
            {title.length}/15
          </span>
        </div>

        <div className="flex justify-center">
          <button
            onClick={handleAdd}
            disabled={!value || loading}
            className="w-full mt-5 py-5 flex gap-3 items-center justify-center font-semibold text-white rounded-lg bg-primary transition-colors duration-300 disabled:bg-gray3"
          >
            Add {value && formatOnly(+value)}
            {loading && <span className="loader-small"></span>}
          </button>
        </div>
      </div>
    </Modal>
  );
};

export default AddIncomeModal;
