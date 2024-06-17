import useUserStore from "@/store/user";
import { getTotal } from "@/utils/helper";

const AnalyticsBar = () => {
  const { user } = useUserStore();
  const { expensesTotal, incomeTotal } = getTotal(user!);

  const percentage = (expensesTotal / incomeTotal) * 100;

  const validPercentage = Math.min(100, Math.max(0, percentage));
  const degree = (validPercentage / 100) * 360;
  const roundedPercentage = validPercentage.toFixed(1); // Round to 1 decimal place

  return (
    <div className="w-full flex justify-center items-center mt-5">
      <div className="relative h-[250px] w-[250px]">
        <div className="h-full w-full border-[50px] border-[#EFF5FF] rounded-full flex justify-center items-center">
          {/* Background Circle */}
          <div
            className="absolute top-0 left-0 h-full w-full rounded-full"
            style={{
              background: `conic-gradient(#FFE3E6 ${degree}deg, #EFF5FF ${degree}deg)`,
            }}
          ></div>
          {/* Inner Circle for displaying percentage */}
          <div className="absolute flex justify-center items-center h-[150px] w-[150px] bg-white rounded-full text-xl font-bold">
            {roundedPercentage}%
          </div>
        </div>
      </div>
    </div>
  );
};

export default AnalyticsBar;
