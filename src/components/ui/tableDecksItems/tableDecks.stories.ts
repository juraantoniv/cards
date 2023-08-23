import { action } from "@storybook/addon-actions";
import { Meta, StoryObj } from "@storybook/react";

import { TableDecks } from "./tableItems.tsx";

const meta = {
  title: "Components/TableDecks",
  component: TableDecks,
  tags: ["autodocs"],
  argTypes: {},
} satisfies Meta<typeof TableDecks>;

export default meta;
type Story = StoryObj<typeof meta>;

export const TableDecksComponent: Story = {
  args: {
    sendDataToServer: action("Send Query Sort"),
    dataContentTable: [
      {
        title: "Pack Name1",
        cardsCount: 10,
        updated: "2023-07-07",
        createdBy: "Ivan Ivanov",
      },
      {
        title: "Pack Name2",
        cardsCount: 5,
        updated: "2023-07-06",
        createdBy: "Ivan Ivanov",
      },
      {
        title: "Pack Name3",
        cardsCount: 8,
        updated: "2023-07-05",
        createdBy: "Ivan Ivanov",
      },
      {
        title: "Pack Name4",
        cardsCount: 3,
        updated: "2023-07-07",
        createdBy: "Ivan Ivanov",
      },
      {
        title: "Pack Name5",
        cardsCount: 12,
        updated: "2023-07-04",
        createdBy: "Ivan Ivanov",
      },
    ],
    dataHeadersTable: [
      {
        key: "name",
        title: "Name",
      },
      {
        key: "cardsCount",
        title: "Cards",
      },
      {
        key: "updated",
        title: "Last Updated",
      },
      {
        key: "createdBy",
        title: "Created by",
      },
    ],
  },
};
