import React from "react";

import { useDispatch } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";

import {
  useGetRandomCardQuery,
  useLazyGetCardsQuery,
  useLazyGetDecksQuery,
} from "../../../decs-query.ts";
import { useAppSelector } from "../../../store.ts";
import IconWiDirectionLeft from "../../assets/icons/IconWiDirectionLeft.tsx";
import s from "../../common/cards/card.module.scss";
import { Button } from "../../components/ui/button";
import Learn from "../../components/ui/learnPackComponent/learn.tsx";
import { Typography } from "../../components/ui/typography";

import sx from "./learPage.module.scss";

const LearnPage = () => {
  const { id: Params } = useParams();
  const navigate = useNavigate();
  const id = useAppSelector((state) => state.decksSlice.id);
  const prevId = useAppSelector((state) => state.decksSlice.previousCard);
  const deckId = useAppSelector((state) => state.decksSlice.deckId);
  const [lazyFunc] = useLazyGetCardsQuery();

  const { data } = useGetRandomCardQuery({
    id: `${id}`,
    cardId: `${prevId}`,
  });

  const naw = () => {
    lazyFunc();
    navigate(`/${deckId}`);
  };

  const onClickHandler = () => {
    navigate("/rate");
  };

  return (
    <div className={sx.card}>
      <div className={sx.buttons} onClick={naw}>
        <IconWiDirectionLeft />
        <Button variant={"secondary"}>
          <Typography variant={"body2"}>Back to Pack list</Typography>
        </Button>
      </div>
      <Learn answer={false} data={data} callback={onClickHandler} />
    </div>
  );
};

export default LearnPage;