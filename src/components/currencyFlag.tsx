import { NigeriaIcon, UKIcon, USIcon } from "@/icons/countryIcons";
import useUserStore from "@/store/user";

const CurrencyFlag = () => {
  const { user } = useUserStore();
  const defaultCurrency = user?.budget?.defaultCurrency;

  return (
    <span className="flex text-sm gap-2.5 items-center">
      {defaultCurrency === "NGN" ? (
        <>
          <NigeriaIcon />
          NGN
        </>
      ) : defaultCurrency === "USD" ? (
        <>
          <UKIcon />
          USD
        </>
      ) : (
        <>
          <USIcon />
          EUR
        </>
      )}
    </span>
  );
};

export default CurrencyFlag;
