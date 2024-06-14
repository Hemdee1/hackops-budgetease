import AuthHeader from "@/components/authHeader";
import Logo from "@/icons/logo";
import useOnboardStore from "@/store/onboard";
import { API } from "@/utils/api";
import Link from "next/link";
import { useRouter } from "next/router";
import { useState } from "react";

const Page = () => {
  return (
    <div className="py-24">
      <AuthHeader />

      <div className="w-[600px] mt-20 max-w-full mx-auto border-gray4 border  rounded-3xl px-5 sm:px-10 py-8">
        <div>
          {/* <div className="h-1 w-full bg-gray3 rounded-full">
            <span className="h-full w-1/2 bg-primary block rounded-full"></span>
          </div>
          <span className="mt-5 block text-gray2">Step 1 of 2</span> */}
          <h1 className="text-gray1 text-xl text-center font-bold">
            Create an account
          </h1>

          <div className="mt-8 space-y-6 w-full">
            <div className="flex gap-6">
              <input
                type="text"
                className="bg-[#F5F5F5] px-4 py-5 rounded-lg w-full text-sm"
                placeholder="First Name"
                value={firstName}
                onChange={(e) => setFirstName(e.target.value)}
                required
              />
              <input
                type="text"
                className="bg-[#F5F5F5] px-4 py-5 rounded-lg w-full text-sm"
                placeholder="Last Name"
                value={lastName}
                onChange={(e) => setLastName(e.target.value)}
                required
              />
            </div>
            <input
              type="email"
              className="bg-[#F5F5F5] px-4 py-5 rounded-lg w-full text-sm"
              placeholder="Email address"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
            {/* <div className="relative">
              <label
                htmlFor="password"
                className="absolute text-gray1 left-3 top-1/2 -translate-y-1/2 group-focus-within:top-4 transition-all duration-300"
              >
                Password
              </label>
              <input
                id="password"
                type={showPassword ? "text" : "password"}
                className="bg-[#F5F5F5] px-4 pt-8 pb-3 rounded-lg w-full text-sm"
                // placeholder="Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
            </div> */}
            <div className="relative">
              <input
                type={showPassword ? "text" : "password"}
                className="bg-[#F5F5F5] px-4 py-5 rounded-lg w-full text-sm"
                placeholder="Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
              <button
                onClick={() => setShowPassword((prev) => !prev)}
                className="text-[#7E7E7E] text-sm font-medium absolute right-4 top-1/2 -mt-2.5"
              >
                {showPassword ? "Hide" : "Show"}
              </button>
            </div>
            <div className="relative">
              <input
                type={showConfirmPassword ? "text" : "password"}
                className="bg-[#F5F5F5] px-4 py-5 rounded-lg w-full text-sm"
                placeholder="Confirm Password"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                required
              />
              <button
                onClick={() => setShowConfirmPassword((prev) => !prev)}
                className="text-[#7E7E7E] text-sm font-medium absolute right-4 top-1/2 -mt-2.5"
              >
                {showConfirmPassword ? "Hide" : "Show"}
              </button>
            </div>

            <p className="text-red text-center">{error}</p>

            <div>
              <button
                onClick={handleClick}
                disabled={
                  !(
                    !loading &&
                    emailValidate &&
                    firstName &&
                    lastName &&
                    password &&
                    password === confirmPassword
                  )
                }
                className="w-full py-5 rounded-lg bg-primary font-bold text-center text-white mt-6 transition-colors duration-300 disabled:bg-gray3"
              >
                {loading ? (
                  <span className="loader-small" />
                ) : (
                  "Create an account"
                )}
              </button>
            </div>
            <p className="text-sm text-center font-medium">
              Already have an account?{" "}
              <Link href="/login" className="text-primary">
                Log in
              </Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Page;
