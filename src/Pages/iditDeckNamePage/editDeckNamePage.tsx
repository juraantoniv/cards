import React from "react";

import { toast } from "react-toastify";

import {
  useEditDeckMutation,
  useLazyGetDecksQuery,
} from "../../../decs-query.ts";
import { createDecks, DecksForm } from "../../components/ui/createDecks";

type CreateType = {
  id?: string;
  callback?: () => void;
  headerName?: string;
  forEditFlag: boolean;
};

export const EditDeckPage: React.FC<CreateType> = ({
  id,
  headerName,
  callback,
  forEditFlag,
}) => {
  const [editCard, {}] = useEditDeckMutation();
  const [lazyFunc] = useLazyGetDecksQuery();
  const editCardHandler = (data: createDecks) => {
    editCard({ name: data.question, id: id })
      .unwrap()
      .then(() => {
        toast.success("Success");
      });
    lazyFunc();
    callback && callback();
  };

  return (
    <>
      <DecksForm
        id={id}
        dataHandler={editCardHandler}
        headerName={headerName}
        callback={callback}
        forEditFlag={forEditFlag}
      />
    </>
  );
};
