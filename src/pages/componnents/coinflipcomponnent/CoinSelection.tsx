import React from "react";

type CoinSelectionProps = {
  isBet: boolean;
  setIsBet: (isBet: boolean) => void;
};

const CoinSelection: React.FC<CoinSelectionProps> = ({ isBet, setIsBet }) => {
  return (
    <div className="mb-4">
      <div className="grid grid-flow-col justify-center gap-[20px] mt-8">
        <button
          className={` uppercase w-[150px] h-[50px] rounded-[15px] py-2 px-6  font-bold text-sm md:text-xl shadow-lg hover:scale-105 ${
            isBet
              ? "bg-[#F3CE49] text-black"
              : "bg-[#7c612e] text-white hover:text-white"
          }`}
          onClick={() => setIsBet(true)}
        >
          Heads
        </button>
        <button
          className={` uppercase w-[150px] h-[50px] rounded-[15px] py-2 px-6  font-bold text-sm md:text-xl shadow-lg hover:scale-105 ${
            !isBet
              ? "bg-[#F3CE49] text-black"
              : "bg-[#7c612e] text-white hover:text-white"
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
