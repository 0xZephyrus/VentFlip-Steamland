import moment from "moment";
import { useState, useEffect } from "react";
import { solConnection } from "../../contexts/utils";
import { SolGrayIcon, SolIcon, SolSvgIcon } from "../../utils/component/svgIcons";

export default function HistoryItem(props: {
  signature: string;
  userAddress: string;
  betAmount: number;
  type: boolean;
  betTime: number;
  win: boolean;
}) {
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
    } catch (e) {}
    setTimeLoading(false);
  };

  useEffect(() => {
    console.log(betAmount);
    getBlockTime();
    // eslint-disable-next-line
  }, [betTime]);
  return (
    
      <div className="w-full max-h-[380px] overflow-y-auto  text-center">
        <div
          className={`flex flex-row transition-all duration-200 ${
            win ? "bg-[#3E4347]" : "bg-[#5E5E5F] "
          }`}
        >
          <div className="flex-1 py-1 text-sm font-semibold text-white">
            {win ? "+" : "-"} {win ? betAmount * 2 : betAmount} SOL
          </div>
          <div className="flex-1 py-1 text-sm font-semibold text-white">
            {type ? "HEADS" : "TAILS"}
          </div>
          <div className="flex-1 py-1 text-sm font-semibold text-white">
            {win ? "win" : "lost"}
          </div>
          {!timeLoading && (
            <div className="flex-1 py-1 text-sm font-semibold text-white">
              {moment(betTime * 1000).from(moment(blockTime))}
            </div>
          )}
        </div>
      </div>
  );
}
