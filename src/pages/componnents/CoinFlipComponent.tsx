import { useState, useEffect } from "react";

import React from "react";
import CoinSelection from "./coinflipcomponnent/CoinSelection";
import CoinBet from "./coinflipcomponnent/CoinBet";
import CoinFlipButton from "./coinflipcomponnent/CoinFlipButton";
import {
  getNetworkFromConnection,
  getSolbalance,
  getWalletPartiallyHidden,
  postToDiscordApi,
  postWinOrLoseToDiscordAPI,
  solConnection,
} from "../../contexts/utils";
import { LAMPORTS_PER_SOL, PublicKey } from "@solana/web3.js";
import { useWallet } from "@solana/wallet-adapter-react";
import {
  HistoryItem as HistoryItemType,
  PROGRAM_ID,
} from "../../contexts/type";
import { errorAlert } from "./toastGroup";
import {
  claim,
  getAllTransactions,
  getBankBalance,
  getGlobalState,
  getUserFundsBalanceSOL,
  getUserPoolState,
  playGame,
} from "../../contexts/transactions";
import LoadingText from "./LoadingText";
import ProgressBar from "./ProgressBar";
import CoinImages from "./coinflipcomponnent/CoinImages";
import Coin from "./coinflipcomponnent/Coin";
import CoinFlipping from "./coinflipcomponnent/CoinFliping";
import ReactConfetti from "react-confetti";

export default function CoinFlipComponent() {
  const wallet = useWallet();
  const [isBet, setIsBet] = useState(true);
  const [amount, setAmount] = useState(0.05);
  const [userLoading, setUserLoading] = useState(false);
  const [solBalance, setSolBanace] = useState(0);
  const [betLoading, setBetLoading] = useState(false);
  const [claimLoading, setClaimLoading] = useState(false);

  const [isDepositing, setIsDepositing] = useState(false);
  const [isFlipping, setIsFlipping] = useState(false);
  const [isEnd, setIsEnd] = useState(false);
  const [isWon, setIsWon] = useState(false);
  const [setValue, setSetValue] = useState(0.05);
  const [userFunds, setUserFunds] = useState(0);
  const [txLoading, setTxLoading] = useState(false);
  const [isStartFlipping, setIsStartFlipping] = useState(false);

  const [isInc, setIsInc] = useState(false);
  const [isDec, setIsDec] = useState(false);

  const [isProgress, setIsProgress] = useState(false);
  const [txHistory, setTxHistory] = useState<HistoryItemType[]>([]);

  const getGlobalData = async () => {
    setIsDec(false);
    setUserLoading(true);
    if (wallet.publicKey !== null) {
      console.log("Connection:", getNetworkFromConnection(solConnection));

      const globalState = await getGlobalState();
      console.log("Global State:", globalState);

      const balance = await getSolbalance(wallet.publicKey);
      const funds = await getUserPoolState(wallet);
      const bankBalance = await getBankBalance();
      console.log("Bank Balance: ", bankBalance / LAMPORTS_PER_SOL);

      if (funds) {
        setUserFunds(funds.claimableReward.toNumber() / LAMPORTS_PER_SOL);
      }

      setSolBanace(balance);
      console.log("Player Balance:", balance);

      const userFundsBalanceBeforeWithdrawal = await getUserFundsBalanceSOL(
        wallet
      );
      console.log("Player Funds Balance:", userFundsBalanceBeforeWithdrawal);
    }

    setUserLoading(false);
  };

  const getAllTxs = async () => {
    setTxLoading(true);
    //const bankBalance = await getBankBalance();
    //console.log("Bank Balance: ", bankBalance / LAMPORTS_PER_SOL);
    if (wallet.publicKey !== null) {
      const allTx = await getAllTransactions(new PublicKey(PROGRAM_ID));
      setTxHistory(allTx);
    }
    setTxLoading(false);
  };

  const updatePage = async () => {
    await getGlobalData();
    await getAllTxs();
  };

  const getDataByInterval = async () => {
    // setInterval(async () => {
    //   if (wallet.publicKey === null) return;
    //   const balance = await getSolbalance(wallet.publicKey);
    //   const allTx = await getAllTransactions(new PublicKey(PROGRAM_ID));
    //   const funds = await getUserPoolState(wallet);
    //   if (funds) {
    //     setUserFunds(funds.claimableReward.toNumber() / LAMPORTS_PER_SOL);
    //   }
    //   setTxHistory(allTx);
    //   setSolBanace(balance);
    // }, 5000);
  };

  const handlePlayAgain = () => {
    setIsEnd(false);
    setIsWon(false);
    setIsProgress(false);
    setIsDec(false);
    setIsStartFlipping(false);
  };

  const setPlayResult = (isWon: boolean) => {
    setIsWon(isWon);
    console.log("IsWon:", isWon);

    postWinOrLoseToDiscordAPI(wallet!.publicKey!, isWon, amount, solConnection);
  };

  const handlePlay = async () => {
    if (wallet.publicKey === null) {
      errorAlert("Please connect wallet!");
      return;
    }
    if (amount + 0.002 > solBalance) {
      errorAlert("You don't have enough balance to play!");
      return;
    }

    if (amount + 0.002 > (await getSolbalance(wallet.publicKey))) {
      errorAlert("You don't have enough balance to play!");
      return;
    }

    try {
      const result = await playGame(
        wallet,
        isBet ? 1 : 0,
        amount,
        (e: boolean) => setBetLoading(e),
        (e: boolean) => setIsDepositing(e),
        (e: boolean) => setIsFlipping(e),
        (e: boolean) => setIsEnd(e),
        (e: boolean) => setIsProgress(e),
        (e: boolean) => setIsDec(e),
        (e: boolean) => setIsInc(e),
        (e: boolean) => setPlayResult(e),
        (e: boolean) => setIsStartFlipping(e),
        () => getAllTxs()
      );

      console.log("playGame result:", result);

      if (result && result.gameData.rewardAmount.toNumber() !== 0) {
        setSetValue(result.gameData.amount.toNumber() / LAMPORTS_PER_SOL);
      }

      getGlobalData();
    } catch (error) {
      setIsEnd(false);
      setIsWon(false);
      console.log(error);
    }
  };

  const [forceRender, serForceRender] = useState(false);
  const decWalletBalance = (value: number) => {
    let balance = solBalance;
    setSolBanace(balance - value);
    serForceRender(!forceRender);
  };

  const incFundsBalance = (value: number) => {
    let balance = userFunds;
    setUserFunds(balance + value);
    serForceRender(!forceRender);
  };

  useEffect(() => {
    if (isDec) {
      decWalletBalance(amount);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isDec]);

  useEffect(() => {
    if (isWon) {
      setTimeout(() => {
        incFundsBalance(amount * 2);
      }, 3000);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isWon, isInc]);

  const handleClaim = async () => {
    if (wallet.publicKey === null) {
      errorAlert("Please connect wallet!");
      return;
    }

    if (userFunds === 0) {
      errorAlert("No funds available for withdrawal!");
      return;
    }

    try {
      await claim(
        wallet,
        () => setClaimLoading(true),
        () => setClaimLoading(false),
        () => handlePlayAgain(),
        () => updatePage()
      );

      setIsEnd(false);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getGlobalData();
    getAllTxs();
    getDataByInterval();
    // eslint-disable-next-line
  }, [wallet.connected, wallet.publicKey]);

  return (
    <div className="w-[600px] h-auto md:w-[360px] md:h-[600px] bg-white bg-opacity-95 border-4 border-black shadow p-2 rounded-3xl">
      {isEnd && (
        <div className="win-effect">
          {isWon && <ReactConfetti width={2000} height={2000} />}
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
            <div className="text-center justify-center items-center">
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
            </div>
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
