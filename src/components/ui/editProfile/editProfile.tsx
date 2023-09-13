import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";

import { ControlTextField } from "../../../common/controlTextField/controlTextField.tsx";
import {
  useMeEditNicknameMutation,
  useMeQuery,
} from "../../../services/decs-query.ts";
import { AvatarDemo } from "../avatar/avatar.tsx";
import { Button } from "../button";
import { CardComponent } from "../cardComponent";
import { Typography } from "../typography";

import st from "./editProfile.module.scss";

const editProfileSchema = z.object({
  nickname: z.string().min(1),
});

type FormEditProfileType = z.infer<typeof editProfileSchema>;
export const EditProfile = () => {
  const { data } = useMeQuery();

  const { handleSubmit, control } = useForm<FormEditProfileType>({
    resolver: zodResolver(editProfileSchema),
    defaultValues: {
      nickname: data?.name,
    },
  });

  const [edit, {}] = useMeEditNicknameMutation();
  const handlerOnSubmit = (data: FormEditProfileType) => {
    edit({ name: data.nickname });
  };

  return (
    <form onSubmit={handleSubmit(handlerOnSubmit)} noValidate>
      <CardComponent className={st.card}>
        <Typography className={st.headear} variant="large">
          Personal Information
        </Typography>

        <AvatarDemo className={st.avatar} img={data?.avatar} />
        <ControlTextField
          sizeWidthTextField={"100%"}
          control={control}
          name="nickname"
          placeholder="Nickname"
          type="text"
          label="Nickname"
        />

        <Button type={"submit"} fullWidth={false} className={st.button}>
          Save Changes
        </Button>
      </CardComponent>
    </form>
  );
};
