"use client";

import React from "react";
import CoinSelection from "./coinflipcomponnent/CoinSelection";
import CoinBet from "./coinflipcomponnent/CoinBet";
import CoinFlipButton from "./coinflipcomponnent/CoinFlipButton";

import LoadingText from "./LoadingText";
import ProgressBar from "./ProgressBar";
import CoinImages from "./coinflipcomponnent/CoinImages";
import Coin from "./coinflipcomponnent/Coin";
import CoinFlipping from "./coinflipcomponnent/CoinFliping";
import ReactConfetti from "react-confetti";
import { useCoinFlipGame } from "@/hooks/useCoinFlipGame";

export default function CoinFlipComponent() {
  const {
    isEnd,
    setAmount,
    setIsBet,
    solBalance,
    handlePlay,
    betLoading,
    isBet,
    amount,
    userLoading,
    isWon,
    isProgress,
    isFlipping,
    isDepositing,
    handlePlayAgain,
  } = useCoinFlipGame();

  return (
    <div className="w-[360px] h-[600px] md:w-[360px] md:h-[600px] bg-white bg-opacity-95 border-4 border-black shadow p-2 rounded-3xl">
      {isEnd && (
        <div className="win-effect">
          {isWon && <ReactConfetti className="h-screen w-full" />}
        </div>
      )}
      {isProgress ? (
        <div className="flip-box-progress">
          {isFlipping ? (
            <CoinFlipping heads={isBet} />
          ) : (
            <>
              {isEnd ? (
                <Coin
                  isHead={isWon === isBet}
                  result={isWon || !isProgress}
                  className="coin-animation"
                />
              ) : (
                <Coin isHead={isBet} className="coin-animation" />
              )}
            </>
          )}
          {isEnd ? (
            <>
              {isWon ? (
                <>
                  <p className="result-text text-green-500">YOU WON</p>
                  <p className="result-value text-green-500">
                    {amount * 2} SOL
                  </p>
                </>
              ) : (
                <>
                  <p className="result-text text-red-500">YOU LOST</p>
                  <p className="result-value text-red-500">{amount} SOL</p>
                </>
              )}

              <ProgressBar
                isEnd={isEnd}
                isFetched={!userLoading}
                handlePlayAgain={handlePlayAgain}
                isWon={isWon}
              />
            </>
          ) : (
            <>
              {isDepositing && !isFlipping && (
                <LoadingText
                  text="waiting for deposit..."
                  className="waiting"
                />
              )}
              {isFlipping && (
                <LoadingText text="Flipping..." className="waiting" />
              )}

              <h4>
                {isBet ? "HEADS" : "TAILS"}{" "}
                <span className="text-purple-500">FOR</span>{" "}
                <span className="text-yellow-500">{amount}</span> SOL
              </h4>
            </>
          )}
        </div>
      ) : (
        <>
          <CoinImages isBet={isBet} />
          <h1 className="text-2xl font-bold mb-6 text-center text-[#7C612E]">
            VENT FLIP
          </h1>

          <h1 className="text-center text-2xl font-bold text-[#7C612E]">
            Balance: {solBalance} SOL
          </h1>
          <CoinSelection isBet={isBet} setIsBet={setIsBet} />
          <CoinBet
            amount={amount}
            setAmount={setAmount}
            solBalance={solBalance}
          />
          <CoinFlipButton
            betLoading={betLoading}
            userLoading={userLoading}
            solBalance={solBalance}
            amount={amount}
            handlePlay={handlePlay}
          />
        </>
      )}
    </div>
  );
}
