import * as React from "react";
import { ChangeEvent, useState } from "react";

import AddAPhotoIcon from "@mui/icons-material/AddAPhoto";
import IconButton from "@mui/material/IconButton";
import { useForm } from "react-hook-form";

import { useCreateCardMutation } from "../../../decs-query.ts";
import { Button } from "../../components/ui/button/button.tsx";

import s from "./fileUpload.module.scss";

type FormData = {
  name: string;
  cover: File[];
};

export const FileUpload = () => {
  const { register, control, handleSubmit } = useForm<FormData>();

  const [createCard, {}] = useCreateCardMutation();

  const submit = (data: any) => {
    const formData = new FormData();

    formData.append("file", data.file[0]);

    createCard({ questionImg: formData });
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
              {...register("cover")}
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
