import Image from "next/image";
import Header from "@/components/header";
import useUserStore from "@/store/user";
import Link from "next/link";

export default function Home() {
  const { user } = useUserStore();

  return (
    <main className="bg-[#F1F6FF]">
      <div className="w-fullscreen max-w-full mx-auto h-screen flex justify-between items-center gap-10 px-20 pt-16">
        <Header />
        <div className="text-[#092256] w-[478px] max-w-full space-y-8">
          {/* <h1 className="font-extrabold text-[48px] leading-[48px]">
            Fastest way to track your expenses
          </h1> */}
          <h1 className="font-extrabold text-[80px] leading-[80px]">
            Track your{" "}
            <span className="text-primary block italic">expenses</span>
          </h1>
          <p className="font-medium">
            Get AI - generated categories and allocate x% of your monthly income
            to achieve your financial goals.
          </p>
          {user ? (
            <Link
              href="/dashboard"
              className="bg-primary inline-block text-white p-4 rounded-lg font-semibold"
            >
              Go to Dashboard
            </Link>
          ) : (
            <Link
              href="/create"
              className="bg-primary inline-block text-white p-4 rounded-lg font-semibold"
            >
              Create free account
            </Link>
          )}
        </div>
        <Image
          src="/images/hero3.png"
          alt="hero image"
          width={0}
          height={0}
          sizes="100vw"
          className="w-[600px] h-auto"
        />
      </div>
    </main>
  );
}
