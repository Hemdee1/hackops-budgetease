import useFormatAmount from "@/hooks/useFormatAmount";
import { CategoryType } from "@/store/user";

const CategoryBox = ({ data }: { data: CategoryType }) => {
  const { formatAmount } = useFormatAmount();
  const totalExpense = data.expense.reduce(
    (total, expense) => total + expense.amount,
    0
  );
  const percent = Math.round((totalExpense / data.price) * 100);

  return (
    <article className="p-4 border border-gray4 bg-white  rounded-2xl">
      <div className="flex gap-2">
        <span className="w-11 h-11 rounded-full bg-[#F7F9FA] grid place-content-center text-xl">
          {data.icon}
        </span>
        <div>
          <h3 className="font-semibold text-sm">{data.title}</h3>
          <h5 className="font-bold text-primary">{formatAmount(data.price)}</h5>
        </div>
      </div>

      <div className="mt-4">
        <span className="h-2 block w-full bg-[#EFF5FF] rounded-full overflow-clip">
          <span
            className={`h-full block rounded ${
              totalExpense > data.price
                ? "bg-red"
                : totalExpense === data.price
                ? "bg-green"
                : "bg-primary"
            }`}
            style={{ width: `${percent}%` }}
          ></span>
        </span>
        <div className="mt-1 flex justify-between items-center">
          <h4 className="text-[#092256] text-sm font-bold">
            {formatAmount(totalExpense)}
          </h4>
          <span className="text-gray2 text-sm font-medium">{percent}%</span>
        </div>
      </div>
    </article>
  );
};

export default CategoryBox;
