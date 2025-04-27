import { useState, useEffect } from "react";

export const useSwipeIconVisibility = (duration: number = 4000) => {
  const [showSwipeIcon, setShowSwipeIcon] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setShowSwipeIcon(false);
    }, duration);

    return () => clearTimeout(timer);
  }, [duration]);

  return showSwipeIcon;
};
