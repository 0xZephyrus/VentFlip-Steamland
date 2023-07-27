import { useState } from "react";

const useBackgroundImage = (initialImage: string) => {
  const [backgroundImage, setBackgroundImage] = useState<string>(initialImage);

  const changeBackground = (image: string) => {
    setBackgroundImage(image);
  };

  return {
    backgroundImage,
    changeBackground,
  };
};

export default useBackgroundImage;
