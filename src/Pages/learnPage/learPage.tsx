import React from "react";

import { useNavigate } from "react-router-dom";

import { useGetRandomCardQuery } from "../../../decs-query.ts";
import { useAppSelector } from "../../../store.ts";
import Learn from "../../components/ui/learnPackComponent/learn.tsx";

const LearPage = () => {
  const navigate = useNavigate();
  const id = useAppSelector((state) => state.decksSlice.id);

  const { data } = useGetRandomCardQuery({
    id: `${id}`,
  });

  const onClickHandler = () => {
    navigate("/rate");
  };

  return (
    <div>
      <Learn answer={false} data={data} callback={onClickHandler} />
    </div>
  );
};

export default LearPage;
