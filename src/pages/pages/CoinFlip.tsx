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
        <div className=" grid grid-cols-1 md:grid-cols-3 gap-2 md:grid-row-3 md:gap-[20px] md:gap-y-1  ">
          <div className="md:col-start-1 md:row-start-1">
            {/* <Leaderboard /> */}
          </div>
          <div className="row-start-1 md:col-start-2">
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
          <div className="row-start- md:col-start-3 md:row-start-1">
            {/* <HistoryItem /> */}
            <History history={history} />
          </div>
          <div className="">
            <CustomBackground changeBackground={changeBackground} />
          </div>
          <div className="row-start-2 md:col-start-2">
            <BalanceFlip userFunds={userFunds} claimLoading={claimLoading} handleClaim={handleClaim} userLoading={userLoading} />
          </div>
          <div className=" col-start-1 md:col-start-3">
            <OfficialLink />
          </div>
        </div>
      </div>
    </div>
  );
};

export default CoinFlip;
