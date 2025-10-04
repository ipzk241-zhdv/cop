import Modal from "../ui/Modal";
import Button from "../ui/Button";
import "./GameEndDialog.css";

const GameEndDialog = ({ isOpen, onClose, result, onNewGame, onMainMenu }) => {
  const getMessage = () => {
    if (!result) {
      return {
        title: "Гра завершена",
        message: "Гра була завершена.",
      };
    }

    if (result.isDraw) {
      return {
        title: "Нічия!",
        message: "🤝 Гра завершилась внічию.",
      };
    }

    if (result.reason === "surrender") {
      return {
        title: "Гра завершена!",
        message: `🏳️ Гравець ${result.winner} переміг через здачу суперника.`,
      };
    }

    return {
      title: "Перемога!",
      message: `🎉 Гравець ${result.winner} переміг!`,
    };
  };

  const { title, message } = getMessage();

  const handleViewResults = () => {
    onClose();
  };

  return (
    <Modal isOpen={isOpen} onClose={handleViewResults}>
      <div className="game-end-dialog">
        <h2 className="game-end-title">{title}</h2>
        <p className="game-end-message">{message}</p>

        <div className="game-end-actions">
          <Button onClick={onNewGame} variant="primary">
            Нова гра
          </Button>
          <Button onClick={handleViewResults} variant="secondary">
            Переглянути результати
          </Button>
          <Button onClick={onMainMenu} variant="dark">
            Головне меню
          </Button>
        </div>
      </div>
    </Modal>
  );
};

export default GameEndDialog;
