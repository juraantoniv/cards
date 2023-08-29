import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { Link, useNavigate } from "react-router-dom";
import { z } from "zod";

import { useRecoveryPasswordMutation } from "../../../../decs-query.ts";
import { useAppDispatch } from "../../../../store.ts";
import { ControlTextField } from "../../../common/controlTextField/controlTextField.tsx";
import { decksSlice } from "../../../services/store.ts";
import { Button } from "../button";
import { CardComponent } from "../cardComponent";
import { Typography } from "../typography";

import st from "./forgotYourPassword.module.scss";

const forgotYourPasswordSchema = z.object({
  email: z.string().email(),
});

type FormForgotYourPasswordType = z.infer<typeof forgotYourPasswordSchema>;
export const ForgotYourPassword = () => {
  const dispatch = useAppDispatch();

  const { handleSubmit, control } = useForm<FormForgotYourPasswordType>({
    resolver: zodResolver(forgotYourPasswordSchema),
  });

  const [recovery, {}] = useRecoveryPasswordMutation();

  const navigate = useNavigate();

  const handlerOnSubmit = (data: any) => {
    recovery(data.email);
    dispatch(decksSlice.actions.getName(data.email));
    navigate("/checkEmail");
  };

  return (
    <form onSubmit={handleSubmit(handlerOnSubmit)}>
      <CardComponent className={st.card}>
        <Typography className={st.header} variant="large">
          Forgot your password?
        </Typography>
        <ControlTextField
          sizeWidthTextField="21.75rem"
          label="email"
          placeholder="Email"
          type="email"
          name="email"
          control={control}
        />
        <Typography className={st.text} variant="body2">
          Enter your email address and we will send you further instructions
        </Typography>
        <Button className={st.button} type={"submit"} fullWidth={true}>
          Send Instructions
        </Button>
        <Typography className={st.question} variant="body2">
          Did you remember your password?
        </Typography>
        <Typography className={st.link} variant="subtitle1">
          <Link to={"/login"}>Try logging in</Link>
        </Typography>
      </CardComponent>
    </form>
  );
};
