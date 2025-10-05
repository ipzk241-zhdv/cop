import { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import Layout from "../../components/ui/Layout";
import Button from "../../components/ui/Button";
import Board from "../../components/game/Board";
import GameEndDialog from "../../components/game/GameEndDialog";
import { useGame } from "../../hooks/useGame";
import { useSettingsStore } from "../../stores/useSettingsStore";
import { useResultsStore } from "../../stores/useResultsStore";
import "./GamePage.css";

const GamePage = () => {
  const { userId } = useParams();
  const navigate = useNavigate();

  const { boardSize, winningLength } = useSettingsStore();
  const { addResult } = useResultsStore();

  const [showEndDialog, setShowEndDialog] = useState(false);
  const [gameResult, setGameResult] = useState(null);
  const [finalGameState, setFinalGameState] = useState(null);
  const [gameStartTime, setGameStartTime] = useState(Date.now());

  const {
    board,
    currentPlayer,
    winner,
    isDraw,
    gameStatus,
    movesCount,
    makeMove,
    resetGame,
  } = useGame(boardSize, winningLength);

  useEffect(() => {
    setGameStartTime(Date.now());
  }, []);

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
    setGameStartTime(Date.now());
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

  const handleViewResults = () => {
    setShowEndDialog(false);

    if (gameResult && finalGameState) {
      const gameDuration = Date.now() - gameStartTime;

      // Спрощена логіка - зберігаємо тільки виграші та нічиї
      const resultType = gameResult.isDraw ? "draw" : "win";

      const currentUserId = userId || generateUserId();

      addResult({
        playerId: currentUserId,
        movesCount: movesCount,
        result: resultType,
        winner: gameResult.winner,
        boardSize: boardSize,
        winningLength: winningLength,
        duration: gameDuration,
        board: finalGameState.board,
        reason: gameResult.reason,
      });

      navigate(`/results/${currentUserId}`);
    }
  };

  const generateUserId = () => {
    return `user_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
  };

  const handleMainMenu = () => {
    setShowEndDialog(false);
    navigate("/");
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
            Поле: {boardSize}x{boardSize} | Перемога: {winningLength} в ряд |
            Ходів: {movesCount}
          </p>
          {userId && <p className="user-id">ID гравця: {userId}</p>}
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
          <Button onClick={() => navigate("/")} variant="outline">
            Головне меню
          </Button>
          <Button onClick={() => navigate("/stats")} variant="dark">
            Таблиця результатів
          </Button>
        </div>

        <GameEndDialog
          isOpen={showEndDialog}
          onClose={handleViewResults}
          result={gameResult}
          onNewGame={handleNewGame}
          onMainMenu={handleMainMenu}
        />
      </div>
    </Layout>
  );
};

export default GamePage;
