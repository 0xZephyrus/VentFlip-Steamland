import { useWallet } from "@solana/wallet-adapter-react";
import Image from "next/image";
import React, { useEffect, useState } from "react";

type CoinBetProps = {
  amount: number;
  setAmount: (amount: number) => void;
  solBalance: number;
};

const CoinBet: React.FC<CoinBetProps> = ({ amount, setAmount, solBalance }) => {
  // Array of buttons with their values and labels
  const [disabled, setDisabled] = useState(true);
  const buttonData = [
    { value: 0.05, label: "0.05 SOL" },
    { value: 0.1, label: "0.1 SOL" },
    { value: 0.25, label: "0.25 SOL" },
    { value: 0.5, label: "0.5 SOL" },
    { value: 1, label: "1 SOL" },
    { value: 2, label: "2 SOL" },
  ];

  let { connected } = useWallet();

  useEffect(() => {
    setDisabled(!connected);
  }, [connected]);

  return (
    <div className="mb-5">
      {/* Button container with grid layout */}
      <div className="grid grid-cols-3 gap-4 mt-5">
        {buttonData.map((button) => (
          <button
            key={button.value}
            // CSS classes for styling the button
            className={`
              uppercase justify-center items-center text-white rounded-3xl w-30 h-[50px]  font-bold text-sm md:text-xl shadow-lg hover:scale-105 
              ${
                amount === button.value
                  ? "bg-[#f3ce49] "
                  : "bg-[#7c612e] text-[#D7B779] hover:text-white"
              } 
              ${
                disabled || solBalance <= button.value
                  ? " brightness-50 cursor-not-allowed"
                  : ""
              }
            `}
            // Disable the button if the solBalance is insufficient
            disabled={disabled || solBalance <= button.value}
            // Call setAmount function with the button value when clicked
            onClick={() => setAmount(button.value)}
          >
            {/* Display the label and the Solana icon */}
            <span>{button.label}</span>
          </button>
        ))}
      </div>
    </div>
  );
};

export default CoinBet;
