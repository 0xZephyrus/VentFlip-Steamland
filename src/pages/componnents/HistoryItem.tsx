import React, { useState, useEffect } from "react";
import moment from "moment";
import { solConnection } from "../../contexts/utils";

interface HistoryItemProps {
  signature: string;
  userAddress: string;
  betAmount: number;
  type: boolean;
  betTime: number;
  win: boolean;
}

export default function HistoryItem(props: HistoryItemProps) {
  const { win, signature, userAddress, betAmount, type, betTime } = props;
  const [blockTime, setBlockTime] = useState(new Date().getTime());
  const [timeLoading, setTimeLoading] = useState(false);

  const getBlockTime = async () => {
    setTimeLoading(true);
    try {
      const slot = await solConnection.getSlot();
      const time = await solConnection.getBlockTime(slot);
      if (time) {
        setBlockTime(time * 1000);
      }
    } catch (e) {
      console.error("Error while fetching block time:", e);
    }
    setTimeLoading(false);
  };

  useEffect(() => {
    getBlockTime();
    // eslint-disable-next-line
  }, [betTime]);

  return (
    <div className="w-full h-[45px] text-center p-1 ">
      <div
        className={` justify-center text-center items-center  rounded-md flex flex-row w-full h-full transition-all duration-200 ${
          win ? "bg-[#3E4347]" : "bg-[#5E5E5F]"
        }`}
      >
        <div className="flex-1  text-sm font-semibold text-white">
          {win ? `+${betAmount * 2}` : `-${betAmount}`} SOL
        </div>
        <div className="flex-1  text-sm font-semibold text-white">
          {type ? "HEADS" : "TAILS"}
        </div>
        <div className="flex-1  text-sm font-semibold text-white">
          {win ? "WIN" : "LOST"}
        </div>
        {!timeLoading && blockTime !== null && (
          <div className="flex-1 text-xs uppercase  font-bold text-white">
            {moment(betTime * 1000).from(moment(blockTime))}
          </div>
        )}
      </div>
    </div>
  );
}
