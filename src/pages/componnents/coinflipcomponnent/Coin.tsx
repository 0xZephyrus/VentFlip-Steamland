/* eslint-disable @next/next/no-img-element */
import React from "react";

export default function Coin(props: {
  isHead: boolean;
  result?: boolean;
  className?: string;
}) {
  const { isHead, result, className } = props;
  return (
    <>
      {isHead ? (
        <img
          src="/ventflip/congrats.png"
          alt=""
          className={`mb-10 mt-10  ${className ? className : ""} ${
            result ? "normal" : "lost"
          }`}
        />
      ) : (
        <img
          src="/ventflip/Oops.png"
          alt=""
          className={`mb-10 mt-10 ${className ? className : ""} ${
            result ? "" : "lost"
          }`}
        />
      )}
    </>
  );
}
