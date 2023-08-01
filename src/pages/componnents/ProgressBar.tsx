import { useState, useEffect } from "react";
import LoadingText from "./LoadingText";

export default function ProgressBar(props: {
  isEnd: boolean;
  isFetched: boolean;
  isWon: boolean;
  handlePlayAgain: Function;
}) {
  const { isEnd, isWon, isFetched, handlePlayAgain } = props;
  const [percent, setPercent] = useState(0);
  const [end, setEnd] = useState(false);

  useEffect(() => {
    if (isEnd) {
      setPercent(30);
    }
    if (isWon) {
      if (isFetched && isEnd) {
        setTimeout(() => {
          setPercent(100);
        }, 1000);

        setTimeout(() => {
          setEnd(true);
        }, 2000);
      }
    } else {
      setEnd(true);
    }
  }, [isEnd, isFetched]);

  return (
    <>
      {!end && isWon && (
        <LoadingText
          text="Solana is processing your flip..."
          className="progressing"
        />
      )}
      <div className="flex flex-col items-center">
        {!end && isWon && (
          <div
            className="w-full h-4 bg-gray-200 rounded-full"
            style={{ marginTop: isWon ? 0 : 20 }}
          >
            <div
              className={`h-4 bg-[#F3CE49] rounded-full ${
                percent === 30 ? "w-1/2" : ""
              } ${percent === 100 ? "w-full" : ""}`}
            ></div>
          </div>
        )}
        {isWon && end && (
          <p className="text-success mt-4 text-[#846B3B]">
            Your win sent successfully
            <br />
            to your funds wallet.
          </p>
        )}
        <button
          className={`bg-[#7C612E] hover:bg-[#F3CE49] w-40 h-10 rounded-2xl mt-6 font-bold text-sm md:text-xl text-white ${
            !end ? "loading" : ""
          }`}
          disabled={!end}
          onClick={() => handlePlayAgain()}
        >
          PLAY AGAIN
        </button>
      </div>
    </>
  );
}
