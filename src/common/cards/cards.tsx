import React, { useState } from "react";

import LinearProgress from "@mui/material/LinearProgress/LinearProgress";
import { useNavigate, useParams } from "react-router-dom";
import { toast, ToastContainer } from "react-toastify";

import {
  useCreateCardMutation,
  useDeleteCardMutation,
  useDeleteDeckMutation,
  useGetCardsQuery,
  useGetDecksByIdQuery,
  useLazyGetDecksQuery,
} from "../../../decs-query.ts";
import { useAppDispatch, useAppSelector } from "../../../store.ts";
import IconDotsVerticalCircle from "../../assets/icons/iconDots.tsx";
import IconWiDirectionLeft from "../../assets/icons/IconWiDirectionLeft.tsx";
import { Delete } from "../../components/deletePopComponent/detete.tsx";
import { Button } from "../../components/ui/button";
import { DecksForm } from "../../components/ui/createDecks";
import { DropdownMenuComponent } from "../../components/ui/drop-down-menu";
import { Memo } from "../../components/ui/notFound/notFoundPage.tsx";
import { TableDecksItems } from "../../components/ui/tableDecksItems";
import { TextField } from "../../components/ui/textField";
import { Typography } from "../../components/ui/typography";
import { decksSlice } from "../../services/store.ts";

import s from "./card.module.scss";

const headerDecksItems = [
  { key: "name", title: "Question" },
  { key: "cardsCount", title: "Answer" },
  { key: "updated", title: "Last Updated" },
  { key: "created", title: "Rate" },
  { key: "created", title: "" },
];

const Cards = () => {
  const { id } = useParams();
  const [name, setName] = useState("");
  const dispatch = useAppDispatch();
  const showDeleteForm = useAppSelector(
    (state) => state.decksSlice.showDeleteForm,
  );

  const editForm = useAppSelector((state) => state.decksSlice.editMode);
  const { data, isLoading } = useGetCardsQuery({
    id: id,
    question: `${name}`,
  });

  const { data: deckName } = useGetDecksByIdQuery({
    id: `${id}`,
  });

  const [createCard, {}] = useCreateCardMutation();
  const [delDeck, {}] = useDeleteDeckMutation();

  const [show, setShow] = useState(false);
  const [form, showForm] = useState(false);
  const [edit, showEdit] = useState(false);
  const [CardId, setCardId] = useState("");

  const navigate = useNavigate();
  const onChangeHandler = () => {
    showForm(!show);
  };

  const closeFormHandler = () => {
    showForm(false);
    showEdit(false);
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
    setShow(!show);
  };

  const delMode = () => {
    dispatch(decksSlice.actions.showDeleteForm(!showDeleteForm));
  };

  const editMode = () => {
    dispatch(decksSlice.actions.editMode(!editForm));
  };

  const deleteCardFromProps = () => {
    deleteCard(CardId);
    setShow(false);
  };

  const [lasyFunc] = useLazyGetDecksQuery();

  const forEditHandler = (id: string) => {
    showEdit(true);
    setCardId(id);
  };
  const naw = () => {
    dispatch(decksSlice.actions.showDeleteForm(false));
    lasyFunc();
    navigate("/");
  };

  const deleteDeck = () => {
    toast.info("Pending");
    if (id) {
      delDeck(id)
        .unwrap()
        .then(() => {
          toast.success("Deleted");
          lasyFunc();
        });
    }

    dispatch(decksSlice.actions.showDeleteForm(false));
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
              <Typography variant={"body2"}>{deckName?.name}</Typography>
            </div>
            <DropdownMenuComponent
              arrItems={["Learn", "Edit", "Delete"]}
              id={id}
            >
              <IconDotsVerticalCircle />
            </DropdownMenuComponent>
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

      <div></div>
      {isLoading ? (
        <LinearProgress />
      ) : data?.items?.length > 0 ? (
        <TableDecksItems
          dataContentTable={data}
          callback={ShowItem}
          dataHeadersTable={headerDecksItems}
          for_editCallback={forEditHandler}
        />
      ) : (
        <Memo style={{ width: "100%", height: "400px" }} />
      )}
      {form && (
        <div className={s.form}>
          <DecksForm
            id={id}
            callback={closeFormHandler}
            headerName={"Add New Pack"}
            func={createCardHandler}
          />
        </div>
      )}
      {edit && (
        <div className={s.form}>
          <DecksForm
            id={CardId}
            callback={closeFormHandler}
            headerName={"EditCard"}
            editModeCard={true}
          />
        </div>
      )}
      {showDeleteForm && (
        <div className={s.show}>
          <Delete hide={delMode} callback={deleteDeck} />
        </div>
      )}
      {editForm && (
        <div className={s.show}>
          <DecksForm
            forEditFlag={true}
            id={id}
            callback={editMode}
            headerName={"Edit pack"}
            name={deckName}
          />
        </div>
      )}
    </div>
  );
};

export default Cards;
