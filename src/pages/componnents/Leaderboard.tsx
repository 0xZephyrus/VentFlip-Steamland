import React from "react";

const LeaderboardData = [
  { rank: "1", player: "3MFTG...SFRT", secore: "123k" },
  { rank: "2", player: "DFSD...SFS", secore: "103k" },
  { rank: "3", player: "DFFFE...SFRT", secore: "13k" },
];

export default function Leaderboard() {
  return (
    <div className="w-[350px] h-[500px] md:w-[360px] md:h-[500px] bg-[#292A2D] bg-opacity-95 border-4 border-black shadow p-2 rounded-2xl">
      <h1 className="font-bold text-3xl text-white">Leaderboard :</h1>

      <div className="flex flex-row text-center">
        <div className="flex-1 py-2 text-lg font-medium text-white">Rank</div>
        <div className="flex-1 py-2 text-lg font-medium text-white">Player</div>
        <div className="flex-1 py-2 text-lg font-medium text-white">Secore</div>
      </div>
      <div className="w-full max-h-[380px] overflow-y-auto  text-center">
        {LeaderboardData.map((row, index) => (
          <div
            key={index}
            className="flex flex-row
             bg-[#3E4347]"
          >
            <div className="flex-1 py-1 text-sm font-semibold text-white">
              {row.rank}
            </div>
            <div className="flex-1 py-1 text-sm font-semibold text-white">
              {row.player}
            </div>
            <div className="flex-1 py-1 text-sm font-semibold text-white">
              {row.secore}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
