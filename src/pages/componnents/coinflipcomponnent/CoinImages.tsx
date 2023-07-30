/* eslint-disable @next/next/no-img-element */
import Image from "next/image";
import React from "react";

export default function CoinImages(props: { isBet: boolean }) {
  const { isBet } = props;
  return (
    <div className="w-40 h-40 mx-auto mb-2">
      {isBet ? (
        <img src="/coin/heads.png" alt="Heads" />
      ) : (
        <img src="/coin/Tails.png" alt="Tails" />
      )}
    </div>
  );
}
