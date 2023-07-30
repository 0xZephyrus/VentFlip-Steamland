import React from "react";

interface CustomBackgroundProps {
  changeBackground: (image: string) => void;
}

const CustomBackground: React.FC<CustomBackgroundProps> = ({
  changeBackground,
}) => {
  return (
    <div className="w-[380px] h-[200px] md:w-[380px] md:h-[200px] bg-[#292A2D]  bg-opacity-95 border-4 border-black shadow p-2 rounded-2xl">
      <h1 className=" font-bold text-2xl text-white">Background :</h1>
      <div className="  grid grid-cols-3 grid-rows-3 gap-4 justify-evenly items-center text-center mt-2 ">
        <button
          className="bg-[#756394]  text-white  hover:text-black hover:bg-[#F3CE49] h-8 w-[100px] rounded-lg  font-bold hover:scale-105"
          onClick={() => changeBackground("/background/FlayingCity.png")}
        >
          Flying City
        </button>
        <button
          className="bg-[#756394] text-white  hover:text-black hover:bg-[#F3CE49] h-8 w-[100px] rounded-lg  font-bold hover:scale-105"
          onClick={() => changeBackground("/background/Chapter1.jpeg")}
        >
          Chapter 1
        </button>
        <button
          className="bg-[#756394] text-white  hover:text-black hover:bg-[#F3CE49] h-8 w-[100px] rounded-lg  font-bold hover:scale-105"
          onClick={() => changeBackground("/background/Gen2.jpg")}
        >
          Chapter 2
        </button>
        <button
          className="bg-[#756394] text-white  hover:text-black hover:bg-[#F3CE49] h-8 w-[100px] rounded-lg  font-bold hover:scale-105"
          onClick={() => changeBackground("/background/FlayingCity.png")}
        >
          Chapter 3
        </button>
        <button
          className="bg-[#756394] text-white  hover:text-black hover:bg-[#F3CE49] h-8 w-[100px] rounded-lg  font-bold hover:scale-105"
          onClick={() => changeBackground("/background/Chapter1.jpeg")}
        >
          Chapter 4
        </button>
        <button
          className="bg-[#756394] text-white  hover:text-black hover:bg-[#F3CE49] h-8 w-[100px] rounded-lg  font-bold hover:scale-105"
          onClick={() => changeBackground("/background/Gen2.jpg")}
        >
          Chapter 5
        </button>
        <button
          className="bg-[#756394] text-white  hover:text-black hover:bg-[#F3CE49] h-8 w-[100px] rounded-lg  font-bold hover:scale-105"
          onClick={() => changeBackground("/background/FlayingCity.png")}
        >
          Gen 1
        </button>
        <button
          className="bg-[#756394] text-white  hover:text-black hover:bg-[#F3CE49] h-8 w-[100px] rounded-lg  font-bold hover:scale-105"
          onClick={() => changeBackground("/background/Gen2.jpg")}
        >
          Gen 2
        </button>
        <button
          className="bg-[#756394] text-white  hover:text-black hover:bg-[#F3CE49] h-8 w-[100px] rounded-lg  font-bold hover:scale-105"
          onClick={() => changeBackground("/background/Chapter1.jpeg")}
        >
          Dust
        </button>
      </div>
    </div>
  );
};

export default CustomBackground;
