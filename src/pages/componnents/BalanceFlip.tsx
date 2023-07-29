import React, { useEffect, useState } from "react";
import { useWallet } from "@solana/wallet-adapter-react";
import { MiniLoading } from "./PageLoading";
import { useCoinFlipGame } from "@/hooks/useCoinFlipGame";

export default function CoinFlipComponent(props: {
  userFunds: Number;
  handleClaim: Function;
  claimLoading: boolean;
  userLoading: boolean;
  solBalance: number;
}) {
  const wallet = useWallet();

  return (
    <div className="w-[380px] h-[230px] md:w-[380px] md:h-[230px] bg-[#292A2D]  bg-opacity-95 border-4 border-black shadow p-2 rounded-2xl">
      <h1 className=" font-bold text-2xl text-white">Steam Bank :</h1>
      <div className=" grid grid-rows-1 grid-cols-1  gap-2 items-center justify-center text-center ">
        <div className="bg-[#756394]  h-[50px] w-[100px] rounded-lg font-bold ">
          Balance
        </div>
        <div className="bg-white  h-[50px] w-[250px] rounded-lg  font-bold ">
          {props.userLoading ? "--" : props.solBalance.toLocaleString()} SOL
        </div>
        <div className="bg-[#756394] h-[50px] w-[100px] rounded-lg font-bold ">
          Funds
        </div>
        <div className="bg-white  h-[50px] w-[250px] rounded-lg font-bold ">
          {props.userLoading ? "--" : props.userFunds.toLocaleString()} SOL
        </div>
        <div className=" col-span-2  ">
          <button
            className="  bg-[#756394] hover:bg-[#F3CE49] text-2xl h-[55px] w-full rounded-lg font-bold hover:scale-105"
            disabled={props.claimLoading}
            onClick={() => props.handleClaim()}
          >
            {!props.claimLoading ? "Withdraw!" : "Claiming..."}
            {props.claimLoading && <MiniLoading />}
          </button>
        </div>
      </div>
    </div>
  );
}
