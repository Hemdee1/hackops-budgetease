import AuthHeader from "@/components/authHeader";
import useOnboardStore from "@/store/onboard";
import useUserStore from "@/store/user";
import { API } from "@/utils/api";
import Link from "next/link";
import { useRouter } from "next/router";
import { FormEvent, useState } from "react";

const Page = () => {
  const route = useRouter();
  const { email, setEmail } = useOnboardStore();
  const { user, setUser } = useUserStore();
  const [password, setPassword] = useState("");

  const [showPassword, setShowPassword] = useState(false);

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    setError("");
    setLoading(true);

    const res = await API.post("/user/login", {
      email,
      password,
    });

    if (res.data) {
      setUser(res.data);
      if (res.data.budget) {
        route.push("/dashboard");
      } else {
        route.push("/generate");
      }
    } else {
      console.log(res?.error);
      if (typeof res?.error === "string") {
        setError(res?.error);
      }

      if (res?.error === "Email is not verified!") {
        route.push("/create/email");
      }
    }
    setLoading(false);
  };

  return (
    <div className="py-24">
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
            <p className="text-red text-center">{error}</p>
            <button
              disabled={loading}
              className="w-full py-5 rounded-lg bg-primary font-bold text-center text-white mt-6"
            >
              {loading ? <span className="loader-small" /> : "Log In"}
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
