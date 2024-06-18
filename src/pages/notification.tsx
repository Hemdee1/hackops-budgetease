import Header from "@/components/header";
import useAlertStore from "@/store/alert";
import { useEffect, useState } from "react";

const Notification = () => {
  const { showAlert } = useAlertStore();
  const [typeSelected, setTypeSelected] = useState("once");

  useEffect(() => {
    if (typeSelected === "once") {
      showAlert("Notification has been set to once per day");
    } else {
      showAlert("Notification has been set to twice per day");
    }
  }, [typeSelected, showAlert]);

  return (
    <main className="w-fullscreen max-w-full mx-auto px-20 my-32">
      <Header />

      <div className="mt-10 w-[510px] max-w-full mx-auto py-8 px-5 border border-gray4 bg-white  rounded-3xl">
        <h2 className="font-semibold text-gray1 text-xl">Notifications</h2>

        <div className="space-y-5">
          <h4 className="mt-10 font-semibold text-gray1 text-lg">
            Daily reminders
          </h4>

          <div className="flex w-full justify-between items-center">
            <h4 className="font-semibold text-gray1 text-lg">Once daily</h4>

            <button onClick={() => setTypeSelected("once")}>
              {typeSelected === "once" ? <CheckedIcon /> : <UncheckedIcon />}
            </button>
          </div>

          <div className="flex w-full justify-between items-center">
            <h4 className="font-semibold text-gray1 text-lg">Twice daily</h4>

            <button onClick={() => setTypeSelected("twice")}>
              {typeSelected === "twice" ? <CheckedIcon /> : <UncheckedIcon />}
            </button>
          </div>
        </div>
      </div>
    </main>
  );
};

const CheckedIcon = () => (
  <svg
    width="27"
    height="18"
    viewBox="0 0 27 18"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path
      d="M18 0H9C4.03125 0 0 4.03125 0 9C0 13.9688 4.03125 18 9 18H18C22.9688 18 27 13.9688 27 9C27 4.03125 22.9688 0 18 0ZM18 15C14.6812 15 12 12.3141 12 9C12 5.68125 14.6859 3 18 3C21.3188 3 24 5.68594 24 9C24 12.3188 21.3141 15 18 15Z"
      fill="#0257EF"
    />
  </svg>
);

const UncheckedIcon = () => (
  <svg
    width="27"
    height="18"
    viewBox="0 0 27 18"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path
      d="M9 18L18 18C22.9688 18 27 13.9688 27 9C27 4.03125 22.9687 3.52423e-07 18 7.86805e-07L9 1.57361e-06C4.03125 2.00799e-06 -1.22119e-06 4.03125 -7.86805e-07 9C-3.52423e-07 13.9688 4.03125 18 9 18ZM9 3C12.3187 3 15 5.68594 15 9C15 12.3188 12.3141 15 9 15C5.68125 15 3 12.3141 3 9C3 5.68125 5.68594 3 9 3Z"
      fill="#CCCCCC"
    />
  </svg>
);

export default Notification;
