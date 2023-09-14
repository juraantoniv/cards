import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { Link } from "react-router-dom";
import { toast, ToastContainer } from "react-toastify";
import { omit } from "remeda";
import { z } from "zod";

import { ControlTextField } from "../../../common/controlTextField/controlTextField.tsx";
import { useCreateUserMutation } from "../../../services/decs-query.ts";
import { Button } from "../button";
import { CardComponent } from "../cardComponent";
import { Typography } from "../typography";

import st from "./register.module.scss";

const loginSchema = z
  .object({
    email: z.string().email(),
    password: z.string().min(4),
    confirmPassword: z.string().min(4),
  })
  .superRefine((data, ctx) => {
    if (data.password !== data.confirmPassword) {
      ctx.addIssue({
        message: "Passwords do not match",
        code: z.ZodIssueCode.custom,
        path: ["confirmPassword"],
      });
    }

    return data;
  });

export type errorType = {
  data: {
    errorMessages: Array<string>;
  };
  status: number;
};

// ctx. data - это объект, содержащий значения всех полей формы, которые будут проверяться на валидность. ctx - это объект, который предоставляет методы для добавления ошибок валидации.

export type FormType = z.infer<typeof loginSchema>;
export const Register = () => {
  const [setUser] = useCreateUserMutation();

  const { handleSubmit, control } = useForm<FormType>({
    resolver: zodResolver(loginSchema),
    mode: "onBlur",
    defaultValues: {
      email: "",
      password: "",
      confirmPassword: "",
    },
  });

  const handlerOnSubmit = (data: FormType) => {
    setUser(omit(data, ["confirmPassword"]))
      .unwrap()
      .then(() => {
        toast.success("Success registration. Please login");
      })
      .catch((e: errorType) => {
        e.data.errorMessages.forEach((e) => {
          toast.error(`${e}`);
        });
      });
  };

  return (
    <form onSubmit={handleSubmit(handlerOnSubmit)}>
      <CardComponent className={st.common}>
        <ToastContainer
          position="top-right"
          autoClose={5000}
          hideProgressBar={false}
          newestOnTop={false}
          closeOnClick
          rtl={false}
          pauseOnFocusLoss
          draggable
          pauseOnHover
          theme="dark"
        />
        <Typography className={st.singIn} variant="large">
          Sing In
        </Typography>
        <ControlTextField
          sizeWidthTextField="21.75rem"
          label="email"
          placeholder="Email"
          type="email"
          name="email"
          control={control}
        />
        <ControlTextField
          sizeWidthTextField="21.75rem"
          label="Password"
          placeholder="Password"
          type="password"
          name="password"
          control={control}
        />
        <ControlTextField
          sizeWidthTextField="21.75rem"
          label="confirmPassword"
          placeholder="confirmPassword"
          type="password"
          name="confirmPassword"
          control={control}
        />

        <Button className={st.button} type={"submit"} fullWidth={true}>
          Sing Up
        </Button>
        <Typography className={st.text} variant="body2">
          Already have an account?
        </Typography>
        <Typography className={st.singUp} variant="subtitle1">
          <Link to={"/"}>Sing In</Link>
        </Typography>
      </CardComponent>
    </form>
  );
};
