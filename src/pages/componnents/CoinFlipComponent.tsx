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

export default function CoinFlipComponent(props: {
  handlePlay: () => void;
  isEnd: boolean;
  setAmount: (amount: number) => void;
  setIsBet: (isBet: boolean) => void;
  solBalance: number;
  betLoading: boolean;
  isBet: boolean;
  amount: number;
  userLoading: boolean;
  isWon: boolean;
  isProgress: boolean;
  isFlipping: boolean;
  isDepositing: boolean;
  handlePlayAgain: () => void;
}) {
  return (
    <div className="w-[380px] h-[550px] md:w-[380px] md:h-[550px] bg-white bg-opacity-95 border-4 border-black shadow p-2 rounded-3xl">
      {props.isEnd && (
        <div className="win-effect">
          {props.isWon && <ReactConfetti className="h-screen w-full" />}
        </div>
      )}
      {props.isProgress ? (
        <div className="flip-box-progress">
          {props.isFlipping ? (
            <CoinFlipping />
          ) : (
            <>
              {props.isEnd ? (
                <Coin
                  isHead={props.isWon === props.isBet}
                  result={props.isWon || !props.isProgress}
                />
              ) : (
                <Coin isHead={props.isBet} />
              )}
            </>
          )}
          {props.isEnd ? (
            <>
              {props.isWon ? (
                <>
                  <h1 className="text-2xl font-bold  text-center text-green-500">
                    YOU WON
                  </h1>
                  <h1 className="text-2xl font-bold  text-center text-green-500">
                    {props.amount * 2} SOL
                  </h1>
                </>
              ) : (
                <>
                  <h1 className="text-2xl mb-5 font-bold  text-center text-red-500">
                    YOU LOST
                  </h1>
                  <h1 className="text-2xl mb-5 font-bold text-center text-red-500">
                    {props.amount} SOL
                  </h1>
                </>
              )}

              <ProgressBar
                isEnd={props.isEnd}
                isFetched={!props.userLoading}
                handlePlayAgain={props.handlePlayAgain}
                isWon={props.isWon}
              />
            </>
          ) : (
            <>
              {props.isDepositing && !props.isFlipping && (
                <LoadingText
                  text="waiting for deposit..."
                  className="waiting"
                />
              )}
              {props.isFlipping && (
                <LoadingText text="Flipping..." className="waiting" />
              )}

              <h4>
                {props.isBet ? "HEADS" : "TAILS"}{" "}
                <h1 className="text-purple-500">FOR</h1>{" "}
                <h1 className="text-yellow-500">{props.amount}</h1> SOL
              </h4>
            </>
          )}
        </div>
      ) : (
        <>
          <CoinImages isBet={props.isBet} />
          <h1 className="text-2xl font-bold mb-6 text-center text-[#7C612E]">
            VENT FLIP
          </h1>

          <CoinSelection isBet={props.isBet} setIsBet={props.setIsBet} />
          <CoinBet
            amount={props.amount}
            setAmount={props.setAmount}
            solBalance={props.solBalance}
          />
          <CoinFlipButton
            betLoading={props.betLoading}
            userLoading={props.userLoading}
            solBalance={props.solBalance}
            amount={props.amount}
            handlePlay={props.handlePlay}
          />
        </>
      )}
    </div>
  );
}
