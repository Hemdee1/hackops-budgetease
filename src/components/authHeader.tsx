import Logo from "@/icons/logo";
import Link from "next/link";

const AuthHeader = () => {
  return (
    <header className="border-b border-gray4 w-full  fixed left-0 top-0 bg-white z-20">
      <div className="w-fullscreen max-w-full mx-auto px-20 py-8">
        <Link href="/">
          <Logo />
        </Link>
      </div>
    </header>
  );
};

export default AuthHeader;
