import { getAllTransactions } from "@/contexts/transactions";
import { HistoryData, PROGRAM_ID } from "@/contexts/type";
import { LAMPORTS_PER_SOL, PublicKey } from "@solana/web3.js";
import { useEffect, useState } from "react";
import HistoryItem from "./HistoryItem";

export default function History(props: { history: HistoryData[] }) {
  return (
    <div className="w-[360px] h-[600px] md:w-[360px] md:h-[600px] bg-[#292A2D] bg-opacity-95 border-4 border-black shadow p-2 rounded-2xl">
      <h1 className="font-bold text-3xl text-white">History:</h1>

      <div className="flex flex-row text-center">
        <div className="flex-1 py-2 text-lg font-medium text-white">Bet</div>
        <div className="flex-1 py-2 text-lg font-medium text-white">Result</div>
        <div className="flex-1 py-2 text-lg font-medium text-white">Status</div>
        <div className="flex-1 py-2 text-lg font-medium text-white">Time</div>
      </div>

      {props.history?.map((data, i) => {
        return (
          <HistoryItem
            key={i}
            signature={data.signature}
            userAddress={data.address}
            betAmount={data.bet_amount / LAMPORTS_PER_SOL}
            type={data.type}
            betTime={data.block_timestamp}
            win={data.win}
          />
        );
      })}
    </div>
  );
}
