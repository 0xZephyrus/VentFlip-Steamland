"use client";

import React, { useCallback, useEffect, useState } from "react";
import CoinSelection from "./coinflipcomponnent/CoinSelection";
import CoinBet from "./coinflipcomponnent/CoinBet";
import CoinFlipButton from "./coinflipcomponnent/CoinFlipButton";
import ProgressBar from "./ProgressBar";
import CoinImages from "./coinflipcomponnent/CoinImages";
import ReactConfetti from "react-confetti";
import Image from "next/image";

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
  const [isMusicPlaying, setIsMusicPlaying] = useState(false);

  useEffect(() => {
    const audioElement = new Audio("/music2.mp3");
    audioElement.loop = true;
    audioElement.volume = 0.05; // Set the volume to 30% (0.3)

    if (isMusicPlaying) {
      audioElement.play();
    } else {
      audioElement.pause();
    }

    return () => {
      audioElement.pause();
    };
  }, [isMusicPlaying]);

  const handleMusicToggle = () => {
    setIsMusicPlaying(!isMusicPlaying);
  };
  return (
    <div className="w-[380px] h-[550px] md:w-[380px] md:h-[550px] bg-white bg-opacity-95 border-4 border-black shadow p-2 rounded-3xl">
      <button onClick={handleMusicToggle} className="w-[30px] absolute">
        {isMusicPlaying ? (
          <img src="/ventflip/pause.png" alt="Pause Music" />
        ) : (
          <img src="/ventflip/play.png" alt="Play Music" />
        )}
      </button>
      {props.isEnd && (
        <div className="win-effect">
          {props.isWon && <ReactConfetti className="h-screen w-full" />}
        </div>
      )}

      {props.isProgress ? (
        <div className="flex flex-col items-center justify-center text-center">
          {props.isFlipping && (
            <div className="flex flex-col items-center space-y-1">
              <Image
                src="/ventflip/CoinFlipping.gif"
                alt="CoinFlipping"
                height={300}
                width={300}
                unoptimized
                priority
              />
              <h1 className="text-black font-bold text-xl">
                Waiting for flipping...
              </h1>
              <h1 className="text-purple-500 font-bold text-lg">
                {props.isBet ? "HEADS" : "TAILS"} FOR {props.amount} SOL
              </h1>
              <Image
                src="/ventflip/loading.gif"
                height={200}
                width={200}
                priority
                unoptimized
                alt="loading"
              />
            </div>
          )}
          {props.isEnd ? (
            <>
              {props.isWon ? (
                <>
                  <Image
                    src="/ventflip/congrats.gif"
                    alt="congrats"
                    height={300}
                    width={300}
                    priority
                    unoptimized
                  />
                  <h1 className="text-2xl font-bold text-[#846B3B]">
                    You Won!
                  </h1>
                  <h1 className="text-2xl font-bold text-green-500">
                    + {props.amount * 2} SOL
                  </h1>
                </>
              ) : (
                <>
                  <Image
                    src="/ventflip/Oops.gif"
                    alt="Oops"
                    height={300}
                    width={300}
                    priority
                    unoptimized
                  />
                  <h1 className="text-2xl mb-2 font-bold text-[#846B3B]">
                    You Lose!
                  </h1>
                  <h1 className="text-2xl mb-1 font-bold text-red-500">
                    - {props.amount} SOL
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
            <div className="flex flex-col items-center justify-center text-center">
              {props.isDepositing && !props.isFlipping && (
                <div className="flex flex-col items-center space-y-1">
                  <Image
                    src="/ventflip/machine.gif"
                    alt="machine"
                    height={300}
                    width={300}
                    priority
                    unoptimized
                  />
                  <h1 className="text-[#846B3B] font-bold text-xl">
                    Waiting for deposit...
                  </h1>
                  <h1 className="text-[#846B3B] font-bold text-[25px]">
                    {props.isBet ? "HEADS" : "TAILS"} FOR {props.amount} SOL
                  </h1>
                  <Image
                    src="/ventflip/loading.gif"
                    alt="loading"
                    height={100}
                    width={100}
                    priority
                    unoptimized
                  />
                </div>
              )}
            </div>
          )}
        </div>
      ) : (
        <div className="text-center ">
          <CoinImages isBet={props.isBet} />
          <h1 className="text-2xl font-bold mb-6 text-[#7C612E]">VENT FLIP</h1>

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
        </div>
      )}
    </div>
  );
}
