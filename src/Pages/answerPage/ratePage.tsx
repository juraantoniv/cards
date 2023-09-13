import React from "react";

import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";

import { useAppSelector } from "../../../store.ts";
import IconWiDirectionLeft from "../../assets/icons/IconWiDirectionLeft.tsx";
import { Button } from "../../components/ui/button";
import Learn from "../../components/ui/learnPackComponent/learn.tsx";
import { Typography } from "../../components/ui/typography";
import {
  useGetRandomCardQuery,
  useSetRateMutation,
} from "../../services/decs-query.ts";
import { decksSlice } from "../../services/slices.ts";

import sx from "./ratePage.module.scss";

const RatePage = () => {
  const navigate = useNavigate();

  const dispatch = useDispatch();
  const id = useAppSelector((state) => state.decksSlice.id);
  const prevId = useAppSelector((state) => state.decksSlice.previousCard);
  const deckId = useAppSelector((state) => state.decksSlice.deckId);

  const { data } = useGetRandomCardQuery({
    id: `${id}`,
    cardId: prevId,
  });

  const [setRate] = useSetRateMutation();

  const onclickHandler = () => {
    dispatch(decksSlice.actions.setPrevious(data?.id));
    navigate("/learn");
  };

  const onChangeValueHandler = (value: string) => {
    setRate({ id: id, cardId: data?.id, grade: Number(value) });
  };

  const naw = () => {
    navigate(`/decks/${deckId}`);
  };

  return (
    <div className={sx.card}>
      <div className={sx.buttons} onClick={naw}>
        <IconWiDirectionLeft />
        <Button variant={"secondary"}>
          <Typography variant={"body2"}>Back to Pack list</Typography>
        </Button>
      </div>
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
