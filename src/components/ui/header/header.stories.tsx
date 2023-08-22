import { Meta, StoryObj } from "@storybook/react";

import { Button } from "../button";
import { DropdownMenuComponent } from "../drop-down-menu";

import { Header } from "./header.tsx";

const meta = {
  title: "Components/Header",
  component: Header,
  tags: ["autodocs"],
  argTypes: {},
} satisfies Meta<typeof Header>;

export default meta;

type Story = StoryObj<typeof meta>;

const button = () => {
  return <Button variant={"primary"}>Sign in</Button>;
};

const DropDown = () => {
  return (
    <>
      <DropdownMenuComponent arrItems={["My Profile", "Sign Out"]} />
    </>
  );
};

export const WithAvatar: Story = {
  args: {
    children: DropDown(),
    name: "Ivan",
  },
};
export const WithButton: Story = {
  args: {
    children: button(),
  },
};
