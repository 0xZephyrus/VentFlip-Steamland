import React, { useEffect, useState } from "react";
import { useWallet } from "@solana/wallet-adapter-react";
import { MiniLoading } from "./PageLoading";
import { useCoinFlipGame } from "@/hooks/useCoinFlipGame";
import Image from "next/image";

export default function CoinFlipComponent(props: {
  userFunds: Number;
  handleClaim: Function;
  claimLoading: boolean;
  userLoading: boolean;
  solBalance: number;
}) {
  const wallet = useWallet();

  return (
    <div className="w-[350px] h-[230px] md:w-[380px] md:h-[230px] bg-[#292A2D]  bg-opacity-95 border-4 border-black shadow p-2 rounded-2xl">
      <h1 className=" font-bold text-2xl text-white mb-1">Steam Bank :</h1>
      <div className=" grid grid-rows-1 grid-cols-1  gap-2 items-center justify-center text-center ">
        <div className="bg-[#756394]  h-[50px] w-[100px] rounded-lg text-[20px] text-white  font-bold justify-center  items-center flex ">
          Balance
        </div>
        <div className="bg-white  h-[50px] w-[250px] rounded-lg  text-2xl  font-bold justify-center  items-center flex gap-4 ">
          {props.userLoading ? "--" : props.solBalance.toLocaleString()}
          <Image
            src="/ventflip/draksol.png"
            height={20}
            width={20}
            priority
            alt="kado"
          />
        </div>
        <div className="bg-[#756394] h-[50px] w-[100px] rounded-lg text-[20px]  text-white font-bold justify-center  items-center flex">
          Funds
        </div>
        <div className="bg-white  h-[50px] w-[250px] rounded-lg text-2xl  font-bold justify-center  items-center flex gap-4 ">
          {props.userLoading ? "--" : props.userFunds.toLocaleString()}
          <Image
            src="/ventflip/draksol.png"
            height={20}
            width={20}
            priority
            alt="kado"
          />
        </div>
        <div className=" col-span-2  ">
          <button
            className="  bg-[#756394]  text-white  hover:text-black hover:bg-[#F3CE49] justify-center  items-center flex gap-4  text-3xl h-[55px] w-full rounded-lg font-bold "
            disabled={props.claimLoading}
            onClick={() => props.handleClaim()}
          >
            {!props.claimLoading ? "Withdraw!" : "Claiming..."}
            <Image
              src="/ventflip/kado.png"
              height={40}
              width={40}
              priority
              alt="kado"
            />
            {props.claimLoading && <MiniLoading />}
          </button>
        </div>
      </div>
    </div>
  );
}
