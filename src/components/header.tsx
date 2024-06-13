import Logo from "@/icons/logo";
import Link from "next/link";
import { useRouter } from "next/router";

const Header = () => {
  const router = useRouter();

  const homepage = router.pathname === "/";

  return (
    <header
      className={`border-gray4 w-full  fixed left-0 top-0 z-20 ${
        homepage ? "bg-[#F1F6FF] border-none" : "bg-white border-b"
      }`}
    >
      <div className="w-fullscreen max-w-full mx-auto px-20 py-5 flex justify-between items-center">
        <Link href="/">
          <Logo />
        </Link>

        <div className="flex items-center gap-6">
          <Link href="/login" className="text-primary font-bold">
            Log in
          </Link>
          <Link
            href="/create"
            className="bg-primary text-white p-4 rounded-lg font-semibold"
          >
            Create free account
          </Link>
        </div>
      </div>
    </header>
  );
};

const FlashIcon = () => (
  <svg
    width="13"
    height="22"
    viewBox="0 0 13 22"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path
      d="M5.7998 14H0.799805L7.7998 0V8H12.7998L5.7998 22V14Z"
      fill="#0257EF"
    />
  </svg>
);

const FlameIcon = () => (
  <svg
    width="15"
    height="18"
    viewBox="0 0 15 18"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path
      d="M13.3598 8.2C13.1298 7.9 12.8498 7.64 12.5898 7.38C11.9198 6.78 11.1598 6.35 10.5198 5.72C9.02976 4.26 8.69976 1.85 9.64976 0C8.69976 0.23 7.86976 0.75 7.15976 1.32C4.56976 3.4 3.54976 7.07 4.76976 10.22C4.80976 10.32 4.84976 10.42 4.84976 10.55C4.84976 10.77 4.69976 10.97 4.49976 11.05C4.26976 11.15 4.02976 11.09 3.83976 10.93C3.783 10.8825 3.73553 10.8248 3.69976 10.76C2.56976 9.33 2.38976 7.28 3.14976 5.64C1.47976 7 0.569757 9.3 0.699757 11.47C0.759757 11.97 0.819757 12.47 0.989757 12.97C1.12976 13.57 1.39976 14.17 1.69976 14.7C2.77976 16.43 4.64976 17.67 6.65976 17.92C8.79976 18.19 11.0898 17.8 12.7298 16.32C14.5598 14.66 15.1998 12 14.2598 9.72L14.1298 9.46C13.9198 9 13.3598 8.2 13.3598 8.2ZM10.1998 14.5C9.91976 14.74 9.45976 15 9.09976 15.1C7.97976 15.5 6.85976 14.94 6.19976 14.28C7.38976 14 8.09976 13.12 8.30976 12.23C8.47976 11.43 8.15976 10.77 8.02976 10C7.90976 9.26 7.92976 8.63 8.19976 7.94C8.38976 8.32 8.58976 8.7 8.82976 9C9.59976 10 10.8098 10.44 11.0698 11.8C11.1098 11.94 11.1298 12.08 11.1298 12.23C11.1598 13.05 10.7998 13.95 10.1998 14.5Z"
      fill="#E50909"
    />
  </svg>
);

const UserIcon = () => (
  <svg
    width="48"
    height="48"
    viewBox="0 0 48 48"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <circle cx="24" cy="24" r="24" fill="#EDF3FF" />
    <path
      d="M24 22C26.2091 22 28 20.2091 28 18C28 15.7909 26.2091 14 24 14C21.7909 14 20 15.7909 20 18C20 20.2091 21.7909 22 24 22Z"
      fill="#0257EF"
    />
    <path
      opacity="0.5"
      d="M32 29.5C32 31.985 32 34 24 34C16 34 16 31.985 16 29.5C16 27.015 19.582 25 24 25C28.418 25 32 27.015 32 29.5Z"
      fill="#0257EF"
    />
  </svg>
);

export default Header;
