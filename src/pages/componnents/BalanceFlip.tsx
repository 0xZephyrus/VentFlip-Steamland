import React, { useEffect, useState } from "react";
import { useWallet } from "@solana/wallet-adapter-react";
import { MiniLoading } from "./PageLoading";
import { useCoinFlipGame } from "@/hooks/useCoinFlipGame";

export default function CoinFlipComponent(props: {userFunds: Number, handleClaim: Function, claimLoading: boolean, userLoading: boolean}) {
  const wallet = useWallet();

  return (
    <>
      {wallet.publicKey && (
        <div className="w-[350px] h-[100px] md:w-[360px] md:h-[100px] bg-[#292A2D]  bg-opacity-95 border-4 border-black shadow p-2 rounded-2xl">
          <h1 className=" font-bold text-2xl text-white">
            {!props.claimLoading ? "PLAYER FUNDS" : "CLAIMING..."}&nbsp; : &nbsp;
            {props.userLoading ? "--" : props.userFunds.toLocaleString()}
            <span>&nbsp;SOL</span>
          </h1>

          <div className=" flex justify-evenly items-center text-center space-x-2 m-2 ">
            <button
              className="bg-[#756394] hover:bg-[#F3CE49] h-8 w-40 rounded-lg p-1 font-bold hover:scale-105"
              disabled={props.claimLoading}
              onClick={() => props.handleClaim()}
            >
              WITHDRAW
              {props.claimLoading && <MiniLoading />}
            </button>
          </div>
        </div>
      )}
    </>
  );
}
