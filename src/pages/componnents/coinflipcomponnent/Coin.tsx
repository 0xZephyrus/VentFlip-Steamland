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
          src="/coin/heads.png"
          alt=""
          className={`coin ${className ? className : ""} ${
            result ? "normal" : "lost"
          }`}
        />
      ) : (
        <img
          src="/coin/heads.png"
          alt=""
          className={`coin ${className ? className : ""} ${
            result ? "" : "lost"
          }`}
        />
      )}
    </>
  );
}
