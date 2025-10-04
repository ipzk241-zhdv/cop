import { useNavigation } from "../hooks/useNavigation";
import { useGameSettings } from "../hooks/useGameSettings";
import StartPage from "../pages/StartPage/StartPage";
import GamePage from "../pages/GamePage/GamePage";
import ResultPage from "../pages/ResultPage/ResultPage";
import "./App.css";

function App() {
  const { currentPage, gameResult, gameState, navigateTo, handleGameFinish } =
    useNavigation();
  const { settings, saveSettings } = useGameSettings();

  return (
    <div className="app">
      {currentPage === "start" && (
        <StartPage
          onNavigate={navigateTo}
          settings={settings}
          onSaveSettings={saveSettings}
        />
      )}
      {currentPage === "game" && (
        <GamePage
          onNavigate={navigateTo}
          onGameFinish={handleGameFinish}
          settings={settings}
        />
      )}
      {currentPage === "results" && (
        <ResultPage
          onNavigate={navigateTo}
          result={gameResult}
          gameState={gameState}
        />
      )}
    </div>
  );
}

export default App;
