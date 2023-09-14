import React, { useState } from "react";

import LinearProgress from "@mui/material/LinearProgress/LinearProgress";
import { useNavigate, useParams } from "react-router-dom";
import { toast, ToastContainer } from "react-toastify";

import { useAppDispatch, useAppSelector } from "../../../store.ts";
import IconDotsVerticalCircle from "../../assets/icons/iconDots.tsx";
import IconWiDirectionLeft from "../../assets/icons/IconWiDirectionLeft.tsx";
import { Delete } from "../../components/deletePopComponent/detete.tsx";
import { Button } from "../../components/ui/button";
import { createDecks } from "../../components/ui/createDecks";
import { DropdownMenuComponent } from "../../components/ui/drop-down-menu";
import { Memo } from "../../components/ui/notFound/notFoundPage.tsx";
import { TableDecksItems } from "../../components/ui/tableDecksItems";
import { TextField } from "../../components/ui/textField";
import { Typography } from "../../components/ui/typography";
import { CreateCardPage } from "../../Pages/createCardPage/createCardPage.tsx";
import EditCardPage from "../../Pages/editCardPage/editCardPage.tsx";
import { EditDeckPage } from "../../Pages/iditDeckNamePage/editDeckNamePage.tsx";
import {
  useCreateCardMutation,
  useDeleteCardMutation,
  useDeleteDeckMutation,
  useEditCardMutation,
  useGetCardsQuery,
  useGetDecksByIdQuery,
  useGetDecksQuery,
  useLazyGetDecksQuery,
} from "../../services/decs-query.ts";
import { decksSlice } from "../../services/slices.ts";

import s from "./card.module.scss";

const headerDecksItems = [
  { key: "name", title: "Question" },
  { key: "cardsCount", title: "Answer" },
  { key: "updated", title: "Last Updated" },
  { key: "created", title: "Rate" },
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

  const [editCard, {}] = useEditCardMutation();

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

  const createCardHandler = (data: createDecks) => {
    createCard({ question: data.question, answer: data.answer, id: id });
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

  const { refetch } = useGetDecksQuery();

  const forEditHandler = (id: string) => {
    showEdit(true);
    setCardId(id);
  };
  const naw = () => {
    dispatch(decksSlice.actions.showDeleteForm(false));
    dispatch(decksSlice.actions.setAuthorId(""));
    refetch();
    navigate("/");
  };

  const editCardHandler = (data: createDecks) => {
    editCard({ question: data.question, answer: data.answer, id: CardId })
      .unwrap()
      .catch((e) => {
        toast.error(`${e.data.message}`);
      });
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
      navigate("/");
    }

    dispatch(decksSlice.actions.showDeleteForm(false));
  };

  return (
    <div className={s.card}>
      <ToastContainer
        posittion="top-right"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="dark"
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
          <CreateCardPage
            id={id}
            callback={closeFormHandler}
            headerName={"Add New Card"}
            dataHandler={createCardHandler}
          />
        </div>
      )}
      {edit && (
        <div className={s.form}>
          <EditCardPage
            editCardHandler={editCardHandler}
            id={CardId}
            callback={closeFormHandler}
            headerName={"EditCard"}
            editModeCard={true}
            question={"Question"}
          />
        </div>
      )}
      {showDeleteForm && (
        <div className={s.showDel}>
          <Delete hide={delMode} callback={deleteDeck} />
        </div>
      )}
      {editForm && (
        <div className={s.showEdit}>
          <EditDeckPage
            forEditFlag={true}
            id={id}
            callback={editMode}
            headerName={"Edit pack"}
          />
        </div>
      )}
    </div>
  );
};

export default Cards;
