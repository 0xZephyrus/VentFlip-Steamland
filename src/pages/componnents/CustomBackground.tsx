import React from "react";

interface CustomBackgroundProps {
  changeBackground: (image: string) => void;
}

const CustomBackground: React.FC<CustomBackgroundProps> = ({
  changeBackground,
}) => {
  return (
    <div className="w-[350px] h-[100px] md:w-[360px] md:h-[100px] bg-[#292A2D]  bg-opacity-95 border-4 border-black shadow p-2 rounded-2xl">
      <h1 className=" font-bold text-2xl text-white">Background :</h1>
      <div className=" flex justify-evenly items-center text-center space-x-2 m-2 ">
        <button
          className="bg-[#756394] hover:bg-[#F3CE49] h-8 w-40 rounded-lg p-1 font-bold hover:scale-105"
          onClick={() => changeBackground("/background/FlayingCity.png")}
        >
          Flying City
        </button>
        <button
          className="bg-[#756394] hover:bg-[#F3CE49] h-8 w-40 rounded-lg p-1 font-bold hover:scale-105"
          onClick={() => changeBackground("/background/Chapter1.jpeg")}
        >
          Chapter 1
        </button>
        <button
          className="bg-[#756394] hover:bg-[#F3CE49] h-8 w-40 rounded-lg p-1 font-bold hover:scale-105"
          onClick={() => changeBackground("/background/Gen2.jpg")}
        >
          Gen 2
        </button>
      </div>
    </div>
  );
};

export default CustomBackground;