import React from "react";

import { useMeQuery } from "../../../decs-query.ts";
import { Profile } from "../../components/ui/profile";

import s from "./ProfilePage.module.scss";

const ProfilePage = () => {
  const { data } = useMeQuery();

  return (
    <div className={s.prof}>
      <Profile name={data?.name} email={data?.email} />
    </div>
  );
};

export default ProfilePage;
