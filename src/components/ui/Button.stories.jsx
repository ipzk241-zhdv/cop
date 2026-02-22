import Button from "./Button";
import "./Button.css";

export default {
    title: "UI/Button",
    component: Button,
    tags: ["autodocs"],
    argTypes: {
        variant: {
            control: { type: "select" },
            options: ["primary", "secondary", "outline", "dark"],
        },
        disabled: { control: "boolean" },
        onClick: { action: "clicked" },
    },
};

export const Primary = {
    args: {
        children: "Грати знову",
        variant: "primary",
    },
};

export const Secondary = {
    args: {
        children: "Статистика",
        variant: "secondary",
    },
};

export const Dark = {
    args: {
        children: "Головне меню",
        variant: "dark",
    },
};
