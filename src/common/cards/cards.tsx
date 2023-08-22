import React, { useState } from "react";

import { useParams } from "react-router-dom";

import {
  useCreateCardMutation,
  useGetCardsQuery,
} from "../../../decs-query.ts";
import { Button } from "../../components/ui/button";
import { TableDecksItems } from "../../components/ui/tableDecksItems";
import { TextField } from "../../components/ui/textField";
import { Typography } from "../../components/ui/typography";
import { ControlTextField } from "../controlTextField/controlTextField.tsx";

import s from "./card.module.scss";

const Cards = () => {
  const { id } = useParams();
  const [name, setName] = useState("");

  const { data } = useGetCardsQuery({
    id: id,
  });

  const [createDeck, {}] = useCreateCardMutation();

  const onChangeHandler = () => {
    createDeck({ name: name, id: id });
  };

  return (
    <div className={s.card}>
      <TextField
        value={name}
        onChange={(e) => setName(e.currentTarget.value)}
      />
      <Button onClick={onChangeHandler}>
        <Typography variant={"body2"}>CreateCard</Typography>
      </Button>
      <TableDecksItems dataContentTable={data} />
    </div>
  );
};

export default Cards;
