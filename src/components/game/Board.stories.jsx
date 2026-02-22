import React from "react";
import Board from "./Board";
import "./Board.css"; // Обов'язково імпортуйте стилі сюди, якщо вони не підтягнулися
import "./Cell.css";
import "../../styles/variables.css";
// Якщо Cell має свої стилі, вони теж мають бути доступні

export default {
    title: "Game/Board",
    component: Board,
    tags: ["autodocs"],
    argTypes: {
        onCellClick: { action: "cell-clicked" }, // Це змусить Storybook логувати кліки
        board: { control: "object" },
        disabled: { control: "boolean" },
        isResultView: { control: "boolean" },
    },
};

export const Empty3x3 = {
    args: {
        board: [
            [null, null, null],
            [null, null, null],
            [null, null, null],
        ],
        disabled: false,
    },
};

// Додайте цю сторі, щоб перевірити, чи працюють класи 'X' та 'O'
export const FullBoard = {
    args: {
        board: [
            ["X", "O", "X"],
            ["O", "X", "O"],
            ["X", null, "O"],
        ],
        disabled: false,
    },
};
