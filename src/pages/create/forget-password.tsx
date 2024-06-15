import AuthHeader from "@/components/authHeader";
import useOnboardStore from "@/store/onboard";
import useUserStore from "@/store/user";
import { API } from "@/utils/api";
import Link from "next/link";
import { useRouter } from "next/router";
import { FormEvent, useState } from "react";

const Page = () => {
  const router = useRouter();
  const { email, setEmail } = useOnboardStore();
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    setError("");
    setLoading(true);

    const res = await API.post("/user/send-password-link", { email });
    if (res.data) {
      router.push("/create/email-sent");
    } else {
      console.log(res.error);

      setError("Incorrect credential");
    }
    setLoading(false);
  };

  return (
    <div className="py-24">
      <AuthHeader />

      <div className="w-[600px] mt-20 max-w-full mx-auto border-gray4 border  rounded-3xl px-5 sm:px-10 py-8">
        <h2 className="text-2xl font-bold">Forget password 🤔</h2>
        <form onSubmit={handleSubmit} className="mt-8 space-y-6">
          <input
            type="email"
            className="bg-[#F5F5F5] px-4 py-5 rounded-lg w-full text-sm"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />

          <p className="text-red text-center">{error}</p>

          <div>
            <button
              disabled={loading}
              className="w-full py-5 rounded-lg bg-primary font-bold text-center text-white mt-6"
            >
              {loading ? (
                <span className="loader-small" />
              ) : (
                "Send password reset link"
              )}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Page;
