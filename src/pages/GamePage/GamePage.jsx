import { useState } from "react";
import Layout from "../../components/ui/Layout";
import Button from "../../components/ui/Button";
import Board from "../../components/game/Board";
import "./GamePage.css";

const GamePage = ({ onNavigate, onGameFinish }) => {
  const [currentPlayer, setCurrentPlayer] = useState("X");

  const handleCellClick = (row, col) => {
    // Тимчасова мікро логіка
    console.log(`Клік на клітинку [${row}, ${col}]`);
    setCurrentPlayer(currentPlayer === "X" ? "O" : "X");
  };

  const handleSurrender = () => {
    onGameFinish({
      winner: currentPlayer === "X" ? "O" : "X",
      reason: "surrender",
    });
  };

  return (
    <Layout>
      <div className="page game-page">
        <div className="game-info">
          <h2>Поточний гравець: {currentPlayer}</h2>
        </div>

        <Board onCellClick={handleCellClick} />

        <div className="game-controls">
          <Button onClick={handleSurrender} variant="secondary">
            Здатися
          </Button>
          <Button onClick={() => onNavigate("start")} variant="outline">
            Головне меню
          </Button>
        </div>
      </div>
    </Layout>
  );
};

export default GamePage;
