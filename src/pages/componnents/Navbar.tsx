import useText from "@/hooks/useText";
import dynamic from "next/dynamic";
import Image from "next/image";
import Link from "next/link";
import React from "react";

export default function Navbar() {
  const currentText = useText();
  const WalletMultiButtonDynamic = dynamic(
    async () =>
      (await import("@solana/wallet-adapter-react-ui")).WalletMultiButton,
    { ssr: false }
  );

  return (
    <div className=" absolute w-screen p-4 flex justify-between items-center">
      <div className=" md:flex items-center box-border space-x-4 ">
        <Link href="https://steamland.xyz" rel="noreferrer">
          <Image src="/icon/Profile.png" alt="Profile" width={90} height={80} />
        </Link>
        <div className=" hidden md:flex items-center bg-white rounded-[15px] p-3 font-bold shadow-lg ml-2 border-[3px] border-[#5d4418]">
          <h1 className=" text-sm text-primary">{currentText}</h1>
        </div>
      </div>

      <div className="wallet hover:scale-110 transition-transform cursor-pointer">
        <WalletMultiButtonDynamic style={{ height: "42px" }} />
      </div>
    </div>
  );
}
