import { toast } from "react-toastify";

import { createDecks, DecksForm } from "../../components/ui/createDecks";
import { useEditDeckMutation } from "../../services/decs-query.ts";

type CreateType = {
  id?: string;
  callback?: () => void;
  headerName?: string;
  forEditFlag: boolean;
};

export const EditDeckPage = ({
  id,
  callback,
  headerName,
  forEditFlag,
}: CreateType) => {
  const [editCard, {}] = useEditDeckMutation();

  const editCardHandler = (data: createDecks) => {
    editCard({ name: data.question, id: id ? id : "" })
      .unwrap()
      .then(() => {
        toast.success("Success deck name was changed");
      })
      .catch(() => {
        toast.error(`You can't modify a deck that you don't own"`);
      });

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
