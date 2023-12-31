import { useAppDispatch, useAppSelector } from "../../../store.ts";
import { SliderBar } from "../../components/ui/slider";
import { decksSlice } from "../../services/slices.ts";

const SliderPage = () => {
  const dispatch = useAppDispatch();
  const countCards = useAppSelector((state) => state.decksSlice.cardsCount);

  const sentCount = (count: Array<number>) => {
    dispatch(decksSlice.actions.setCardCount(count));
  };

  return (
    <>
      <SliderBar onValueCommit={sentCount} startArrayValue={countCards} />
    </>
  );
};

export default SliderPage;
