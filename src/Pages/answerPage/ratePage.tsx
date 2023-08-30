import React from "react";

import { useNavigate } from "react-router-dom";

import {
  useGetRandomCardQuery,
  useSetRateMutation,
} from "../../../decs-query.ts";
import { useAppSelector } from "../../../store.ts";
import Learn from "../../components/ui/learnPackComponent/learn.tsx";

const RatePage = () => {
  const navigate = useNavigate();
  const id = useAppSelector((state) => state.decksSlice.id);

  const { data } = useGetRandomCardQuery({
    id: `${id}`,
  });

  const [setRate] = useSetRateMutation();

  const onclickHandler = () => {
    navigate("/learn");
  };

  const onChangeValueHandler = (value: string) => {
    console.log(value);

    setRate({ id: id, cardId: data.id, grade: Number(value) });
  };

  return (
    <div>
      <Learn
        answer={true}
        callback={onclickHandler}
        data={data}
        getValue={onChangeValueHandler}
      />
    </div>
  );
};

export default RatePage;
