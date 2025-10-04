import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { useGameSettings } from "../hooks/useGameSettings";
import StartPage from "../pages/StartPage/StartPage";
import GamePage from "../pages/GamePage/GamePage";
import ResultPage from "../pages/ResultPage/ResultPage";
import Layout from "../components/ui/Layout";
import "./App.css";

function App() {
  const { settings, saveSettings } = useGameSettings();

  return (
    <Router>
      <div className="app">
        <Layout>
          <Routes>
            <Route
              path="/"
              element={
                <StartPage settings={settings} onSaveSettings={saveSettings} />
              }
            />
            <Route path="/game" element={<GamePage settings={settings} />} />
            <Route
              path="/game/:userId"
              element={<GamePage settings={settings} />}
            />
            <Route path="/results" element={<ResultPage />} />
            <Route path="/results/:userId" element={<ResultPage />} />
          </Routes>
        </Layout>
      </div>
    </Router>
  );
}

export default App;
