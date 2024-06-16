import AuthHeader from "@/components/authHeader";
import ChangeCurrencyDropdown from "@/components/changeCurrency";
import Header from "@/components/header";
import ChooseBudgetModal from "@/components/modals/choose";
import LoadingModal from "@/components/modals/loading";
import BudgetOverviewModal from "@/components/modals/overview";
import useFormatAmount from "@/hooks/useFormatAmount";
import useOnboardStore from "@/store/onboard";
import useUserStore from "@/store/user";
import { option1, option2, option3, option4 } from "@/utils/data";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";

const Page = () => {
  return (
    <div className="py-24">
      <AuthHeader />

      <div className="w-[600px] mt-20 max-w-full mx-auto border-gray4 border  rounded-3xl px-5 sm:px-10 py-8">
        <div>
          <div className="h-1 w-full bg-gray3 rounded-full">
            <span className="h-full w-full bg-primary block rounded-full"></span>
          </div>
          <span className="mt-5 block text-gray2">Step 2 of 2</span>
          <h1 className="text-gray1 text-xl text-center font-bold">
            Generate Budget
          </h1>

          <div className="mt-8 space-y-6 w-full">
            <div className="relative ">
              <input
                type="text"
                className="bg-[#F5F5F5] px-4 py-5 rounded-lg w-full text-sm"
                placeholder="Monthly Income"
                value={income}
                onChange={(e) => {
                  const value = e.target.value;
                  const numericValue = value.replace(/[^0-9]/g, "");
                  setIncome(numericValue);
                }}
                required
              />
              {income && (
                <span className="absolute bg-[#F5F5F5] pointer-events-none left-4 top-1/2 -translate-y-1/2 py-3 text-sm min-w-[30px]">
                  {formatOnly(+income)}
                </span>
              )}
              <span className="absolute z-10 right-3 top-1/2 -translate-y-1/2">
                <ChangeCurrencyDropdown input />
              </span>
            </div>
            <div>
              <div className="relative ">
                <input
                  type="text"
                  className="bg-[#F5F5F5] px-4 py-5 rounded-lg w-full text-sm"
                  placeholder="Annual Rent"
                  value={rent}
                  onChange={(e) => {
                    const value = e.target.value;
                    const numericValue = value.replace(/[^0-9]/g, "");
                    setRent(numericValue);
                  }}
                  required
                />
                {rent && (
                  <span className="absolute bg-[#F5F5F5] pointer-events-none left-4 top-1/2 -translate-y-1/2 py-3 text-sm min-w-[30px]">
                    {formatOnly(+rent)}
                  </span>
                )}
              </div>
              <span className="text-sm text-gray2 block mt-1">
                Leave blank if you don&apos;t pay rent
              </span>
            </div>

            <div>
              <h2 className="text-gray1 font-semibold">Gender?</h2>
              <p className="mt-1 text-gray2 text-sm">
                We use gender to personalize our budget recommendation for you.
              </p>
              <div className="mt-4 flex gap-6">
                <div className="flex gap-2 items-center text-sm">
                  <input
                    type="radio"
                    name="gender"
                    id="male"
                    checked={gender === "male"}
                    onChange={(e) => setGender("male")}
                  />
                  <label htmlFor="male">Male</label>
                </div>
                <div className="flex gap-2 items-center text-sm">
                  <input
                    type="radio"
                    name="gender"
                    id="female"
                    checked={gender === "female"}
                    onChange={(e) => setGender("female")}
                  />
                  <label htmlFor="female">Female</label>
                </div>
              </div>
            </div>

            <div>
              <h2 className="text-gray1 font-semibold">Marital Status?</h2>
              <div className="mt-2 flex gap-6">
                <div className="flex gap-2 items-center text-sm">
                  <input
                    type="radio"
                    name="status"
                    id="married"
                    checked={status === "married"}
                    onChange={(e) => setStatus("married")}
                  />
                  <label htmlFor="married">Married</label>
                </div>
                <div className="flex gap-2 items-center text-sm">
                  <input
                    type="radio"
                    name="status"
                    id="single"
                    checked={status === "single"}
                    onChange={(e) => setStatus("single")}
                  />
                  <label htmlFor="single">Single</label>
                </div>
              </div>
            </div>

            <div>
              <h2 className="text-gray1 font-semibold">Mode of transport</h2>
              <div className="mt-2 flex gap-6">
                <div className="flex gap-2 items-center text-sm">
                  <input
                    type="radio"
                    name="transport"
                    id="private car"
                    checked={transport === "private car"}
                    onChange={(e) => setTransport("private car")}
                  />
                  <label htmlFor="private car">Private Car</label>
                </div>
                <div className="flex gap-2 items-center text-sm">
                  <input
                    type="radio"
                    name="transport"
                    id="public transport"
                    checked={transport === "public transport"}
                    onChange={(e) => setTransport("public transport")}
                  />
                  <label htmlFor="public transport">Public Transport</label>
                </div>
              </div>
            </div>

            <div>
              <button
                onClick={handleGenerate}
                disabled={!(income && gender && status && transport)}
                className="w-full py-5 rounded-lg bg-primary font-bold text-center text-white mt-6 transition-colors duration-300 disabled:bg-gray3"
              >
                Generate
              </button>
            </div>
          </div>
        </div>
      </div>

      <LoadingModal
        openModal={openLoadingModal}
        setOpenModal={setOpenLoadingModal}
        setOpenNextModal={setOpenChooseBudgetModal}
      />
      <ChooseBudgetModal
        openModal={openChooseBudgetModal}
        setOpenModal={setOpenChooseBudgetModal}
        setOpenNextModal={setOpenBudgetOverviewModal}
      />
      <BudgetOverviewModal
        openModal={openBudgetOverviewModal}
        setOpenModal={setOpenBudgetOverviewModal}
        setOpenPrevModal={setOpenChooseBudgetModal}
      />
    </div>
  );
};

const NigeriaIcon = () => (
  <svg
    width="52"
    height="20"
    viewBox="0 0 52 20"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <g clip-path="url(#clip0_18_505)">
      <path
        d="M2.5 9.99999C2.5 13.275 4.6 16.05 7.5 17.075V2.92499C4.6 3.94999 2.5 6.72499 2.5 9.99999ZM17.5 9.99999C17.5 6.72499 15.425 3.94999 12.5 2.92499V17.075C15.425 16.05 17.5 13.275 17.5 9.99999Z"
        fill="#83BF4F"
      />
      <path
        d="M7.5 17.075C8.275 17.35 9.125 17.5 10 17.5C10.875 17.5 11.725 17.35 12.5 17.075V2.925C11.725 2.65 10.875 2.5 10 2.5C9.125 2.5 8.275 2.65 7.5 2.925V17.075Z"
        fill="#F9F9F9"
      />
    </g>
    <path
      d="M24.84 15V6.36H25.92L30.426 13.11V6.36H31.506V15H30.426L25.92 8.244V15H24.84ZM36.6818 15.18C36.0898 15.18 35.5498 15.076 35.0618 14.868C34.5738 14.66 34.1538 14.362 33.8018 13.974C33.4498 13.582 33.1778 13.11 32.9858 12.558C32.7978 12.002 32.7038 11.376 32.7038 10.68C32.7038 9.76 32.8678 8.964 33.1958 8.292C33.5238 7.62 33.9858 7.102 34.5818 6.738C35.1778 6.37 35.8778 6.186 36.6818 6.186C37.6498 6.186 38.4298 6.412 39.0218 6.864C39.6138 7.312 40.0218 7.926 40.2458 8.706L39.1658 8.928C38.9858 8.404 38.6898 7.986 38.2778 7.674C37.8658 7.362 37.3518 7.206 36.7358 7.206C36.0918 7.202 35.5558 7.346 35.1278 7.638C34.7038 7.926 34.3838 8.332 34.1678 8.856C33.9518 9.38 33.8418 9.988 33.8378 10.68C33.8338 11.368 33.9398 11.972 34.1558 12.492C34.3718 13.012 34.6938 13.42 35.1218 13.716C35.5538 14.008 36.0918 14.156 36.7358 14.16C37.2918 14.164 37.7598 14.058 38.1398 13.842C38.5198 13.626 38.8138 13.314 39.0218 12.906C39.2298 12.498 39.3558 12.008 39.3997 11.436H37.5638V10.554H40.5278C40.5398 10.634 40.5458 10.73 40.5458 10.842C40.5498 10.95 40.5518 11.024 40.5518 11.064C40.5518 11.852 40.4038 12.558 40.1078 13.182C39.8158 13.802 39.3818 14.29 38.8058 14.646C38.2338 15.002 37.5258 15.18 36.6818 15.18ZM41.7502 15V6.36H42.8302L47.3362 13.11V6.36H48.4162V15H47.3362L42.8302 8.244V15H41.7502Z"
      fill="#353B41"
    />
    <defs>
      <clipPath id="clip0_18_505">
        <rect width="16" height="16" fill="white" transform="translate(2 2)" />
      </clipPath>
    </defs>
  </svg>
);

export default Page;
