/** @module GameEndDialog */
import Modal from "../ui/Modal";
import Button from "../ui/Button";
import "./GameEndDialog.css";

/**
 * Dialog component that appears when the game session ends.
 * Displays the winner, draw status, or surrender message.
 * @param {Object} props - Component properties.
 * @param {boolean} props.isOpen - Controls the modal visibility.
 * @param {Function} props.onClose - Function to close the dialog.
 * @param {Object|null} props.result - Details of the game outcome.
 * @param {Function} props.onNewGame - Handler for starting a fresh game.
 * @param {Function} props.onMainMenu - Handler for returning to the start page.
 * @returns {JSX.Element} A Modal containing game results and actions.
 */
const GameEndDialog = ({ isOpen, onClose, result, onNewGame, onMainMenu }) => {
    /**
     * Formats the title and message based on the game result.
     * @returns {{title: string, message: string}} Formatted text for the UI.
     */
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
