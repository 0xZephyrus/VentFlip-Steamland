import React, { useState } from "react";
import PageLoading, { MiniLoading } from "../../componnents/PageLoading";

type CoinFlipButtonProps = {
  betLoading: boolean;
  userLoading: boolean;
  solBalance: number;
  amount: number;
  handlePlay: () => void;
};

const CoinFlipButton: React.FC<CoinFlipButtonProps> = ({
  betLoading,
  userLoading,
  solBalance,
  amount,
  handlePlay,
}) => {
  return (
    <div className=" mb-4 flex justify-center">
      <button
        className={`${
          betLoading
            ? "bg-[#f3ce49]  text-black"
            : "bg-[#7c612e] text-white hover:text-black hover:bg-[#f3ce49] "
        } ${
          userLoading ? "loading" : ""
        }  w-[200px] h-[50px] border-1-[#604A23]  border hover:scale-105 rounded-[15px] mt-4 font-bold text-sm md:text-xl `}
        onClick={handlePlay}
        disabled={betLoading}
        title={solBalance <= amount + 0.002 ? "Not enough SOL" : ""}
      >
        {betLoading && <MiniLoading /> ? "Processing..." : "FLIP COIN"}
      </button>
    </div>
  );
};

export default CoinFlipButton;
