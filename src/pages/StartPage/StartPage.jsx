import { useState } from "react";
import Layout from "../../components/ui/Layout";
import Button from "../../components/ui/Button";
import SettingsForm from "../../components/game/SettingsForm";
import Modal from "../../components/ui/Modal";
import "./StartPage.css";

const StartPage = ({ onNavigate, settings, onSaveSettings }) => {
  const [showSettings, setShowSettings] = useState(false);

  return (
    <Layout>
      <div className="page start-page">
        <h1>Хрестики-Нулики</h1>

        <div className="start-actions">
          <Button onClick={() => onNavigate("game")} variant="primary">
            Почати гру
          </Button>
          <Button onClick={() => setShowSettings(true)} variant="outline">
            Налаштування
          </Button>
        </div>

        <Modal isOpen={showSettings} onClose={() => setShowSettings(false)}>
          <SettingsForm
            settings={settings}
            onSave={onSaveSettings}
            onClose={() => setShowSettings(false)}
          />
        </Modal>
      </div>
    </Layout>
  );
};

export default StartPage;
