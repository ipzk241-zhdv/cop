import Layout from "../../components/ui/Layout";
import Button from "../../components/ui/Button";
import Board from "../../components/game/Board";
import "./ResultPage.css";

const ResultPage = ({ onNavigate, result, gameState }) => {
  const getResultMessage = () => {
    if (!result) return "Гра завершена";

    if (result.isDraw) return "🤝 Нічия!";

    if (result.reason === "surrender") {
      return `🏳️ Гравець ${result.winner} переміг через здачу суперника`;
    }

    return `🎉 Переміг гравець ${result.winner}!`;
  };

  return (
    <Layout>
      <div className="page result-page">
        <h1>Результат гри</h1>

        <div className="result-content">
          <div className="result-message">{getResultMessage()}</div>

          {gameState && gameState.board && (
            <div className="final-board-container">
              <h3>Фінальне поле:</h3>
              <Board
                board={gameState.board}
                onCellClick={() => {}}
                disabled={true}
                isResultView={true}
              />
            </div>
          )}
        </div>

        <div className="result-actions">
          <Button onClick={() => onNavigate("game")} variant="primary">
            Грати знову
          </Button>
          <Button onClick={() => onNavigate("start")} variant="outline">
            Головне меню
          </Button>
        </div>
      </div>
    </Layout>
  );
};

export default ResultPage;
