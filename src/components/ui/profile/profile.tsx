import React, { ChangeEvent } from "react";

import IconButton from "@mui/material/IconButton";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";

import { IconEdit } from "../../../assets/icons/iconEdit.tsx";
import { Logout } from "../../../assets/icons/iconLogOut.tsx";
import {
  useLogOutMutation,
  useMeEditNicknameMutation,
  useMeQuery,
} from "../../../services/decs-query.ts";
import { AvatarDemo } from "../avatar/avatar.tsx";
import { Button } from "../button";
import { CardComponent } from "../cardComponent";
import { Typography } from "../typography";

import st from "./profile.module.scss";

type ProfileProps = {
  name: string | undefined;
  email: string | undefined;
};

type FormData = {
  name?: string;
  cover?: File[];
};

export const Profile: React.FC<ProfileProps> = ({ name, email }) => {
  const navigate = useNavigate();

  const { data } = useMeQuery();

  const [edit, {}] = useMeEditNicknameMutation();

  const { register } = useForm<FormData>();

  const [logOut, {}] = useLogOutMutation();
  const handlerOnClick = () => {
    logOut();
    navigate("/login");
  };

  const handlerOnClickEditName = () => {
    navigate("/editProfile");
  };

  const submit = (data: any) => {
    const formData = new FormData();

    formData.append("avatar", data[0]);
    edit({ avatar: formData });
  };

  return (
    <CardComponent className={st.card}>
      <Typography variant="large">Personal Information</Typography>
      <div className={st.blockUserAndIcon}>
        <AvatarDemo className={st.avatar} img={data?.avatar} />
        <label>
          <input
            type="file"
            style={{ display: "none" }}
            {...register("cover")}
            onChange={(event) => submit(event.currentTarget.files)}
          />
          <IconButton component="span">
            <IconEdit type={"submit"} className={st.iconEdit} />
          </IconButton>
        </label>
      </div>
      <div className={st.blockNameAndIcon}>
        <Typography variant="h1">{name}</Typography>
        <IconEdit onClick={handlerOnClickEditName} width="20" height="20" />
      </div>
      <Typography className={st.address} variant="body2">
        {email}
      </Typography>
      <Button variant={"primary"} onClick={handlerOnClick}>
        <Logout width="23" height="23" />
        Logout
      </Button>
    </CardComponent>
  );
};
