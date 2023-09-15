import { action } from "@storybook/addon-actions";
import { Meta, StoryObj } from "@storybook/react";

import { SelectControl } from "./select.tsx";

const meta = {
  title: "Components/SelectControl",
  component: SelectControl,
  tags: ["autodocs"],
  argTypes: {},
} satisfies Meta<typeof SelectControl>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Select: Story = {
  args: {
    stateSelectItems: [
      { value: "11", text: "Apple" },
      { value: "22", text: "Banana" },
      { value: "33", text: "AppleAndBanana" },
    ],
    headerSelector: "Header Selector",
    onValueChange: action("Click"),
    widthBlockSelector: 200,
  },
};
