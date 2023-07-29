import { useState, useEffect } from "react";

const useText = () => {
  const [currentIndex, setCurrentIndex] = useState(0);

  const texts = [
    "Hi, Gm Steamlanders",
    "Welcome to the flying city",
    "Pack your bags and head on a journey towards the flying city",
    "Get ready for the next chapter of Steamland!",
  ];

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prevIndex) => (prevIndex + 1) % texts.length);
    }, 6000);

    return () => clearInterval(interval);
  }, []);

  const currentText = texts[currentIndex];

  return currentText;
};

export default useText;
