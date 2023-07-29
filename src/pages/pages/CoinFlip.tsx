import React, { useCallback, useEffect, useState } from "react";

import CoinFlipComponent from "../componnents/CoinFlipComponent";
import CustomBackground from "../componnents/CustomBackground";
import OfficialLink from "../componnents/OfficialLink";
import Leaderboard from "../componnents/Leaderboard";
import useBackgroundImage from "@/hooks/useBackgroundImage";
import HistoryItem from "../componnents/HistoryItem";
import BalanceFlip from "../componnents/BalanceFlip";
import { useCoinFlipGame } from "@/hooks/useCoinFlipGame";
import History from "../componnents/History";
import { getAllTransactions, getUserPoolState } from "@/contexts/transactions";
import { useWallet } from "@solana/wallet-adapter-react";
import { LAMPORTS_PER_SOL, PublicKey } from "@solana/web3.js";
import { HistoryData, PROGRAM_ID } from "@/contexts/type";

const CoinFlip: React.FC = () => {
  const [history, setHistory] = useState([]);
  const { backgroundImage, changeBackground } = useBackgroundImage(
    "/background/FlayingCity.png"
  );

  const wallet = useWallet();
  const {
    handlePlay,
    isEnd,
    setAmount,
    setIsBet,
    solBalance,
    betLoading,
    isBet,
    amount,
    userLoading,
    isWon,
    isProgress,
    isFlipping,
    isDepositing,
    claimLoading,
    userFunds,
    handlePlayAgain,
    handleClaim,
  } = useCoinFlipGame();

  const getHistory = useCallback(async () => {
    const allTx: any = await getAllTransactions(new PublicKey(PROGRAM_ID));
    setHistory(allTx);
  }, []);

  useEffect(() => {
    getHistory();
  }, [solBalance, wallet.connected]);

  return (
    <div
      className="min-h-screen w-screen  bg-cover object-cover flex items-center justify-center"
      style={{ backgroundImage: `url(${backgroundImage})` }}
    >
      <div className=" w-auto h-auto mt-[120px] md:mt-[90px] mb-2 ">
        <div className=" grid grid-rows-3 grid-flow-col gap-4">
          <div className=" row-start-1 row-end-4">
            <History history={history} />
          </div>
          <div className="row-start-1 row-end-4 ">
            <CoinFlipComponent
              handlePlay={handlePlay}
              isEnd={isEnd}
              setAmount={setAmount}
              setIsBet={setIsBet}
              solBalance={solBalance}
              betLoading={betLoading}
              isBet={isBet}
              amount={amount}
              userLoading={userLoading}
              isWon={isWon}
              isProgress={isProgress}
              isFlipping={isFlipping}
              isDepositing={isDepositing}
              handlePlayAgain={handlePlayAgain}
            />
          </div>
          <div className="">
            <BalanceFlip
              userFunds={userFunds}
              claimLoading={claimLoading}
              handleClaim={handleClaim}
              userLoading={userLoading}
              solBalance={solBalance}
            />
          </div>
          <div className="">
            <CustomBackground changeBackground={changeBackground} />
          </div>
          <div className=" ">
            <OfficialLink />
          </div>
        </div>
      </div>
    </div>
  );
};

export default CoinFlip;
