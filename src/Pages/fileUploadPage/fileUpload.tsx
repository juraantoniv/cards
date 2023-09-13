import * as React from "react";

import AddAPhotoIcon from "@mui/icons-material/AddAPhoto";
import IconButton from "@mui/material/IconButton";
import { useForm } from "react-hook-form";

import { Button } from "../../components/ui/button/button.tsx";
import { useCreateCardMutation } from "../../services/decs-query.ts";

import s from "./fileUpload.module.scss";

type FormData = {
  name?: string;
  cover?: File[];
  cover1?: File[];
  id: string;
};

type FileUploadType = {
  id: string;
  setData?: (data: any) => void;
};

export const FileUpload: React.FC<FileUploadType> = ({ id, setData }) => {
  const { register, handleSubmit } = useForm<FormData>();

  const [createCard, {}] = useCreateCardMutation();

  const submit = (data: any) => {
    const formData = new FormData();

    formData.append("questionImg", data.cover[0]);
    formData.append("question", "asd");

    formData.append("answerImg", data.cover1[0]);
    formData.append("answer", "asd1");
    createCard({ id, data: formData });
  };

  return (
    <div style={{ display: "flex", flexDirection: "column" }}>
      <form onSubmit={handleSubmit(submit)}>
        <div className={s.div}>
          <label>
            <input
              type="file"
              style={{ display: "none" }}
              {...register("cover")}
            />
            <IconButton component="span">
              <AddAPhotoIcon sx={{ color: "var(--primary-500, #8C61FF)" }} />
            </IconButton>
          </label>

          <label>
            <input
              type="file"
              style={{ display: "none" }}
              {...register("cover1")}
            />
            <IconButton component="span">
              <AddAPhotoIcon sx={{ color: "var(--primary-500, #8C61FF)" }} />
            </IconButton>
          </label>
        </div>

        <Button type={"submit"} variant={"primary"} className={s.button}>
          Add
        </Button>
      </form>
    </div>
  );
};
