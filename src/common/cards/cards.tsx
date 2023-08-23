import React, { useState } from "react";

import { useParams } from "react-router-dom";

import {
  useCreateCardMutation,
  useDeleteCardMutation,
  useGetCardsQuery,
} from "../../../decs-query.ts";
import { Delete } from "../../components/deletePopComponent/detete.tsx";
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
  const [show, setShow] = useState(false);
  const [CardId, setCardId] = useState("");

  const onChangeHandler = () => {
    createDeck({ name: name, id: id });
  };

  console.log(CardId);

  const [deleteCard] = useDeleteCardMutation();

  const ShowItem = (id: string) => {
    setShow(true);
    setCardId(id);
  };

  const onShow = () => {
    setShow(false);
  };

  const deleteCardFromProps = () => {
    deleteCard(CardId);
    setShow(false);
  };

  return (
    <div className={s.card}>
      {show && (
        <div className={s.show}>
          <Delete hide={onShow} callback={deleteCardFromProps} />
        </div>
      )}
      <div>
        <TextField
          value={name}
          onChange={(e) => setName(e.currentTarget.value)}
        />
        <Button onClick={onChangeHandler}>
          <Typography variant={"body2"}>CreateCard</Typography>
        </Button>
      </div>
      <TableDecksItems dataContentTable={data} callback={ShowItem} />
    </div>
  );
};

export default Cards;
