import { useNavigate, useParams } from "react-router-dom";
import Button from "../../components/ui/Button";
import Board from "../../components/game/Board";
import "./ResultPage.css";

const ResultPage = () => {
  const { userId } = useParams();
  const navigate = useNavigate();

  const gameData = userId ? localStorage.getItem(`gameResult_${userId}`) : null;
  const { result, state } = gameData ? JSON.parse(gameData) : {};

  const getResultMessage = () => {
    if (!result) return "Гра завершена";

    if (result.isDraw) return "🤝 Нічия!";

    if (result.reason === "surrender") {
      return `🏳️ Гравець ${result.winner} переміг через здачу суперника`;
    }

    return `🎉 Переміг гравець ${result.winner}!`;
  };

  const handlePlayAgain = () => {
    if (userId) {
      navigate(`/game/${userId}`);
    } else {
      navigate("/game");
    }
  };

  return (
    <div className="page result-page">
      <h1>Результат гри</h1>
      {userId && <p className="user-id">ID гравця: {userId}</p>}

      <div className="result-content">
        <div className="result-message">{getResultMessage()}</div>

        {state && state.board && (
          <div className="final-board-container">
            <Board
              board={state.board}
              onCellClick={() => {}}
              disabled={true}
              isResultView={true}
            />
          </div>
        )}
      </div>

      <div className="result-actions">
        <Button onClick={handlePlayAgain} variant="primary">
          Грати знову
        </Button>
        <Button onClick={() => navigate("/")} variant="outline">
          Головне меню
        </Button>
      </div>
    </div>
  );
};

export default ResultPage;
