import { useState } from "react";
import StartPage from "../pages/StartPage/StartPage";
import GamePage from "../pages/GamePage/GamePage";
import ResultPage from "../pages/ResultPage/ResultPage";
import "./App.css";

function App() {
  const [currentPage, setCurrentPage] = useState("start");
  const [gameResult, setGameResult] = useState(null);

  const navigateTo = (page) => {
    setCurrentPage(page);
  };

  const handleGameFinish = (result) => {
    setGameResult(result);
    setCurrentPage("results");
  };

  return (
    <div className="app">
      {currentPage === "start" && <StartPage onNavigate={navigateTo} />}
      {currentPage === "game" && (
        <GamePage onNavigate={navigateTo} onGameFinish={handleGameFinish} />
      )}
      {currentPage === "results" && (
        <ResultPage onNavigate={navigateTo} result={gameResult} />
      )}
    </div>
  );
}

export default App;
