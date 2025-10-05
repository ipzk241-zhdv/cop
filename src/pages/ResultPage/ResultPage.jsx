import { useNavigate, useParams } from "react-router-dom";
import Layout from "../../components/ui/Layout";
import Button from "../../components/ui/Button";
import Board from "../../components/game/Board";
import { useResultsStore } from "../../stores/useResultsStore";
import "./ResultPage.css";

const ResultPage = () => {
  const { userId } = useParams();
  const navigate = useNavigate();
  const { results } = useResultsStore();

  const getLatestGame = () => {
    if (!userId) return null;

    const userGames = results.filter((result) => result.playerId === userId);
    if (userGames.length === 0) return null;

    return userGames.sort((a, b) => b.timestamp - a.timestamp)[0];
  };

  const latestGame = getLatestGame();

  const getResultMessage = () => {
    if (!latestGame) return "Гра завершена";

    if (latestGame.result === "draw") return "🤝 Нічия!";

    if (latestGame.reason === "surrender") {
      return `🏳️ Гравець ${latestGame.winner} переміг через здачу суперника`;
    }

    return `🎉 Переміг гравець ${latestGame.winner}!`;
  };

  const createEmptyBoard = (size) => {
    return Array(size)
      .fill()
      .map(() => Array(size).fill(null));
  };

  const getBoard = () => {
    if (latestGame && latestGame.board) {
      return latestGame.board;
    }
    return createEmptyBoard(latestGame?.boardSize || 3);
  };

  const handlePlayAgain = () => {
    if (userId) {
      navigate(`/game/${userId}`);
    } else {
      navigate("/game");
    }
  };

  return (
    <Layout>
      <div className="page result-page">
        <h1>Результат гри</h1>
        {userId && <p className="user-id">ID гравця: {userId}</p>}

        <div className="result-content">
          <div className="result-message">{getResultMessage()}</div>

          <div className="game-stats">
            {latestGame && (
              <div className="stats-info">
                <p>
                  Розмір поля: {latestGame.boardSize}x{latestGame.boardSize}
                </p>
                <p>Кількість ходів: {latestGame.movesCount}</p>
                <p>Умова перемоги: {latestGame.winningLength} в ряд</p>
                {latestGame.duration && (
                  <p>
                    Тривалість гри: {Math.floor(latestGame.duration / 1000)}с
                  </p>
                )}
              </div>
            )}
          </div>

          <div className="final-board-container">
            <Board
              board={getBoard()}
              onCellClick={() => {}}
              disabled={true}
              isResultView={true}
            />
          </div>
        </div>

        <div className="result-actions">
          <Button onClick={handlePlayAgain} variant="primary">
            Грати знову
          </Button>
          <Button onClick={() => navigate("/stats")} variant="secondary">
            Переглянути статистику
          </Button>
          <Button onClick={() => navigate("/")} variant="outline">
            Головне меню
          </Button>
        </div>
      </div>
    </Layout>
  );
};

export default ResultPage;
