import type { Meta, StoryObj } from "@storybook/react";

import { CheckboxDemo } from "./checkbox.tsx";

const meta = {
  title: "Components/Checkbox",
  component: CheckboxDemo,
  tags: ["autodocs"],
  argTypes: {
    checked: {
      control: { type: "boolean" },
      description: "Specifies whether the checkbox is selected or not.",
    },
    disabled: {
      control: { type: "boolean" },
      description: "Specifies to disabled Checkbox.",
    },
  },
} satisfies Meta<typeof CheckboxDemo>;

export default meta;
type Story = StoryObj<typeof meta>;

export const True: Story = {
  args: {
    checked: true,
  },
};

export const False: Story = {
  args: {
    checked: false,
  },
};
export const Disabled: Story = {
  args: {
    disabled: true,
    checked: true,
  },
};

export const CallBack: Story = {
  args: {
    onChange: (checked) => console.warn(checked),
  },
};
