import React from "react";

import { createDecks, DecksForm } from "../../components/ui/createDecks";
import { useCreateDeckMutation } from "../../services/decs-query.ts";

type CreateType = {
  id?: string;
  callback?: () => void;
  headerName: string;
};

export const CreateDeckPage: React.FC<CreateType> = ({
  id,
  callback,
  headerName,
}) => {
  const [createDeck, {}] = useCreateDeckMutation();

  const onCreateDeckHandler = (data: createDecks) => {
    createDeck({ name: data.question, isPrivate: data.isPrivate });
  };

  return (
    <>
      <DecksForm
        id={id}
        callback={callback}
        headerName={headerName}
        dataHandler={onCreateDeckHandler}
      />
    </>
  );
};
