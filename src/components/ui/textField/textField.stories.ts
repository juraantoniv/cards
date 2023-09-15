import { action } from "@storybook/addon-actions";
import { Meta, StoryObj } from "@storybook/react";

import { TextField } from "./textField.tsx";

const meta = {
  title: "Components/TextField",
  component: TextField,
  tags: ["autodocs"],
  argTypes: {
    type: {
      options: ["email", "password", "text"],
    },
  },
} satisfies Meta<typeof TextField>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Email: Story = {
  args: {
    type: "email",
    label: "Input",
    disabled: false,
  },
};

export const Password: Story = {
  args: {
    type: "password",
    label: "Input",
    disabled: false,
  },
};

export const Text: Story = {
  args: {
    handlerOnChange: action("Send ValueInput"),
    type: "text",
    label: "Input",
    disabled: false,
  },
};

export const TextError: Story = {
  args: {
    type: "text",
    label: "Input",
    disabled: false,
    error: "Some Error!",
  },
};
