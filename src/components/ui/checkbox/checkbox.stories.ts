import type { Meta, StoryObj } from "@storybook/react";

import { CheckboxUniversal } from "./checkbox.tsx";

const meta = {
  title: "Components/Checkbox",
  component: CheckboxUniversal,
  tags: ["autodocs"],
  argTypes: {
    value: {
      control: { type: "boolean" },
      description: "Specifies whether the checkbox is selected or not.",
    },
    disabled: {
      control: { type: "boolean" },
      description: "Specifies to disabled Checkbox.",
    },
  },
} satisfies Meta<typeof CheckboxUniversal>;

export default meta;
type Story = StoryObj<typeof meta>;

export const True: Story = {
  args: {
    value: true,
  },
};

export const False: Story = {
  args: {
    value: false,
  },
};
export const Disabled: Story = {
  args: {
    disabled: true,
    value: true,
  },
};

export const CallBack: Story = {
  args: {
    onChange: (checked) => console.warn(checked),
  },
};
