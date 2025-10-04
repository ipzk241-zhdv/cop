import { useState, useEffect } from "react";

const DEFAULT_SETTINGS = {
  boardSize: 3,
  winningLength: 3,
};

export const useGameSettings = () => {
  const [settings, setSettings] = useState(DEFAULT_SETTINGS);

  useEffect(() => {
    const savedSettings = localStorage.getItem("tic-tac-toe-settings");
    if (savedSettings) {
      setSettings(JSON.parse(savedSettings));
    }
  }, []);

  const saveSettings = (newSettings) => {
    const mergedSettings = { ...DEFAULT_SETTINGS, ...newSettings };
    setSettings(mergedSettings);
    localStorage.setItem(
      "tic-tac-toe-settings",
      JSON.stringify(mergedSettings)
    );
    return mergedSettings;
  };

  const resetSettings = () => {
    setSettings(DEFAULT_SETTINGS);
    localStorage.removeItem("tic-tac-toe-settings");
  };

  return {
    settings,
    saveSettings,
    resetSettings,
  };
};
