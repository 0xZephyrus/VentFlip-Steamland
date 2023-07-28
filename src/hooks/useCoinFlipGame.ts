import { useState, useEffect } from "react";
import { LAMPORTS_PER_SOL, PublicKey } from "@solana/web3.js";
import { useWallet } from "@solana/wallet-adapter-react";
import { HistoryItem as HistoryItemType, PROGRAM_ID } from "../contexts/type";
import {
  getNetworkFromConnection,
  getSolbalance,
  getWalletPartiallyHidden,
  postToDiscordApi,
  postWinOrLoseToDiscordAPI,
  solConnection,
} from "../contexts/utils";
import {
  claim,
  getAllTransactions,
  getBankBalance,
  getGlobalState,
  getUserFundsBalanceSOL,
  getUserPoolState,
  playGame,
} from "../contexts/transactions";
import { errorAlert } from "@/utils/component/toastGroup";

export function useCoinFlipGame() {
  const wallet = useWallet();
  const [isBet, setIsBet] = useState(true);
  const [balance, setBalance] = useState(0);
  const [amount, setAmount] = useState(0.05);
  const [userLoading, setUserLoading] = useState(false);
  const [solBalance, setSolBalance] = useState(0);
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

      setSolBalance(balance);
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

      // getGlobalData();
      updatePage();
    } catch (error) {
      setIsEnd(false);
      setIsWon(false);
      console.log(error);
    }
  };

  const [forceRender, setForceRender] = useState(false);
  const decWalletBalance = (value: number) => {
    let balance = solBalance;
    setSolBalance(balance - value);
    setForceRender(!forceRender);
  };

  const incFundsBalance = (value: number) => {
    let balance = userFunds;
    setUserFunds(balance + value);
    setForceRender(!forceRender);
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

  return {
    isBet,
    balance,
    setIsBet,
    amount,
    setAmount,
    userLoading,
    solBalance,
    setSolBalance,
    betLoading,
    setBetLoading,
    claimLoading,
    setClaimLoading,
    userFunds,
    setUserFunds,
    txHistory,
    setTxHistory,
    handlePlay,
    handleClaim,
    isEnd,
    isWon,
    isProgress,
    isFlipping,
    isDepositing,
    handlePlayAgain,
    txLoading,
    LAMPORTS_PER_SOL
    // Add other state variables and functions as needed
  };
}
