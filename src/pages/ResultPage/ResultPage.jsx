import Layout from "../../components/ui/Layout";
import Button from "../../components/ui/Button";
import "./ResultPage.css";

const ResultPage = ({ onNavigate, result }) => {
  const getResultMessage = () => {
    if (!result) return "Гра завершена";
    return result.winner ? `Переміг гравець ${result.winner}` : "Нічия!";
  };

  return (
    <Layout>
      <div className="page result-page">
        <h1>Результат гри</h1>
        <div className="result-message">{getResultMessage()}</div>

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
