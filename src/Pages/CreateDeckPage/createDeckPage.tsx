import React from "react";

import { useCreateDeckMutation } from "../../../decs-query.ts";
import { createDecks, DecksForm } from "../../components/ui/createDecks";

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
        callback={callback}
        headerName={headerName}
        dataHandler={onCreateDeckHandler}
      />
    </>
  );
};
