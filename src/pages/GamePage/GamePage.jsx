import { useEffect } from "react";
import Layout from "../../components/ui/Layout";
import Button from "../../components/ui/Button";
import Board from "../../components/game/Board";
import { useGame } from "../../hooks/useGame";
import "./GamePage.css";

const GamePage = ({ onNavigate, onGameFinish }) => {
  const { board, currentPlayer, winner, isDraw, makeMove, resetGame } =
    useGame();

  useEffect(() => {
    if (winner || isDraw) {
      setTimeout(() => {
        onGameFinish({
          winner,
          isDraw,
          reason: winner ? "win" : "draw",
        });
      }, 3000);
    }
  }, [winner, isDraw, onGameFinish]);

  const handleCellClick = (row, col) => {
    makeMove(row, col);
  };

  const handleRestart = () => {
    resetGame();
  };

  const handleSurrender = () => {
    onGameFinish({
      winner: currentPlayer === "X" ? "O" : "X",
      isDraw: false,
      reason: "surrender",
    });
  };

  return (
    <Layout>
      <div className="page game-page">
        <div className="game-info">
          <h2>Поточний гравець: {currentPlayer}</h2>
          {winner && (
            <div className="winner-message">Переміг гравець {winner}! 🎉</div>
          )}
          {isDraw && <div className="draw-message">Нічия! 🤝</div>}
        </div>

        <Board board={board} onCellClick={handleCellClick} />

        <div className="game-controls">
          <Button onClick={handleRestart} variant="secondary">
            Нова гра
          </Button>
          <Button onClick={handleSurrender} variant="outline">
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
