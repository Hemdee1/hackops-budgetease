import useFormatAmount from "@/hooks/useFormatAmount";
import useUserStore, { HistoryType } from "@/store/user";
import { format } from "timeago.js";

const HistoryBox = ({ data }: { data: HistoryType }) => {
  const { user } = useUserStore();
  const { formatAmount } = useFormatAmount();

  const expenseId = data?.categoryId;
  const category = user?.budget?.category.find((c) => c.id === expenseId);

  return (
    <article
      className={`text-center flex justify-between p-4 rounded-lg ${
        expenseId ? "bg-red/5" : "bg-green/5"
      }`}
    >
      <h4 className="w-[200px] text-left capitalize">
        {expenseId ? category?.title : data.title}
      </h4>
      <h4 className="w-[200px]">{format(data.createdAt)}</h4>
      <h4
        className={`w-[200px] font-bold ${
          expenseId ? "text-red" : "text-green"
        }`}
      >
        {expenseId ? "-" : "+"} {formatAmount(data.amount)}
      </h4>
      <h4 className="w-[200px] font-bold">{formatAmount(data.balance)}</h4>
    </article>
  );
};

export default HistoryBox;
