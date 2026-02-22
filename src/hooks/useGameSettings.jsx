/** @module useGameSettings */
import { useState, useEffect } from "react";

const DEFAULT_SETTINGS = {
    boardSize: 3,
    winningLength: 3,
};

/**
 * Custom hook for persisting and managing game configuration.
 * Syncs settings like board size and winning length with localStorage.
 * * @returns {Object} Settings state and persistence functions.
 */
export const useGameSettings = () => {
    /**
     * @name settings
     * @type {Object}
     * @property {number} boardSize - Size of the game grid.
     * @property {number} winningLength - Symbols in a row required to win.
     * @description Current game configuration.
     * @inner
     */
    const [settings, setSettings] = useState(DEFAULT_SETTINGS);

    /**
     * @name loadSettingsEffect
     * @description Effect hook that retrieves saved settings from localStorage on mount.
     * @inner
     */
    useEffect(() => {
        const savedSettings = localStorage.getItem("tic-tac-toe-settings");
        if (savedSettings) {
            setSettings(JSON.parse(savedSettings));
        }
    }, []);

    /**
     * Updates and persists new game settings.
     * @function saveSettings
     * @param {Object} newSettings - The new settings to apply.
     * @returns {Object} The updated settings object.
     */
    const saveSettings = (newSettings) => {
        const mergedSettings = { ...DEFAULT_SETTINGS, ...newSettings };
        setSettings(mergedSettings);
        localStorage.setItem(
            "tic-tac-toe-settings",
            JSON.stringify(mergedSettings),
        );
        return mergedSettings;
    };

    /**
     * Restores settings to default values and clears storage.
     * @function resetSettings
     */
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
