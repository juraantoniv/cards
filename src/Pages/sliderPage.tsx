import React, { useEffect } from "react";

import { useGetDecksQuery } from "../../decs-query.ts";
import { useAppDispatch, useAppSelector } from "../../store.ts";
import { SliderBar } from "../components/ui/slider";
import { decksSlice } from "../services/store.ts";

const SliderPage = () => {
  const dispatch = useAppDispatch();
  const countCards = useAppSelector((state) => state.decksSlice.cardsCount);

  const sentCount = (count: Array<number>) => {
    dispatch(decksSlice.actions.setCardCount(count));
  };

  const { isLoading, data } = useGetDecksQuery({
    minCardsCount: `${countCards[0]}`,
    maxCardsCount: `${countCards[1]}`,
  });

  return (
    <>
      <SliderBar onValueCommit={sentCount} startArrayValue={countCards} />
    </>
  );
};

export default SliderPage;
