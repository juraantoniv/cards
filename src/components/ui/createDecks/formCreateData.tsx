import React, { useState } from "react";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { z } from "zod";

import {
  useGetByIdQuery,
  useGetCardByIdQuery,
  useGetDecksByIdQuery,
} from "../../../../decs-query.ts";
import { IconClose } from "../../../assets/icons/iconClose.tsx";
import { ControlCheckbox2 } from "../../../common/controlCheckbox2/controlCheckbox2.tsx";
import { ControlTextField } from "../../../common/controlTextField/controlTextField.tsx";
import { FileUpload } from "../../../Pages/fileUploadPage/fileUpload.tsx";
import { Button } from "../button";
import { CardComponent } from "../cardComponent";
import { SelectControl } from "../select";
import { Typography } from "../typography";

import st from "./register.module.scss";

const loginSchema = z.object({
  question: z.string().min(3),
  answer: z.optional(z.string().min(3)),
  isPrivate: z.boolean().default(false),
});

export type createDecks = z.infer<typeof loginSchema>;

const selectState = [
  { value: "1", text: "Text" },
  { value: "2", text: "Image" },
];

type createDecksType = {
  callback?: () => void;
  headerName?: string;
  forEditFlag?: boolean;
  id?: string;
  func?: (question: string, answer: string) => void;
  editModeCard?: boolean;
  dataHandler: (data: createDecks) => void;
  carId?: string;
};

// ctx. data - это объект, содержащий значения всех полей формы, которые будут проверяться на валидность. ctx - это объект, который предоставляет методы для добавления ошибок валидации.

export const DecksForm: React.FC<createDecksType> = ({
  callback,
  headerName,
  forEditFlag,
  dataHandler,
  id,
  func,
  editModeCard,
  carId,
}) => {
  const { data: deck } = useGetByIdQuery({
    id: id,
  });

  const { data: card } = useGetCardByIdQuery({
    id: carId,
  });

  const item = id ? deck?.name : carId ? card?.question : "";

  const { handleSubmit, control } = useForm<createDecks>({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      question: item,
      answer: card?.answer,
    },
  });

  const [imageItems, setImagItems] = useState(true);

  const handlerOnSubmit = (data: createDecks) => {
    dataHandler(data);
  };

  const selectOnChangeHandler = (item: string) => {
    if (item === "Text") {
      setImagItems(true);
    }
    if (item === "Image") {
      setImagItems(false);
    }
  };

  return (
    <form onSubmit={handleSubmit(handlerOnSubmit)}>
      <CardComponent className={st.common}>
        <div className={st.header}>
          <Typography>{headerName}</Typography>
          <IconClose onClick={callback} />
        </div>

        {headerName === "Add new pack" || headerName === "Edit pack" ? null : (
          <SelectControl
            onValueChange={selectOnChangeHandler}
            stateSelectItems={selectState}
            headerSelector={"Text"}
          />
        )}
        {imageItems ? (
          <div className={st.centerCommonent}>
            <ControlTextField
              sizeWidthTextField="484px"
              label={headerName === forEditFlag ? "Question" : "Create"}
              type="text"
              name="question"
              control={control}
            />
            {editModeCard && (
              <ControlTextField
                sizeWidthTextField="484px"
                label="answer"
                type="text"
                name="answer"
                control={control}
              />
            )}
            {!func ||
              (headerName === "Edit pack" && (
                <ControlCheckbox2
                  label={"private pack"}
                  control={control}
                  name={"isPrivate"}
                />
              ))}
          </div>
        ) : (
          <FileUpload id={id} />
        )}
        {imageItems && (
          <div className={st.button}>
            <Button className={st.but1} onClick={callback}>
              <Typography variant={"body2"}>Cancel</Typography>
            </Button>
            <Button type={"submit"} className={st.but2}>
              <Typography variant={"body2"}>
                {headerName === forEditFlag ? "Edit" : "Create"}
              </Typography>
            </Button>
          </div>
        )}
      </CardComponent>
    </form>
  );
};
