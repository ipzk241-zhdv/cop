import Button from "./Button";

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
        children: "Start Game",
        variant: "primary",
    },
};

export const Secondary = {
    args: {
        children: "Surrender",
        variant: "secondary",
    },
};

export const Disabled = {
    args: {
        children: "Wait...",
        variant: "primary",
        disabled: true,
    },
};
