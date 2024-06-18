import Alert from "@/components/alert";
import AuthHeader from "@/components/authHeader";
import DesktopIcon from "@/icons/desktop";
import useUserStore from "@/store/user";
import "@/styles/globals.css";
import { API } from "@/utils/api";
import type { AppProps } from "next/app";
import { useEffect, useState } from "react";

export default function App({ Component, pageProps }: AppProps) {
  const { user, setUser } = useUserStore();
  const [isSmallScreen, setIsSmallScreen] = useState(false);

  useEffect(() => {
    let browserWidth = window.innerWidth;

    if (browserWidth < 1200) {
      return setIsSmallScreen(true);
    }

    const autoLogin = async () => {
      const res = await API.get("/user/autologin");

      if (res.data) {
        setUser(res.data);
      } else {
        setUser(undefined);
        console.log(res.error);
      }
    };

    autoLogin();
  }, [setUser]);

  return isSmallScreen ? (
    <>
      <AuthHeader />
      <div className="h-[90vh] text-center px-10 flex justify-center items-center flex-col gap-3">
        <DesktopIcon />
        <h1 className="font-bold text-xl">Optimized for Desktop</h1>
        <h4 className="px-3">
          Kindly open on laptops and big screens to view the product
        </h4>
      </div>
    </>
  ) : (
    <>
      <Alert />
      <Component {...pageProps} />
    </>
  );
}
