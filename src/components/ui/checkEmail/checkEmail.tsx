import { useNavigate } from "react-router-dom";

import { useMeQuery } from "../../../../decs-query.ts";
import { useAppSelector } from "../../../../store.ts";
import { decksResponse } from "../../../../types.ts";
import { IconForComponentCheckEmail } from "../../../assets/icons/iconForComponentCheckEmail.tsx";
import { Button } from "../button";
import { CardComponent } from "../cardComponent";
import { Typography } from "../typography";

import st from "./checkEmail.module.scss";

export const CheckEmail = () => {
  const navigate = useNavigate();
  const email = useAppSelector((state) => state.decksSlice.name);

  const onClickHandler = () => {
    navigate("/login");
  };

  return (
    <CardComponent className={st.card}>
      <Typography variant="large">Check Email</Typography>
      <IconForComponentCheckEmail width="95" height="95" />
      <Typography className={st.text} variant="body2">
        We’ve sent an Email with instructions to {email}
      </Typography>
      <Button className={st.button} onClick={onClickHandler} fullWidth={true}>
        Back to Sign In
      </Button>
    </CardComponent>
  );
};
