import { useState } from "react";

export const useNavigation = () => {
  const [currentPage, setCurrentPage] = useState("start");
  const [gameResult, setGameResult] = useState(null);
  const [gameState, setGameState] = useState(null);

  const navigateTo = (page) => {
    setCurrentPage(page);
  };

  const handleGameFinish = (result, finalGameState) => {
    setGameResult(result);
    setGameState(finalGameState);
    setCurrentPage("results");
  };

  return {
    currentPage,
    gameResult,
    gameState,
    navigateTo,
    handleGameFinish,
  };
};
