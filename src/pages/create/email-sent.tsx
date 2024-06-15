import AuthHeader from "@/components/authHeader";
import MailIcon from "@/icons/mailIcon";
import useOnboardStore from "@/store/onboard";

const Page = () => {
  const { email } = useOnboardStore();

  return (
    <div className="py-24">
      <AuthHeader />

      <div className="w-[600px] space-y-10 mt-20 max-w-full mx-auto border-gray4 border  rounded-3xl px-5 sm:px-10 py-20">
        <div className="flex justify-center items-center">
          <MailIcon />
        </div>

        <h2 className="text-2xl font-medium text-center">
          Check your mail or spam mail
        </h2>
        <p className="text-gray1 w-[360px] text-center max-w-full mx-auto">
          We’ve sent email to {email}. Click on the button in the mail to reset
          your password. If it’s not in your inbox, it may be in your spam or
          junk folder.
        </p>
      </div>
    </div>
  );
};

export default Page;
