import useUserStore from "@/store/user";
import { option1, option2, option3, option4 } from "@/utils/data";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";

const Page = () => {
  return (
    <div className="py-24">
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
    </div>
  );
};

export default Page;
