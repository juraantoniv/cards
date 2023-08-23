import React from "react";

import { IconClose } from "../../assets/icons/iconClose.tsx";
import { Button } from "../ui/button";
import { CardComponent } from "../ui/cardComponent";
import { Typography } from "../ui/typography";

import s from "./delete.module.scss";

type buttonType = {
  callback: () => void;
  hide: () => void;
};

export const Delete: React.FC<buttonType> = ({ callback, hide }) => {
  const closeComponent = () => {
    hide();
  };

  const onDeleteHandler = () => {
    callback();
  };

  return (
    <CardComponent className={s.box}>
      <div className={s.headerContent}>
        <div className={s.header}>{"Delete Pack"}</div>
        <IconClose onClick={closeComponent} />
      </div>
      <div className={s.center}>
        <Typography variant={"body1"}>
          Do you really want to remove Card?
        </Typography>
      </div>
      <div className={s.buttons}>
        <Button onClick={closeComponent}>Cancel</Button>
        <Button onClick={onDeleteHandler}>
          <Typography variant={"body2"}>Delete</Typography>
        </Button>
      </div>
    </CardComponent>
  );
};
