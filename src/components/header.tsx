import useOutsideClick from "@/hooks/useOutsideClick";
import Logo from "@/icons/logo";
import useRateStore from "@/store/rate";
import useUserStore from "@/store/user";
import { API } from "@/utils/api";
import { getPoints } from "@/utils/helper";
import Link from "next/link";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import ChangeCurrencyDropdown from "./changeCurrency";
import NotificationModal from "./modals/notification";
import UserIcon from "@/icons/userIcon";
import ProfileModal from "./modals/profile";
import Image from "next/image";
import ChangePasswordModal from "./modals/password";

const Header = () => {
  const router = useRouter();
  const { user, setUser } = useUserStore();
  const { rateSelected, setRateSelected, ratesCache, updateRatesCache } =
    useRateStore();
  const { totalXPPoints, flamePoints, expensePoints, incomePoints } = getPoints(
    user!
  );

  const [openUserDropdown, setOpenUserDropdown] = useState(false);
  const [openNotificationModal, setOpenNotificationModal] = useState(false);
  const [openProfileModal, setOpenProfileModal] = useState(false);
  const [openPasswordModal, setOpenPasswordModal] = useState(false);

  const userRef = useOutsideClick(() => setOpenUserDropdown(false));

  useEffect(() => {
    if (!user) return;

    setRateSelected(user.budget?.defaultCurrency as any);
  }, [user, setRateSelected]);

  useEffect(() => {
    if (ratesCache) return;

    const fetchRates = async () => {
      const res = await API.get("/rates");
      if (res.data) {
        updateRatesCache(res.data);
      } else {
        console.log(res.error);
      }
    };

    // fetchRates();
  }, [ratesCache, updateRatesCache]);

  const [loading, setLoading] = useState(false);
  const handleLogout = async () => {
    setLoading(true);
    const res = await API.post("/user/logout", {});

    if (res.data) {
      router.push("/login");

      setUser(null);
      setRateSelected("NGN");
    } else {
      console.log(res.error);
    }
    setLoading(false);
  };

  const homepage = router.pathname === "/";

  return (
    <header
      className={`border-gray4 w-full  fixed left-0 top-0 z-20 ${
        homepage ? "bg-[#F1F6FF] border-none" : "bg-white border-b"
      }`}
    >
      <div className="w-fullscreen max-w-full mx-auto px-20 py-5 flex justify-between items-center">
        <Link href="/">
          <Logo />
        </Link>

        {user ? (
          <div className="flex gap-8 items-center">
            <div className="p-3 rounded-full border border-gray4 bg-white flex items-center gap-2.5 font-medium text-sm relative group">
              <FlashIcon />
              {totalXPPoints}XP
              {/* DROPDOWN MODAL */}
              <div className="w-[370px] border border-gray4 rounded-lg bg-white p-4 absolute top-14 left-0 z-30 opacity-0 invisible group-hover:opacity-100 group-hover:visible">
                <div className="bg-[#FBFAFA] rounded-lg p-4">
                  <div className="flex gap-4 items-center border-b border-gray4 pb-4">
                    <span className="border border-[#F6F6F6] rounded-full bg-white w-14 h-14 grid place-content-center">
                      <FlashIcon width={16} />
                    </span>
                    <div className="text-gray1 text-left">
                      <h4 className="font-extrabold text-[30px]">
                        {totalXPPoints}
                      </h4>
                      <span className="font-semibold text-xs mt-3 block">
                        Points earned
                      </span>
                    </div>
                  </div>
                  <div className="mt-4 flex justify-between items-center">
                    <article className="flex items-center gap-4">
                      <span className="border border-[#F6F6F6] rounded-full bg-[#EFF5FF] w-11 h-11 grid place-content-center">
                        <ArrowDownIcon />
                      </span>
                      <div className="text-gray1 text-left">
                        <h5 className="font-semibold text-sm">Income</h5>
                        <span className="font-semibold text-[10px] block">
                          {incomePoints}XP
                        </span>
                      </div>
                    </article>
                    <article className="flex items-center gap-4">
                      <span className="border border-[#F6F6F6] rounded-full bg-[#EFF5FF] w-11 h-11 grid place-content-center">
                        <ArrowTopIcon />
                      </span>
                      <div className="text-gray1 text-left">
                        <h5 className="font-semibold text-sm">Expenses</h5>
                        <span className="font-semibold text-[10px] block">
                          {expensePoints}XP
                        </span>
                      </div>
                    </article>
                  </div>
                </div>
              </div>
            </div>

            <div className="p-3 rounded-full border border-gray4 bg-white flex items-center gap-2.5 font-medium text-sm relative group">
              <FlameIcon />
              {flamePoints}

              <div className="w-[370px] border border-gray4 rounded-lg bg-white p-4 absolute top-14 -left-28 z-30 opacity-0 invisible group-hover:opacity-100 group-hover:visible">
                <div className="bg-[#FBFAFA] rounded-lg p-4">
                  <div className="flex gap-4 items-center">
                    <span className="border border-[#F6F6F6] rounded-full bg-white w-14 h-14 grid place-content-center">
                      <FlameIcon />
                    </span>
                    <div className="text-gray1 text-left">
                      <h4 className="font-extrabold text-[30px]">
                        {flamePoints}
                      </h4>
                      <span className="font-semibold text-xs mt-3 block">
                        Days streaks
                      </span>
                    </div>
                  </div>
                  <div className="mt-4 h-5 w-full bg-[#FDEEF0] rounded relative overflow-hidden">
                    <span
                      className="absolute left-0 top-0 h-full bg-[#FF3448]"
                      style={{ width: `${(flamePoints / 30) * 100}%` }}
                    ></span>
                  </div>
                </div>
              </div>
            </div>

            <ChangeCurrencyDropdown />

            <div ref={userRef} className="relative">
              <button
                onClick={() => setOpenUserDropdown((prev) => !prev)}
                className="rounded-full shadow"
              >
                <div className="w-10 h-10">
                  {user?.avatar ? (
                    <Image
                      src={user.avatar}
                      alt="user image"
                      width={0}
                      height={0}
                      sizes="100vw"
                      className="w-full h-full object-cover rounded-full"
                    />
                  ) : (
                    <UserIcon />
                  )}
                </div>
              </button>

              <div
                className={`absolute right-0 text-gray1 border border-gray4 divide-gray-100 font-semibold shadow-lg w-[215px] py-4 bg-white rounded-2xl transition-all duration-300 ${
                  openUserDropdown
                    ? "top-16 opacity-100 visible"
                    : "top-6 opacity-0 invisible"
                }`}
              >
                {/* <button className="p-4 w-full text-left">Profile</button> */}
                <Link
                  href="/dashboard"
                  className="p-4 inline-block w-full text-left"
                >
                  Dashboard
                </Link>
                <button
                  className="p-4 inline-block w-full text-left"
                  onClick={() => setOpenProfileModal(true)}
                >
                  Update Profile
                </button>
                <button
                  className="p-4 inline-block w-full text-left"
                  onClick={() => setOpenPasswordModal(true)}
                >
                  Change Password
                </button>
                <button
                  className="p-4 inline-block w-full text-left"
                  onClick={() => setOpenNotificationModal(true)}
                >
                  Notifications
                </button>
                <button
                  disabled={loading}
                  onClick={handleLogout}
                  className="p-4 w-full text-left text-red flex gap-2 items-center"
                >
                  Log out {loading && <span className="loader-red"></span>}
                </button>
              </div>
            </div>
          </div>
        ) : (
          <div className="flex items-center gap-6">
            <Link href="/login" className="text-primary font-bold">
              Log in
            </Link>
            <Link
              href="/create"
              className="bg-primary text-white p-4 rounded-lg font-semibold"
            >
              Create free account
            </Link>
          </div>
        )}
      </div>

      <NotificationModal
        openModal={openNotificationModal}
        setOpenModal={setOpenNotificationModal}
      />
      <ProfileModal
        openModal={openProfileModal}
        setOpenModal={setOpenProfileModal}
      />
      <ChangePasswordModal
        openModal={openPasswordModal}
        setOpenModal={setOpenPasswordModal}
      />
    </header>
  );
};

const FlashIcon = ({ width = 12 }) => (
  <svg
    width={width}
    // height="29"
    viewBox="0 0 16 29"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path
      d="M7.06383 18.3182H0.700195L9.60929 0.5V10.6818H15.9729L7.06383 28.5V18.3182Z"
      fill="#008000"
    />
  </svg>
);

const FlameIcon = () => (
  <svg
    width="15"
    height="18"
    viewBox="0 0 15 18"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path
      d="M13.3598 8.2C13.1298 7.9 12.8498 7.64 12.5898 7.38C11.9198 6.78 11.1598 6.35 10.5198 5.72C9.02976 4.26 8.69976 1.85 9.64976 0C8.69976 0.23 7.86976 0.75 7.15976 1.32C4.56976 3.4 3.54976 7.07 4.76976 10.22C4.80976 10.32 4.84976 10.42 4.84976 10.55C4.84976 10.77 4.69976 10.97 4.49976 11.05C4.26976 11.15 4.02976 11.09 3.83976 10.93C3.783 10.8825 3.73553 10.8248 3.69976 10.76C2.56976 9.33 2.38976 7.28 3.14976 5.64C1.47976 7 0.569757 9.3 0.699757 11.47C0.759757 11.97 0.819757 12.47 0.989757 12.97C1.12976 13.57 1.39976 14.17 1.69976 14.7C2.77976 16.43 4.64976 17.67 6.65976 17.92C8.79976 18.19 11.0898 17.8 12.7298 16.32C14.5598 14.66 15.1998 12 14.2598 9.72L14.1298 9.46C13.9198 9 13.3598 8.2 13.3598 8.2ZM10.1998 14.5C9.91976 14.74 9.45976 15 9.09976 15.1C7.97976 15.5 6.85976 14.94 6.19976 14.28C7.38976 14 8.09976 13.12 8.30976 12.23C8.47976 11.43 8.15976 10.77 8.02976 10C7.90976 9.26 7.92976 8.63 8.19976 7.94C8.38976 8.32 8.58976 8.7 8.82976 9C9.59976 10 10.8098 10.44 11.0698 11.8C11.1098 11.94 11.1298 12.08 11.1298 12.23C11.1598 13.05 10.7998 13.95 10.1998 14.5Z"
      fill="#E50909"
    />
  </svg>
);

const ArrowDownIcon = () => (
  <svg
    width="14"
    height="18"
    viewBox="0 0 14 18"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path
      d="M7.75032 1C7.75032 0.801088 7.6713 0.610322 7.53065 0.46967C7.38999 0.329018 7.19923 0.25 7.00032 0.25C6.8014 0.25 6.61064 0.329018 6.46999 0.46967C6.32934 0.610322 6.25032 0.801088 6.25032 1V10.25H1.00032C0.852077 10.2501 0.707201 10.2942 0.583985 10.3766C0.460769 10.459 0.364742 10.5761 0.30803 10.7131C0.251319 10.85 0.236468 11.0007 0.265352 11.1461C0.294236 11.2915 0.365561 11.4251 0.470317 11.53L6.47032 17.53C6.61094 17.6705 6.80157 17.7493 7.00032 17.7493C7.19907 17.7493 7.38969 17.6705 7.53032 17.53L13.5303 11.53C13.6351 11.4251 13.7064 11.2915 13.7353 11.1461C13.7642 11.0007 13.7493 10.85 13.6926 10.7131C13.6359 10.5761 13.5399 10.459 13.4166 10.3766C13.2934 10.2942 13.1486 10.2501 13.0003 10.25H7.75032V1Z"
      fill="#0257EF"
    />
  </svg>
);

const ArrowTopIcon = () => (
  <svg
    width="15"
    height="18"
    viewBox="0 0 15 18"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path
      d="M6.98699 17C6.98699 17.1989 7.06601 17.3897 7.20666 17.5303C7.34731 17.671 7.53808 17.75 7.73699 17.75C7.9359 17.75 8.12667 17.671 8.26732 17.5303C8.40797 17.3897 8.48699 17.1989 8.48699 17L8.48699 7.75L13.737 7.75C13.8852 7.74987 14.0301 7.70581 14.1533 7.62339C14.2765 7.54097 14.3726 7.42389 14.4293 7.28692C14.486 7.14996 14.5008 6.99926 14.472 6.85386C14.4431 6.70846 14.3717 6.57489 14.267 6.47L8.26699 0.47C8.12636 0.32955 7.93574 0.250661 7.73699 0.250661C7.53824 0.250661 7.34761 0.32955 7.20699 0.47L1.20699 6.47C1.10223 6.57489 1.03091 6.70847 1.00202 6.85386C0.973138 6.99926 0.987988 7.14996 1.0447 7.28692C1.10141 7.42389 1.19744 7.54097 1.32065 7.62339C1.44387 7.70581 1.58875 7.74987 1.73699 7.75L6.98699 7.75L6.98699 17Z"
      fill="#B60915"
    />
  </svg>
);

export default Header;
