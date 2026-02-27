/** @module CookiePopup */
import React, { useState, useEffect } from "react";
import Cookies from "js-cookie";

/**
 * Component for GDPR consent.
 * Uses {@link module:CookiePopup~useState|useState} and {@link module:CookiePopup~useEffect|useEffect}.
 * @returns {JSX.Element|null}
 */
const CookiePopup = () => {
    /**
     * @name isVisible
     * @type {boolean}
     * @description State hook to control the visibility of the popup.
     * @inner
     */
    const [isVisible, setIsVisible] = useState(false);

    /**
     * @name preferences
     * @type {Object}
     * @property {boolean} necessary - Required cookies (always true).
     * @property {boolean} analytics - User choice for analytics.
     * @description State hook to store granular cookie consent choices.
     * @inner
     */
    const [preferences, setPreferences] = useState({
        necessary: true,
        analytics: false,
    });

    /**
     * @name checkConsentEffect
     * @description Effect hook that checks for existing consent on component mount.
     * @inner
     */
    useEffect(() => {
        const consent = Cookies.get("user-cookie-consent");
        if (!consent) {
            setIsVisible(true);
        }
    }, []);

    /**
     * Saves current user preferences to cookies and hides the popup.
     */
    const handleSave = () => {
        Cookies.set("user-cookie-consent", JSON.stringify(preferences), {
            expires: 365,
        });
        setIsVisible(false);
    };

    /**
     * Accepts all cookie categories, saves the state, and hides the popup.
     */
    const handleAcceptAll = () => {
        const allIn = { necessary: true, analytics: true };
        Cookies.set("user-cookie-consent", JSON.stringify(allIn), {
            expires: 365,
        });
        setIsVisible(false);
    };

    if (!isVisible) return null;

    return (
        <div style={styles.overlay}>
            <div style={styles.modal}>
                <h3 style={{ marginTop: 0 }}>Налаштування конфіденційності</h3>

                <p style={styles.description}>
                    Наш сайт використовує <strong>Cookie</strong> та{" "}
                    <strong>LocalStorage</strong> для забезпечення стабільної
                    роботи інтерфейсу. Всі технічні дані зберігаються виключно у
                    вашому браузері, не передаються на сервер або третім особам
                    і використовуються лише для функціонування вашої дошки.
                </p>

                <div style={styles.option}>
                    <label style={styles.label}>
                        <input type="checkbox" checked disabled />
                        <span>
                            <strong>Технічно необхідні</strong> — зберігання
                            стану в LocalStorage. Потрібні для роботи базових
                            функцій сайту.
                        </span>
                    </label>
                </div>

                <div style={styles.option}>
                    <label style={styles.label}>
                        <input
                            type="checkbox"
                            checked={preferences.analytics}
                            onChange={(e) =>
                                setPreferences({
                                    ...preferences,
                                    analytics: e.target.checked,
                                })
                            }
                        />
                        <span>
                            <strong>Аналітичні</strong> — анонімні дані для
                            покращення зручності користування інтерфейсом.
                        </span>
                    </label>
                </div>

                <div style={styles.buttonGroup}>
                    <button onClick={handleSave} style={styles.btnSecondary}>
                        Зберегти вибір
                    </button>
                    <button onClick={handleAcceptAll} style={styles.btnPrimary}>
                        Прийняти всі
                    </button>
                </div>
            </div>
        </div>
    );
};

const styles = {
    overlay: {
        position: "fixed",
        bottom: "20px",
        left: "20px",
        right: "20px",
        zIndex: 2000,
        display: "flex",
        justifyContent: "center",
    },
    modal: {
        background: "white",
        padding: "20px",
        borderRadius: "8px",
        boxShadow: "0 4px 15px rgba(0,0,0,0.3)",
        maxWidth: "500px",
        color: "#333",
    },
    description: {
        fontSize: "14px",
        lineHeight: "1.5",
        marginBottom: "15px",
        color: "#555",
    },
    option: {
        marginBottom: "10px",
        padding: "10px",
        backgroundColor: "#f8f9fa",
        borderRadius: "6px",
    },
    label: {
        display: "flex",
        alignItems: "flex-start",
        gap: "10px",
        fontSize: "13px",
        cursor: "pointer",
    },
    buttonGroup: {
        display: "flex",
        gap: "10px",
        marginTop: "15px",
    },
    btnPrimary: {
        backgroundColor: "#667eea",
        color: "white",
        border: "none",
        padding: "8px 16px",
        borderRadius: "4px",
        cursor: "pointer",
        flex: 1,
    },
    btnSecondary: {
        backgroundColor: "#6c757d",
        color: "white",
        border: "none",
        padding: "8px 16px",
        borderRadius: "4px",
        cursor: "pointer",
        flex: 1,
    },
};

export default CookiePopup;
