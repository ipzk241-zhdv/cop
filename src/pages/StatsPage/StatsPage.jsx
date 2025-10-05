import { useState } from "react";
import { useNavigate } from "react-router-dom";
import Layout from "../../components/ui/Layout";
import Button from "../../components/ui/Button";
import { useResultsStore } from "../../stores/useResultsStore";
import "./StatsPage.css";

const StatsPage = () => {
  const navigate = useNavigate();
  const { results, getStats, clearResults } = useResultsStore();
  const [filter, setFilter] = useState("all");

  const stats = getStats();

  const filteredResults =
    filter === "all"
      ? results
      : results.filter((result) => result.result === filter);

  const formatDuration = (ms) => {
    const seconds = Math.floor(ms / 1000);
    const minutes = Math.floor(seconds / 60);
    return `${minutes}:${(seconds % 60).toString().padStart(2, "0")}`;
  };

  const formatDate = (timestamp) => {
    return new Date(timestamp).toLocaleDateString("uk-UA", {
      day: "2-digit",
      month: "2-digit",
      year: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    });
  };

  const getResultBadge = (result) => {
    const badges = {
      win: { text: "Виграш", class: "badge-win" },
      lose: { text: "Програш", class: "badge-lose" },
      draw: { text: "Нічия", class: "badge-draw" },
    };

    const badge = badges[result];
    return <span className={`badge ${badge.class}`}>{badge.text}</span>;
  };

  const generateUserId = () => {
    return `user_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
  };

  const handleStartGame = () => {
    const userId = generateUserId();
    navigate(`/game/${userId}`);
  };

  return (
    <Layout>
      <div className="page stats-page">
        <div className="stats-header">
          <h1>Статистика ігор</h1>
          <Button onClick={() => navigate("/")} variant="outline">
            Головне меню
          </Button>
        </div>

        <div className="stats-container">
          <div className="stat-card">
            <h3>Всього ігор</h3>
            <span className="stat-value">{stats.totalGames}</span>
          </div>
          <div className="stat-card">
            <h3>Виграші</h3>
            <span className="stat-value stat-win">{stats.wins}</span>
          </div>
          <div className="stat-card">
            <h3>Нічиї</h3>
            <span className="stat-value stat-draw">{stats.draws}</span>
          </div>
        </div>

        <div className="filters">
          <Button
            onClick={() => setFilter("all")}
            variant={filter === "all" ? "primary" : "outline"}
          >
            Всі ігри
          </Button>
          <Button
            onClick={() => setFilter("win")}
            variant={filter === "win" ? "primary" : "outline"}
          >
            Виграші
          </Button>
          <Button
            onClick={() => setFilter("draw")}
            variant={filter === "draw" ? "primary" : "outline"}
          >
            Нічиї
          </Button>
        </div>

        <div className="table-container">
          {filteredResults.length > 0 ? (
            <table className="stats-table">
              <thead>
                <tr>
                  <th>Дата</th>
                  <th>Результат</th>
                  <th>Гравець</th>
                  <th>Поле</th>
                  <th>Ходів</th>
                  <th>Час</th>
                  <th>Переможець</th>
                </tr>
              </thead>
              <tbody>
                {filteredResults.map((game) => (
                  <tr key={game.id}>
                    <td>{formatDate(game.timestamp)}</td>
                    <td>{getResultBadge(game.result)}</td>
                    <td className="player-id">{game.playerId}</td>
                    <td>
                      {game.boardSize}x{game.boardSize}
                    </td>
                    <td>{game.movesCount}</td>
                    <td>{formatDuration(game.duration)}</td>
                    <td>{game.winner || "-"}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          ) : (
            <div className="no-results">
              <p>Немає результатів для відображення</p>
              <Button onClick={handleStartGame} variant="primary">
                Зіграти гру
              </Button>
            </div>
          )}
        </div>

        {results.length > 0 && (
          <div className="clear-section">
            <Button onClick={clearResults} variant="dark">
              Очистити історію
            </Button>
          </div>
        )}
      </div>
    </Layout>
  );
};

export default StatsPage;
