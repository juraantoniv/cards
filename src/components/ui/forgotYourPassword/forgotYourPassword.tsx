import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { Link } from "react-router-dom";
import { z } from "zod";

import { ControlTextField } from "../../../common/controlTextField/controlTextField.tsx";
import { Button } from "../button";
import { CardComponent } from "../cardComponent";
import { Typography } from "../typography";

import st from "./forgotYourPassword.module.scss";

const forgotYourPasswordSchema = z.object({
  email: z.string().email(),
});

type FormForgotYourPasswordType = z.infer<typeof forgotYourPasswordSchema>;
export const ForgotYourPassword = () => {
  const { handleSubmit, control } = useForm<FormForgotYourPasswordType>({
    resolver: zodResolver(forgotYourPasswordSchema),
  });

  console.log("yes");
  const handlerOnSubmit = (data: any) => {
    console.log(data);
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
        <Button className={st.button} fullWidth={true}>
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
