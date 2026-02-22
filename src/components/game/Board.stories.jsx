import Board from "./Board";
import "./Board.css";
import "./Cell.css";
import "../../styles/variables.css";

export default {
    title: "Game/Board",
    component: Board,
    tags: ["autodocs"],
    decorators: [
        (Story) => (
            <div
                style={{
                    padding: "3rem",
                    background:
                        "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
                    display: "flex",
                    justifyContent: "center",
                    borderRadius: "8px",
                }}
            >
                <Story />
            </div>
        ),
    ],
    argTypes: {
        onCellClick: { action: "cell-clicked" },
        disabled: { control: "boolean" },
        isResultView: { control: "boolean" },
    },
};

export const Classic3x3 = {
    args: {
        board: [
            [null, null, null],
            [null, null, null],
            [null, null, null],
        ],
        disabled: false,
        isResultView: false,
    },
};

export const MidGame5x5 = {
    args: {
        board: [
            ["X", "O", null, null, null],
            [null, "X", "O", null, null],
            [null, null, "X", null, null],
            [null, null, null, null, null],
            [null, null, null, null, null],
        ],
        disabled: false,
        isResultView: false,
    },
};

export const FinishedGame = {
    args: {
        board: [
            ["X", "X", "X"],
            ["O", "O", null],
            [null, null, null],
        ],
        disabled: true,
        isResultView: true,
    },
};
