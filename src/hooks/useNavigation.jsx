import { useState } from "react";

export const useNavigation = () => {
  const [currentPage, setCurrentPage] = useState("start");
  const [gameResult, setGameResult] = useState(null);

  const navigateTo = (page) => {
    setCurrentPage(page);
  };

  const handleGameFinish = (result) => {
    setGameResult(result);
    setCurrentPage("results");
  };

  return {
    currentPage,
    gameResult,
    navigateTo,
    handleGameFinish,
  };
};
