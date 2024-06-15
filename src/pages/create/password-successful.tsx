import AuthHeader from "@/components/authHeader";
import MarkIcon from "@/icons/markIcon";
import Link from "next/link";

const Page = () => {
  return (
    <div className="py-24">
      <AuthHeader />

      <div className="w-[600px] mt-20 max-w-full mx-auto border-gray4 border  rounded-3xl px-5 sm:px-10 py-20">
        <div className="flex flex-col gap-10 items-center">
          <MarkIcon />
          <h2 className="font-medium text-center">
            Password Reset succesfully
          </h2>

          <Link href="/login" className="text-primary font-bold text-xl">
            Login
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Page;
