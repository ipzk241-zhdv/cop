/** @module StartPage */
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import Button from "../../components/ui/Button";
import SettingsForm from "../../components/game/SettingsForm";
import Modal from "../../components/ui/Modal";
import { useSettingsStore } from "../../stores/useSettingsStore";
import "./StartPage.css";

/**
 * Landing page component.
 * Allows users to start a game, open settings, or view the global leaderboard.
 * @returns {JSX.Element} The application start screen.
 */
const StartPage = () => {
    /**
     * @name showSettings
     * @type {boolean}
     * @description State hook to control the visibility of the settings modal.
     * @inner
     */
    const [showSettings, setShowSettings] = useState(false);
    const navigate = useNavigate();
    const { boardSize, winningLength } = useSettingsStore();

    const generateUserId = () => {
        return `user_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
    };

    /**
     * Generates a new user ID and navigates to the game route.
     */
    const handleStartGame = () => {
        const userId = generateUserId();
        navigate(`/game/${userId}`);
    };

    return (
        <div className="page start-page">
            <h1>Хрестики-Нулики</h1>
            <div className="start-actions">
                <Button onClick={handleStartGame} variant="primary">
                    Почати гру
                </Button>
                <Button onClick={() => setShowSettings(true)} variant="outline">
                    Налаштування
                </Button>
                <Button onClick={() => navigate("/stats")} variant="dark">
                    Таблиця результатів
                </Button>
            </div>

            <Modal isOpen={showSettings} onClose={() => setShowSettings(false)}>
                <SettingsForm onClose={() => setShowSettings(false)} />
            </Modal>
        </div>
    );
};

export default StartPage;
