/** @type { import('@storybook/react').Preview } */
import "../src/styles/variables.css";
import "../src/styles/index.css";
import "../src/styles/globals.css";

const preview = {
    parameters: {
        controls: {
            matchers: {
                color: /(background|color)$/i,
                date: /Date$/i,
            },
        },
        backgrounds: {
            default: "dark",
            values: [
                { name: "dark", value: "#1a1a1a" },
                { name: "light", value: "#ffffff" },
            ],
        },
    },
};

export default preview;
