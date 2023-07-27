import React from "react";

type CoinSelectionProps = {
  isBet: boolean;
  setIsBet: (isBet: boolean) => void;
};

const CoinSelection: React.FC<CoinSelectionProps> = ({ isBet, setIsBet }) => {
  return (
    <div className="mb-4">
      <div className="grid grid-flow-col justify-center gap-10 mt-8">
        <button
          className={`text-white uppercase rounded-3xl py-2 px-6 border-[1px] font-bold text-sm md:text-xl shadow-lg hover:scale-105 ${
            isBet ? "bg-[#F3CE49]" : "bg-[#7c612e]"
          }`}
          onClick={() => setIsBet(true)}
        >
          Heads
        </button>
        <button
          className={`text-white uppercase rounded-3xl py-2 px-6 border-[1px] font-bold text-sm md:text-xl shadow-lg hover:scale-105 ${
            !isBet ? "bg-[#F3CE49]" : "bg-[#7c612e]"
          }`}
          onClick={() => setIsBet(false)}
        >
          Tails
        </button>
      </div>
    </div>
  );
};

export default CoinSelection;
