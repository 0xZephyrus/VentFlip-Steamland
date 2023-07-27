import React, { useState } from "react";

import CoinFlipComponent from "../componnents/CoinFlipComponent";
import CustomBackground from "../componnents/CustomBackground";
import OfficialLink from "../componnents/OfficialLink";
import Leaderboard from "../componnents/Leaderboard";
import useBackgroundImage from "@/hooks/useBackgroundImage";
import HistoryItem from "../componnents/HistoryItem";
import BalanceFlip from "../componnents/BalanceFlip";

const CoinFlip: React.FC = () => {
  const { backgroundImage, changeBackground } = useBackgroundImage(
    "/background/FlayingCity.png"
  );

  return (
    <div
      className="min-h-screen w-screen  bg-cover object-cover flex items-center justify-center"
      style={{ backgroundImage: `url(${backgroundImage})` }}
    >
      <div className=" w-auto h-auto mt-[120px] md:mt-[90px] mb-2 ">
        <div className=" grid grid-cols-1 md:grid-cols-3 gap-2 md:grid-row-3 md:gap-[20px] md:gap-y-1  ">
          <div className="md:col-start-1 md:row-start-1">
            <Leaderboard />
          </div>
          <div className="row-start-1 md:col-start-2">
            <CoinFlipComponent />
          </div>
          <div className="row-start- md:col-start-3 md:row-start-1">
            <HistoryItem />
          </div>
          <div className="">
            <CustomBackground changeBackground={changeBackground} />
          </div>
          <div className="row-start-2 md:col-start-2">
            <BalanceFlip
            // userFunds={userFunds}
            // balance={balance}
            // userLoading={userLoading}
            // isClaiming={isClaiming}
            // handleClaim={handleClaim}
            />
          </div>
          <div className=" col-start-1 md:col-start-3">
            <OfficialLink />
          </div>
        </div>
      </div>
    </div>
  );
};

export default CoinFlip;
