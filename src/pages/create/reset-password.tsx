import AuthHeader from "@/components/authHeader";
import useOnboardStore from "@/store/onboard";
import useUserStore from "@/store/user";
import { API } from "@/utils/api";
import Link from "next/link";
import { useRouter } from "next/router";
import { FormEvent, useState } from "react";

const Page = () => {
  const router = useRouter();

  const { password, setPassword } = useOnboardStore();
  const [confirmPassword, setConfirmPassword] = useState("");

  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleClick = async () => {
    setError("");
    const token = router.query.token;

    if (!token) {
      return setError(
        "The link is expired or invalid, please generate another link"
      );
    }

    setLoading(true);

    const res = await API.post("/user/reset-password/" + token, { password });

    if (res.data) {
      router.push("/create/password-successful");
    } else {
      setError(res.error);
    }
    setLoading(false);
  };

  return (
    <div className="py-24">
      <AuthHeader />

      <div className="w-[600px] mt-20 max-w-full mx-auto border-gray4 border  rounded-3xl px-5 sm:px-10 py-8">
        <h2 className="text-2xl font-bold">Reset password 😀</h2>
        <div className="mt-8 space-y-6">
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
                !(password && confirmPassword && password === confirmPassword)
              }
              className="w-full py-5 rounded-lg bg-primary font-bold text-center text-white mt-6 transition-colors duration-300 disabled:bg-gray3"
            >
              {loading ? <span className="loader-small" /> : "Change password"}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Page;
