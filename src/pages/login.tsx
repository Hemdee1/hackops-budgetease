import AuthHeader from "@/components/authHeader";
import Link from "next/link";
import { useRouter } from "next/router";
import { FormEvent, useState } from "react";

const Page = () => {
  const [password, setPassword] = useState("");
  const [email, setEmail] = useState("");

  const [showPassword, setShowPassword] = useState(false);

  const handleSubmit = () => {};

  return (
    <div className="py-24 bg-white text-black">
      <AuthHeader />

      <div className="w-[600px] mt-20 max-w-full mx-auto border-gray4 border  rounded-3xl px-5 sm:px-10 py-8">
        <h2 className="text-2xl font-bold">Welcome back 👋</h2>
        <form onSubmit={handleSubmit} className="mt-8 space-y-6">
          <input
            type="email"
            className="bg-[#F5F5F5] px-4 py-5 rounded-lg w-full text-sm"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
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
              type="button"
              onClick={() => setShowPassword((prev) => !prev)}
              className="text-[#7E7E7E] text-sm font-medium absolute right-4 top-1/2 -mt-2.5"
            >
              {showPassword ? "Hide" : "Show"}
            </button>
          </div>

          <Link
            href="/create/forget-password"
            className="text-sm text-primary font-semibold block"
          >
            Forget password?
          </Link>

          <div>
            <button className="w-full py-5 rounded-lg bg-primary font-bold text-center text-white mt-6">
              Log In
            </button>
          </div>
          <p className="text-sm text-center font-medium">
            Don&apos;t have an account?{" "}
            <Link href="/create" className="text-primary">
              Sign up
            </Link>
          </p>
        </form>
      </div>
    </div>
  );
};

export default Page;
