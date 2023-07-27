import React from "react";
import { WalletContextState } from "@solana/wallet-adapter-react";
import { MiniLoading } from "./PageLoading";

interface BalanceFlipProps {
  balance: number;
  userFunds: number;
  handleClaim: Function;
  wallet: WalletContextState;
  isClaiming: boolean;
  userLoading: boolean;
}

const BalanceFlip: React.FC<BalanceFlipProps> = ({
  userFunds,
  balance,
  userLoading,
  isClaiming,
  handleClaim,
  wallet,
}) => {
  return (
    <div className="w-[350px] h-[100px] md:w-[360px] md:h-[100px] bg-[#292A2D]  bg-opacity-95 border-4 border-black shadow p-2 rounded-2xl">
      {/* {wallet.publicKey && ( */}
      <>
        <h1 className=" font-bold text-2xl text-white">
          {/* {!isClaiming ? "PLAYER FUNDS" : "CLAIMING..."} : */} PLAYER FUNDS
          : {/* {userLoading ? "--" : userFunds.toLocaleString()} */} 1123
          <span>&nbsp;SOL</span>
        </h1>

        <div className=" flex justify-evenly items-center text-center space-x-2 m-2 ">
          <button
            className="bg-[#756394] hover:bg-[#F3CE49] h-8 w-40 rounded-lg p-1 font-bold hover:scale-105"
            //   disabled={isClaiming}
            //   onClick={() => handleClaim()}
          >
            WITHDRAW
            {/* {isClaiming && <MiniLoading />} */}
          </button>
        </div>
      </>
      {/* )} */}
    </div>
  );
};

export default BalanceFlip;
