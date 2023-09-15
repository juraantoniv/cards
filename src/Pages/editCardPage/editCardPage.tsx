import { FC } from "react";

import { createDecks, DecksForm } from "../../components/ui/createDecks";
import { useEditCardMutation } from "../../services/decs-query.ts";

type editType = {
  id?: string;
  callback?: () => void;
  headerName?: string;
  editModeCard: boolean;
  editCardHandler: (data: createDecks) => void;
};
const EditCardPage: FC<editType> = ({
  id,
  headerName,

  callback,
  editModeCard,
  editCardHandler: EditHandler,
}) => {
  useEditCardMutation();

  const editCardHandler = (data: createDecks) => {
    EditHandler(data);
  };

  return (
    <>
      <DecksForm
        carId={id}
        dataHandler={editCardHandler}
        headerName={headerName}
        callback={callback}
        editModeCard={editModeCard}
        question={"Question"}
      />
    </>
  );
};

export default EditCardPage;
