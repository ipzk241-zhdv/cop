import { useState, useEffect } from "react";
import Layout from "../../components/ui/Layout";
import Button from "../../components/ui/Button";
import Board from "../../components/game/Board";
import GameEndDialog from "../../components/game/GameEndDialog";
import { useGame } from "../../hooks/useGame";
import "./GamePage.css";

const GamePage = ({ onNavigate, onGameFinish, settings }) => {
  const [showEndDialog, setShowEndDialog] = useState(false);
  const [gameResult, setGameResult] = useState(null);
  const [finalGameState, setFinalGameState] = useState(null);

  const {
    board,
    currentPlayer,
    winner,
    isDraw,
    gameStatus,
    makeMove,
    resetGame,
  } = useGame(settings.boardSize, settings.winningLength);

  useEffect(() => {
    if (gameStatus.isGameFinished && !showEndDialog) {
      const result = {
        winner,
        isDraw,
        reason: winner ? "win" : "draw",
      };
      const state = {
        board: JSON.parse(JSON.stringify(board)),
        winner,
        isDraw,
      };
      setGameResult(result);
      setFinalGameState(state);
      setShowEndDialog(true);
    }
  }, [gameStatus.isGameFinished, winner, isDraw, board, showEndDialog]);

  const handleCellClick = (row, col) => {
    if (gameStatus.isGameActive) {
      makeMove(row, col);
    }
  };

  const handleNewGame = () => {
    resetGame();
    setShowEndDialog(false);
    setGameResult(null);
    setFinalGameState(null);
  };

  const handleSurrender = () => {
    const result = {
      winner: currentPlayer === "X" ? "O" : "X",
      isDraw: false,
      reason: "surrender",
    };
    const state = {
      board: JSON.parse(JSON.stringify(board)),
      winner: result.winner,
      isDraw: false,
    };
    setGameResult(result);
    setFinalGameState(state);
    setShowEndDialog(true);
  };

  const handleCloseDialog = () => {
    setShowEndDialog(false);
    if (gameResult && finalGameState) {
      onGameFinish(gameResult, finalGameState);
    }
  };

  const handleMainMenu = () => {
    setShowEndDialog(false);
    onNavigate("start");
  };

  return (
    <Layout>
      <div className="page game-page">
        <div className="game-info">
          <h2>
            Поточний гравець:{" "}
            <span className={`player-${currentPlayer}`}>{currentPlayer}</span>
          </h2>
          <p className="game-settings-info">
            Поле: {settings.boardSize}x{settings.boardSize} | Перемога:{" "}
            {settings.winningLength} в ряд
          </p>
          {winner && (
            <div className="winner-message">🎉 Переміг гравець {winner}!</div>
          )}
          {isDraw && <div className="draw-message">🤝 Нічия!</div>}
        </div>

        <Board
          board={board}
          onCellClick={handleCellClick}
          disabled={!gameStatus.isGameActive || showEndDialog}
        />

        <div className="game-controls">
          <Button onClick={() => resetGame()} variant="primary">
            Нова гра
          </Button>
          <Button
            onClick={handleSurrender}
            variant="secondary"
            disabled={!gameStatus.isGameActive || showEndDialog}
          >
            Здатися
          </Button>
          <Button onClick={() => onNavigate("start")} variant="outline">
            Головне меню
          </Button>
        </div>

        <GameEndDialog
          isOpen={showEndDialog}
          onClose={handleCloseDialog}
          result={gameResult}
          onNewGame={handleNewGame}
          onMainMenu={handleMainMenu}
        />
      </div>
    </Layout>
  );
};

export default GamePage;
