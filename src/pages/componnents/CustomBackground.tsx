import React, { useState } from "react";

interface CustomBackgroundProps {
  changeBackground: (image: string) => void;
}

const CustomBackground: React.FC<CustomBackgroundProps> = ({
  changeBackground,
}) => {
  const [selectedBackground, setSelectedBackground] = useState<string | null>(
    null
  );

  const backgroundOptions = [
    { label: "Flying City", image: "/background/FlayingCity.png" },
    { label: "Chapter 1", image: "/background/Chapter1.jpeg" },
    { label: "Chapter 2", image: "/background/Chapter2.jpg" },
    { label: "Chapter 3", image: "/background/Chapter3.png" },
    { label: "Chapter 4", image: "/background/Chapter4.jpeg" },
    { label: "Chapter 5", image: "/background/Chapter5.jpg" },
    { label: "Gen 1", image: "/background/Gen1.png" },
    { label: "Gen 2", image: "/background/Gen2.jpg" },
    { label: "Dust", image: "/background/Dust.jpeg" },
  ];

  const handleButtonClick = (image: string) => {
    setSelectedBackground(image);
    changeBackground(image);
  };

  return (
    <div className="w-[350px] h-[200px] md:w-[380px] md:h-[200px] bg-[#292A2D] bg-opacity-95 border-4 border-black shadow p-2 rounded-2xl">
      <h1 className="font-bold text-2xl text-white">Background :</h1>
      <div className="grid grid-cols-3 grid-rows-3 gap-4 justify-evenly items-center text-center mt-2">
        {backgroundOptions.map((option, index) => (
          <button
            key={index}
            className={`h-8 w-[100px] rounded-lg font-bold hover:scale-105 ${
              selectedBackground === option.image
                ? "bg-[#F3CE49] text-black"
                : "bg-[#756394] text-white hover:text-black"
            }`}
            onClick={() => handleButtonClick(option.image)}
          >
            {option.label}
          </button>
        ))}
      </div>
    </div>
  );
};

export default CustomBackground;
