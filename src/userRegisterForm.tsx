import React from "react";

import { zodResolver } from "@hookform/resolvers/zod";
import { useController, useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { z } from "zod";

import { useCreateUserMutation } from "./services/decs-query.ts";

export type FormValuesReg = z.infer<typeof loginSchema>;

const MIN_PASSWORD_LENGTH = 3;

const loginSchema = z.object({
  name: z.string().min(3),
  email: z.string().email(),
  password: z.string().min(MIN_PASSWORD_LENGTH, { message: "Les than 3" }),
  subject: z.string().min(3, { message: "Les than 3" }),
});

type userREg = {
  name: string;
};

const UserRegisterForm = ({ name }: userREg) => {
  const [setUser, { isLoading }] = useCreateUserMutation();
  const navigate = useNavigate();
  const {
    register,
    handleSubmit,
    control,
    formState: { errors },
  } = useForm<FormValuesReg>({
    resolver: zodResolver(loginSchema),
  });

  // const {
  //   field: { value, onChange },
  // } = useController({
  //   name: "rememberMe",
  //   control,
  //   defaultValue: false,
  // });

  const onSubmit = (data: FormValuesReg) => {
    setUser(data);
    navigate("/login");
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <input {...register("name")} style={{ color: "black" }} />
      {errors?.email?.message && <div>{errors.email.message}</div>}
      <input {...register("email")} style={{ color: "black" }} />
      {errors?.email?.message && <div>{errors.email.message}</div>}
      <input {...register("password")} style={{ color: "black" }} />
      {errors?.password?.message && <div>{errors?.password.message}</div>}
      <input {...register("subject")} style={{ color: "black" }} />
      {errors?.email?.message && <div>{errors.subject?.message}</div>}
      {/*<input*/}
      {/*  type="checkbox"*/}
      {/*  style={{ color: "black" }}*/}
      {/*  checked={value}*/}
      {/*  onChange={onChange}*/}
      {/*/>*/}
      <button type="submit">Submit</button>
    </form>
  );
};

export default UserRegisterForm;
