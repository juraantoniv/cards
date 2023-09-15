import { useNavigate } from "react-router-dom";

import { useAppSelector } from "../../../store.ts";
import IconWiDirectionLeft from "../../assets/icons/IconWiDirectionLeft.tsx";
import { Button } from "../../components/ui/button";
import Learn from "../../components/ui/learnPackComponent/learn.tsx";
import { Typography } from "../../components/ui/typography";
import { useGetRandomCardQuery } from "../../services/decs-query.ts";

import sx from "./learPage.module.scss";

const LearnPage = () => {
  const navigate = useNavigate();
  const id = useAppSelector((state) => state.decksSlice.id);
  const prevId = useAppSelector((state) => state.decksSlice.previousCard);
  const deckId = useAppSelector((state) => state.decksSlice.deckId);

  const { data } = useGetRandomCardQuery({
    id: `${id}`,
    cardId: `${prevId}`,
  });

  const naw = () => {
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
