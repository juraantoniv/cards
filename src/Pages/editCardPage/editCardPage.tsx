import React from "react";

import { createDecks, DecksForm } from "../../components/ui/createDecks";
import { useEditCardMutation } from "../../services/decs-query.ts";

type editType = {
  id?: string;
  callback?: () => void;
  headerName?: string;
  editModeCard: boolean;
  editCardHandler: (data: createDecks) => void;
};
const EditCardPage: React.FC<editType> = ({
  id,
  headerName,

  callback,
  editModeCard,
  editCardHandler: EditHandler,
}) => {
  const [editCard, {}] = useEditCardMutation();

  const dataForm = (data: any) => {
    editCard({ id: id, data: data });
  };

  const editCardHandler = (data: createDecks) => {
    EditHandler(data);
  };

  return (
    <>
      <DecksForm
        setData={dataForm}
        carId={id}
        dataHandler={editCardHandler}
        headerName={headerName}
        callback={callback}
        editModeCard={editModeCard}
      />
    </>
  );
};

export default EditCardPage;
