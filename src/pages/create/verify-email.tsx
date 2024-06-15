import AuthHeader from "@/components/authHeader";
import MarkIcon from "@/icons/markIcon";
import { API } from "@/utils/api";
import Link from "next/link";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";

const Page = () => {
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const route = useRouter();

  useEffect(() => {
    const token = route.query.token;
    if (!token) return;

    const verifyEmail = async () => {
      setLoading(true);

      const res = await API.post("/user/verify-email/" + token, {});

      if (res.data) {
        setSuccess(true);
      } else {
        setSuccess(false);
      }
      setLoading(false);
    };

    verifyEmail();
  }, [route]);

  return (
    <div className="py-24">
      <AuthHeader />

      <div className="w-[600px] mt-20 max-w-full mx-auto border-gray4 border  rounded-3xl px-5 sm:px-10 py-20">
        {success ? (
          <div className="flex flex-col gap-10 items-center">
            <MarkIcon />
            <h2 className="font-medium text-center">
              Email verified succesfully
            </h2>

            <Link href="/login" className="text-primary font-bold text-xl">
              Login
            </Link>
          </div>
        ) : (
          <div className="flex flex-col gap-10 items-center">
            <h2 className="font-medium text-center">
              The link is expired or invalid <br /> Login with your email to
              generate another link
            </h2>

            <Link href="/login" className="text-primary font-bold text-xl">
              Login
            </Link>
          </div>
        )}
      </div>
    </div>
  );
};

export default Page;
