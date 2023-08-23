import React from "react";

import { zodResolver } from "@hookform/resolvers/zod";
import { ClockIcon } from "@radix-ui/react-icons";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { z } from "zod";

import {
  useCreateDeckMutation,
  useEditDeckMutation,
} from "../../../../decs-query.ts";
import { IconClose } from "../../../assets/icons/iconClose.tsx";
import { ControlCheckbox2 } from "../../../common/controlCheckbox2/controlCheckbox2.tsx";
import { ControlTextField } from "../../../common/controlTextField/controlTextField.tsx";
import { Button } from "../button";
import { CardComponent } from "../cardComponent";
import { Typography } from "../typography";

import st from "./register.module.scss";

const loginSchema = z.object({
  name: z.string().min(3),
  isPrivate: z.boolean().default(false),
});

type createDecksType = {
  callback: () => void;
  headerName?: string;
  forEditFlag: boolean;
  id?: string;
};

// ctx. data - это объект, содержащий значения всех полей формы, которые будут проверяться на валидность. ctx - это объект, который предоставляет методы для добавления ошибок валидации.

type createDecks = z.infer<typeof loginSchema>;
export const DecksForm: React.FC<createDecksType> = ({
  callback,
  headerName,
  forEditFlag,
  id,
}) => {
  const [createDeck, {}] = useCreateDeckMutation();
  const [editDeck, {}] = useEditDeckMutation();

  const { handleSubmit, control } = useForm<createDecks>({
    resolver: zodResolver(loginSchema),
  });

  const handlerOnSubmit = (data: createDecks) => {
    if (!forEditFlag) {
      toast.info("Creating Decks");
      createDeck({ name: data.name, isPrivate: data.isPrivate })
        .unwrap()
        .then(() => {
          toast.success("Success");
          callback();
        })
        .catch(() => {
          toast.error("Wrong login or password");
        });
    } else {
      editDeck({ name: data.name, id });
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
            label="name pack"
            placeholder={headerName === "Edit pack" ? "Edit" : "Create pack"}
            type="text"
            name="name"
            control={control}
          />
          <ControlCheckbox2
            label={"private pack"}
            control={control}
            name={"isPrivate"}
          />
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
