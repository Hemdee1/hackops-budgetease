import AuthHeader from "@/components/authHeader";
import MailIcon from "@/icons/mailIcon";
import useOnboardStore from "@/store/onboard";
import Image from "next/image";

const Page = () => {
  const { email } = useOnboardStore();

  return (
    <div className="py-24">
      <AuthHeader />

      <div className="w-[600px] mt-20 max-w-full mx-auto border-gray4 border  rounded-3xl px-5 sm:px-10 py-20">
        <div className="flex justify-center items-center">
          {/* <MailIcon /> */}
          <Image
            src="/images/email.svg"
            alt="email template"
            width={0}
            height={0}
            sizes="100vw"
            className="h-auto w-[400px]"
          />
        </div>

        <h2 className="text-2xl font-semibold mt-10">Check your mail</h2>

        <div className="text-gray1 font-medium mt-5 leading-loose">
          We’ve sent an email to <strong>{email}</strong>. Click on the button
          in the mail to verify your email address.
          <ul className="list-decimal ml-5">
            <li>Check your spam</li>
            <li>Move the email from your spam to primary inbox</li>
            <li>Without 1-2 the “Verify” button won’t work.</li>
          </ul>
          {/* We’ve sent email to {email}. Click on the button in the mail to verify
          your email address. If it’s not in your inbox, it may be in your spam
          or junk folder.
          
          We’ve sent an email to <strong>{email}</strong>. Please mark the email
          as {'"not spam"'} and click on the {'"Verify"'} button within the
          email to confirm your email address. */}
        </div>
      </div>
    </div>
  );
};

export default Page;
