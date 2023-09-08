import React from "react";

import { createDecks, DecksForm } from "../../components/ui/createDecks";

type CreateType = {
  callback?: () => void;
  headerName?: string;
  forEditFlag?: boolean;
  dataHandler: (data: createDecks) => void;
  id: string | undefined;
};

export const CreateCardPage: React.FC<CreateType> = ({
  callback,
  forEditFlag,
  headerName,
  dataHandler,
  id,
}) => {
  return (
    <>
      <DecksForm
        id={id}
        dataHandler={dataHandler}
        headerName={headerName}
        callback={callback}
        forEditFlag={forEditFlag}
        editModeCard={true}
      />
    </>
  );
};
