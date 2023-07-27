import moment from "moment";
import { useState, useEffect } from "react";
import { solConnection } from "../../contexts/utils";
import { SolGrayIcon, SolIcon, SolSvgIcon } from "./svgIcons";

export default function HistoryItem(props: {
  signature: string;
  hash: number;
  userAddress: string;
  betAmount: number;
  type: boolean;
  betTime: number;
  win: boolean;
}) {
  const { win, signature, userAddress, hash, betAmount, type, betTime } = props;
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
    getBlockTime();
    // eslint-disable-next-line
  }, [betTime]);
  return (
    <div className="w-[350px] h-[500px] md:w-[360px] md:h-[500px] bg-[#292A2D] bg-opacity-95 border-4 border-black shadow p-2 rounded-2xl">
      <h1 className="font-bold text-3xl text-white">History :</h1>

      <div className="flex flex-row text-center">
        <div className="flex-1 py-2 text-lg font-medium text-white">Bet</div>
        <div className="flex-1 py-2 text-lg font-medium text-white">Result</div>
        <div className="flex-1 py-2 text-lg font-medium text-white">Status</div>
        <div className="flex-1 py-2 text-lg font-medium text-white">Time</div>
      </div>
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
    </div>
  );
}
