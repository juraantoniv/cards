import React, { useState } from "react";

import { navigate } from "@storybook/addon-links";
import { useNavigate, useParams } from "react-router-dom";
import { ToastContainer } from "react-toastify";

import {
  useCreateCardMutation,
  useDeleteCardMutation,
  useGetCardsQuery,
} from "../../../decs-query.ts";
import IconDots from "../../assets/icons/iconDots.tsx";
import IconDotsVerticalCircleOutline from "../../assets/icons/iconDots.tsx";
import IconDotsVerticalCircle from "../../assets/icons/iconDots.tsx";
import IconWiDirectionLeft from "../../assets/icons/IconWiDirectionLeft.tsx";
import { Delete } from "../../components/deletePopComponent/detete.tsx";
import { Button } from "../../components/ui/button";
import { DecksForm } from "../../components/ui/createDecks";
import { DropdownMenuComponent } from "../../components/ui/drop-down-menu";
import { NotFoundPage } from "../../components/ui/notFound/notFoundPage.tsx";
import { TableDecksItems } from "../../components/ui/tableDecksItems";
import { TextField } from "../../components/ui/textField";
import { Typography } from "../../components/ui/typography";
import { ControlTextField } from "../controlTextField/controlTextField.tsx";

import s from "./card.module.scss";

const headerDecksItems = [
  { key: "name", title: "Question" },
  { key: "cardsCount", title: "Answer" },
  { key: "updated", title: "Last Updated" },
  { key: "created", title: "Rate" },
  { key: "created", title: "Options" },
];

const Cards = () => {
  const { id } = useParams();
  const [name, setName] = useState("");

  const { data } = useGetCardsQuery({
    id: id,
    question: `${name}`,
  });

  const [createCard, {}] = useCreateCardMutation();
  const [show, setShow] = useState(false);
  const [form, showForm] = useState(false);
  const [CardId, setCardId] = useState("");

  const navigate = useNavigate();
  const onChangeHandler = () => {
    showForm(true);
  };

  const [deleteCard] = useDeleteCardMutation();

  const ShowItem = (id: string) => {
    setShow(true);
    setCardId(id);
  };

  const createCardHandler = (question: string, answer: string) => {
    createCard({ question: question, answer: answer, id: id });
  };

  const onShow = () => {
    showForm(false);
  };

  const deleteCardFromProps = () => {
    deleteCard(CardId);
    setShow(false);
  };

  const naw = () => {
    navigate(-1);
  };

  return (
    <div className={s.card}>
      <ToastContainer
        position="top-right"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="light"
      />
      {show && (
        <div className={s.show}>
          <Delete hide={onShow} callback={deleteCardFromProps} />
        </div>
      )}

      <div>
        <div className={s.buttons} onClick={naw}>
          <IconWiDirectionLeft />
          <Button variant={"secondary"}>
            <Typography variant={"body2"}>Back to Pack list</Typography>
          </Button>
        </div>
        <div className={s.box}>
          <div className={s.header}>
            <div>
              <Typography variant={"body2"}>My Pack</Typography>
            </div>
            <DropdownMenuComponent
              children={<IconDotsVerticalCircle />}
              arrItems={["Learn", "Edit", "Delete"]}
            />
          </div>
          <div>
            <Button onClick={onChangeHandler}>
              <Typography variant={"body2"}>CreateCard</Typography>
            </Button>
          </div>
        </div>

        <TextField
          type={"email"}
          valueInput={name}
          setValueInput={(event) => setName(event)}
        />
      </div>

      <div>
        {/*<TextField*/}
        {/*  value={name}*/}
        {/*  onChange={(e) => setName(e.currentTarget.value)}*/}
        {/*/>*/}
      </div>
      {data?.items?.length > 0 ? (
        <TableDecksItems
          dataContentTable={data}
          callback={ShowItem}
          dataHeadersTable={headerDecksItems}
        />
      ) : (
        <NotFoundPage />
      )}
      {form && (
        <div className={s.form}>
          <DecksForm
            id={id}
            callback={onShow}
            headerName={"Add New Pack"}
            func={createCardHandler}
          />
        </div>
      )}
    </div>
  );
};

export default Cards;
