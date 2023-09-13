import React, { useState } from "react";

import { DecksForm } from "../../components/ui/createDecks";
import { Profile } from "../../components/ui/profile";
import { useMeQuery } from "../../services/decs-query.ts";

import s from "./ProfilePage.module.scss";

const ProfilePage = () => {
  const { data } = useMeQuery();
  const [show, setShow] = useState(false);

  return (
    <div className={s.prof}>
      <Profile name={data && data?.name} email={data?.email} />
      {show && (
        <DecksForm
          forEditFlag={true}
          callback={() => setShow(false)}
          headerName={"Edit pack"}
        />
      )}
    </div>
  );
};

export default ProfilePage;
