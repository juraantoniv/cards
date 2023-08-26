import React from "react";

import { zodResolver } from "@hookform/resolvers/zod";
import { ClockIcon } from "@radix-ui/react-icons";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { z } from "zod";

import {
  useCreateDeckMutation,
  useEditCardMutation,
  useEditDeckMutation,
  useLazyGetDecksQuery,
} from "../../../../decs-query.ts";
import { IconClose } from "../../../assets/icons/iconClose.tsx";
import { ControlCheckbox2 } from "../../../common/controlCheckbox2/controlCheckbox2.tsx";
import { ControlTextField } from "../../../common/controlTextField/controlTextField.tsx";
import { Button } from "../button";
import { CardComponent } from "../cardComponent";
import { Typography } from "../typography";

import st from "./register.module.scss";

const loginSchema = z.object({
  question: z.string().min(3),
  answer: z.optional(z.string().min(3)),
  isPrivate: z.boolean().default(false),
});

type createDecksType = {
  name?: string;
  callback: () => void;
  headerName?: string;
  forEditFlag?: boolean;
  id?: string;
  func?: (question: string, answer: string) => void;
  editModeCard?: boolean;
};

// ctx. data - это объект, содержащий значения всех полей формы, которые будут проверяться на валидность. ctx - это объект, который предоставляет методы для добавления ошибок валидации.

type createDecks = z.infer<typeof loginSchema>;
export const DecksForm: React.FC<createDecksType> = ({
  callback,
  headerName,
  forEditFlag,
  id,
  func,
  name,
  editModeCard,
}) => {
  const [editCard, {}] = useEditCardMutation();
  const [createDeck, {}] = useCreateDeckMutation();
  const [editDeck, {}] = useEditDeckMutation();

  const { handleSubmit, control } = useForm<createDecks>({
    resolver: zodResolver(loginSchema),
  });

  const [lasyFunc] = useLazyGetDecksQuery();

  const handlerOnSubmit = (data: createDecks) => {
    if (!forEditFlag && !func && !editModeCard) {
      toast.info("Creating Decks");
      createDeck({ name: data.question, isPrivate: data.isPrivate })
        .unwrap()
        .then(() => {
          toast.success("Success");
          callback();
        })
        .catch(() => {
          toast.error("Wrong login or password");
        });
    } else if (forEditFlag) {
      editDeck({ name: data.question, id });
      lasyFunc();
    } else if (editModeCard) {
      editCard({ id: id, question: data.question, answer: data.answer });
      toast.success("Success");
    } else {
      func(data.question, data.answer);
      toast.success("Created card");
      callback();
    }
  };

  return (
    <form onSubmit={handleSubmit(handlerOnSubmit)}>
      <CardComponent className={st.common}>
        <div className={st.header}>
          <Typography>{headerName}</Typography>
          <IconClose onClick={callback} />
        </div>

        <div className={st.centerCommonent}>
          <ControlTextField
            sizeWidthTextField="484px"
            label={!forEditFlag ? "Create" : func ? "Question" : "Create"}
            type="text"
            name="question"
            control={control}
          />
          {(func || editModeCard) && (
            <ControlTextField
              sizeWidthTextField="484px"
              label="answer"
              type="text"
              name="answer"
              control={control}
            />
          )}
          {!func && (
            <ControlCheckbox2
              label={"private pack"}
              control={control}
              name={"isPrivate"}
            />
          )}
        </div>
        <div className={st.button}>
          <Button className={st.but1} onClick={callback}>
            <Typography variant={"body2"}>Cancel</Typography>
          </Button>
          <Button type={"submit"} className={st.but2}>
            <Typography variant={"body2"}>
              {headerName === "Edit pack" ? "Edit" : "Create"}
            </Typography>
          </Button>
        </div>
      </CardComponent>
    </form>
  );
};
