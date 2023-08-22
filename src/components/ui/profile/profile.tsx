import React from "react";

import { useNavigate } from "react-router-dom";

import iconUser from "../../../../src/assets/icons/iconUser.png";
import { IconEdit } from "../../../assets/icons/iconEdit.tsx";
import { Logout } from "../../../assets/icons/iconLogOut.tsx";
import { Button } from "../button";
import { CardComponent } from "../cardComponent";
import { Typography } from "../typography";

import st from "./profile.module.scss";

type ProfileProps = {
  name: string;
  email: string;
};

export const Profile: React.FC<ProfileProps> = ({ name, email }) => {
  const navigate = useNavigate();
  const handlerOnClick = () => {
    navigate("/login");
  };
  const handlerOnClickEditAvatar = () => {
    alert(
      "Я предположу что изменение аватарки это 1) выбрать некую картинку у себя из фоток. 2) сжать изображение. 3) эту картинку отправить на сервер. 4) придет положительный ответ и поместить картину на данное место",
    );
  };
  const handlerOnClickEditName = () => {
    navigate("/editProfile");
  };

  return (
    <CardComponent className={st.card}>
      <Typography variant="large">Personal Information</Typography>
      <div className={st.blockUserAndIcon}>
        <img className={st.iconUser} src={iconUser} />
        <IconEdit onClick={handlerOnClickEditAvatar} className={st.iconEdit} />
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
