import dynamic from "next/dynamic";
import React from "react";

export default function Navbar() {
  const WalletMultiButtonDynamic = dynamic(
    async () =>
      (await import("@solana/wallet-adapter-react-ui")).WalletMultiButton,
    { ssr: false }
  );

  return (
    <div className=" absolute w-screen p-5 flex justify-between items-center">
      <div className="bg-white uppercase font-bold text-blue-500 py-2 px-4 rounded">
        <a href="https://steamland.xyz" rel="noreferrer">
          <div className="logo">
            {/* eslint-disable-next-line */}

            <p>
              {"{STEAMLAND}"}
              <span>COIN</span>
            </p>
          </div>
        </a>
      </div>
      <WalletMultiButtonDynamic />
    </div>
  );
}
