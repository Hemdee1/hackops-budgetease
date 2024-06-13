import Header from "@/components/header";
import Image from "next/image";

import Link from "next/link";

export default function Home() {
  return (
    <main className="bg-[#F1F6FF]">
      <Header />
      <div className="w-fullscreen max-w-full mx-auto h-screen flex justify-between items-center gap-10 px-20 pt-16">
        <div className="text-[#092256] w-[478px] max-w-full space-y-8">
          <h1 className="font-extrabold text-[48px] leading-[48px]">
            Fastest way to track your expenses
          </h1>
          <p className="font-medium">
            Get AI - generated categories and allocate x% of your monthly income
            to achieve your financial goals.
          </p>

          <Link
            href="/create"
            className="bg-primary inline-block text-white p-4 rounded-lg font-semibold"
          >
            Create free account
          </Link>
        </div>
        <Image
          src="/images/hero2.png"
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
