import type { Meta, StoryObj } from "@storybook/react";

import { Card } from "./card.tsx";

const meta = {
  title: "Components/Card",
  component: Card,
  tags: ["autodocs"],
  argTypes: {
    children: {
      description: "div",
    },
  },
} satisfies Meta<typeof Card>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Child: Story = {
  args: {
    children: "yop",
  },
};
