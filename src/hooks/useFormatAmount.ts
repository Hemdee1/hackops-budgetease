import useRateStore from "@/store/rate";
import useUserStore from "@/store/user";

const defaultRates = {
  EUR: 0.924527,
  NGN: 1509.863209,
  USD: 1,
};

function format(number: number, currencySymbol: string): string {
  if (number === null || number === undefined) return "";

  // Convert the number to a string and fix to 2 decimal places
  let numStr = number.toFixed(2);

  // Split the number into integer and decimal parts
  let parts = numStr.split(".");
  let integerPart = parts[0];
  let decimalPart = parts[1];

  // Add commas to the integer part
  integerPart = integerPart.replace(/\B(?=(\d{3})+(?!\d))/g, ",");

  // Concatenate the formatted integer part with decimal part
  return currencySymbol + integerPart + "." + decimalPart;
}

function useFormatAmount() {
  const { user } = useUserStore();
  const { rateSelected, ratesCache } = useRateStore();
  const exchangeRates = ratesCache ? ratesCache : defaultRates;
  const defaultCurrency = user?.budget ? user.budget.defaultCurrency : "NGN";

  const formatAmount = (amount: number) => {
    let amountInNGN;

    // Convert amount to NGN based on the default currency
    if (defaultCurrency === "USD") {
      amountInNGN = amount * exchangeRates.NGN;
    } else if (defaultCurrency === "EUR") {
      amountInNGN = amount * (exchangeRates.NGN / exchangeRates.EUR);
    } else {
      amountInNGN = amount;
    }

    // Convert NGN to USD and EUR
    const amountInUSD = amountInNGN / exchangeRates.NGN;
    const amountInEUR = amountInUSD * exchangeRates.EUR;

    if (rateSelected === "NGN") {
      return format(amountInNGN, "₦");
    } else if (rateSelected === "USD") {
      return format(amountInUSD, "$");
    } else {
      return format(amountInEUR, "€");
    }
  };

  function formatOnly(number: number): string {
    if (number === null || number === undefined) return "";

    const defaultCurrency = user?.budget
      ? user.budget.defaultCurrency
      : rateSelected;

    let currencySymbol = "₦";

    if (defaultCurrency === "NGN") {
      currencySymbol = "₦";
    } else if (defaultCurrency === "USD") {
      currencySymbol = "$";
    } else {
      currencySymbol = "€";
    }

    // Convert the number to a string and fix to 2 decimal places
    let numStr = number.toFixed(2);

    // Split the number into integer and decimal parts
    let parts = numStr.split(".");
    let integerPart = parts[0];
    let decimalPart = parts[1];

    // Add commas to the integer part
    integerPart = integerPart.replace(/\B(?=(\d{3})+(?!\d))/g, ",");

    // Concatenate the formatted integer part with decimal part
    return currencySymbol + integerPart + "." + decimalPart;
  }

  return { formatAmount, formatOnly };
}

export default useFormatAmount;
