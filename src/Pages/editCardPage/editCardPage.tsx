import React from "react";

import { useEditCardMutation } from "../../../decs-query.ts";
import { createDecks, DecksForm } from "../../components/ui/createDecks";

type editType = {
  id?: string;
  callback?: () => void;
  headerName?: string;
  editModeCard: boolean;
};
const EditCardPage: React.FC<editType> = ({
  id,
  headerName,

  callback,
  editModeCard,
}) => {
  const [editCard, {}] = useEditCardMutation();

  const editCardHandler = (data: createDecks) => {
    editCard({ question: data.question, answer: data.answer, id: id });
  };

  return (
    <>
      <DecksForm
        dataHandler={editCardHandler}
        headerName={headerName}
        callback={callback}
        editModeCard={editModeCard}
      />
    </>
  );
};

export default EditCardPage;
