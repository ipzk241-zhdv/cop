import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import StartPage from "../pages/StartPage/StartPage";
import GamePage from "../pages/GamePage/GamePage";
import ResultPage from "../pages/ResultPage/ResultPage";
import StatsPage from "../pages/StatsPage/StatsPage";
import "./App.css";

function App() {
  return (
    <Router>
      <div className="app">
        <Routes>
          <Route path="/" element={<StartPage />} />
          <Route path="/game" element={<GamePage />} />
          <Route path="/game/:userId" element={<GamePage />} />
          <Route path="/results" element={<ResultPage />} />
          <Route path="/results/:userId" element={<ResultPage />} />
          <Route path="/stats" element={<StatsPage />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
