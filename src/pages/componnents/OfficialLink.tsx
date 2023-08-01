import React from "react";
import Link from "next/link";

export default function OfficialLink() {
  return (
    <div className="w-[360px] h-[100px] md:w-[380px] md:h-[100px] bg-[#292A2D]  bg-opacity-95 border-4 border-black shadow p-2 rounded-2xl">
      <h1 className="font-bold text-2xl text-white">Official Links</h1>
      <div className="flex justify-evenly items-center text-center space-x-2 m-2">
        <Link href="https://steamland.xyz/" target="b_blank">
          <button className="bg-[#756394] hover:bg-[#F3CE49] text-white hover:text-black h-8 w-[100px] rounded-lg p-1 font-bold hover:scale-105">
            Website
          </button>
        </Link>
        <Link
          href="https://discord.gg/steamland-986654523806318622"
          target="b_blank"
        >
          <button className="bg-[#756394] hover:bg-[#F3CE49] text-white hover:text-black h-8 w-[100px] rounded-lg p-1 font-bold hover:scale-105">
            Discord
          </button>
        </Link>
        <Link href="https://twitter.com/SteamlandNFT" target="b_blank">
          <button className="bg-[#756394] hover:bg-[#F3CE49] text-white hover:text-black h-8 w-[100px] rounded-lg p-1 font-bold hover:scale-105">
            Twitter
          </button>
        </Link>
      </div>
    </div>
  );
}
