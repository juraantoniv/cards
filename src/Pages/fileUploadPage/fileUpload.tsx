import * as React from "react";
import { ChangeEvent, useState } from "react";

import AddAPhotoIcon from "@mui/icons-material/AddAPhoto";
import IconButton from "@mui/material/IconButton";

import { useCreateCardMutation } from "../../../decs-query.ts";
import { Button } from "../../stories/Button.tsx";

type FormData = {
  name: string;
  cover: File[];
};

export const FileUpload = (props: any) => {
  const [uploadedPhotos, setUploadedPhotos] = useState<FormData>([]);
  const [createCard, {}] = useCreateCardMutation();

  const uploadHandler = (e: ChangeEvent<HTMLInputElement>) => {
    const data1 = new FormData();
    const data2 = new FormData();
  };
  const crateCardHandler = () => {
    createCard({
      id: props.id,
      questionImg: uploadedPhotos[0],
      answerImg: uploadedPhotos[1],
      question: "ascsad",
      answer: "acdwcdwecwe",
    });
  };

  return (
    <div style={{ display: "flex", flexDirection: "column" }}>
      <label>
        <input
          type="file"
          onChange={uploadHandler}
          style={{ display: "none" }}
        />
        <IconButton component="span">
          <AddAPhotoIcon sx={{ color: "blue" }} />
        </IconButton>
      </label>

      <label>
        <input
          type="file"
          onChange={uploadHandler}
          style={{ display: "none" }}
        />
        <IconButton component="span">
          <AddAPhotoIcon sx={{ color: "blue" }} />
        </IconButton>
      </label>
      <Button
        label={"Create a card"}
        backgroundColor={"Blue"}
        onClick={crateCardHandler}
      ></Button>
    </div>
  );
};
