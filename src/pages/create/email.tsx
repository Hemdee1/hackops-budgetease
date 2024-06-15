import AuthHeader from "@/components/authHeader";
import MailIcon from "@/icons/mailIcon";
import useOnboardStore from "@/store/onboard";
import Image from "next/image";

const Page = () => {
  const { email } = useOnboardStore();

  return (
    <div className="py-24">
      <AuthHeader />

      <div className="w-[600px] space-y-10 mt-20 max-w-full mx-auto border-gray4 border  rounded-3xl px-5 sm:px-10 py-20">
        <div className="flex justify-center items-center">
          {/* <MailIcon /> */}
          <Image
            src="/images/email.svg"
            alt="email template"
            width={0}
            height={0}
            sizes="100vw"
            className="h-auto w-[450px]"
          />
        </div>

        <h2 className="text-2xl font-semibold text-center">
          Check your mail or spam mail
        </h2>
        <p className="text-gray1 font-medium w-[360px] text-center max-w-full mx-auto">
          {/* We’ve sent email to {email}. Click on the button in the mail to verify
          your email address. If it’s not in your inbox, it may be in your spam
          or junk folder. */}
          We’ve sent an email to <strong>{email}</strong>. Please mark the email
          as {'"not spam"'} and click on the {'"Verify"'} button within the
          email to confirm your email address.
        </p>
      </div>
    </div>
  );
};

export default Page;
