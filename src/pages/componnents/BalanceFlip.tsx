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
    <div className="w-[350px] h-[200px] md:w-[360px] md:h-[200px] bg-[#292A2D]  bg-opacity-95 border-4 border-black shadow p-2 rounded-2xl">
      <h1 className=" font-bold text-2xl text-white">Steam Bank :</h1>
      <h1 className="text-center text-2xl font-bold text-[#7C612E]">
        Balance: {props.userLoading ? "--" : props.solBalance.toLocaleString()}{" "}
        SOL
      </h1>
      <h1 className="text-center text-2xl font-bold text-[#7C612E]">
        Funds: {props.userLoading ? "--" : props.userFunds.toLocaleString()} SOL
      </h1>
      <div className=" flex justify-evenly items-center text-center space-x-2 m-2 ">
        <button
          className="bg-[#756394] hover:bg-[#F3CE49] h-[60px] w-[250px] rounded-lg p-1 font-bold hover:scale-105"
          disabled={props.claimLoading}
          onClick={() => props.handleClaim()}
        >
          {!props.claimLoading ? "Withdraw!" : "CLAIMING..."}
          {props.claimLoading && <MiniLoading />}
        </button>
      </div>
    </div>
  );
}
