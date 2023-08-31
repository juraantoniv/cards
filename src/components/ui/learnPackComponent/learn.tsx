import React from "react";

import { boolean } from "zod";

import { useGetRandomCardQuery } from "../../../../decs-query.ts";
import { useAppSelector } from "../../../../store.ts";
import {
  radio,
  RadioButtonsGroup,
} from "../../../Pages/radioButtons/radio.tsx";
import { Button } from "../button";
import { CardComponent } from "../cardComponent";
import { Typography } from "../typography";

import s from "./learn.module.scss";

export type lernType = {
  id: string;
  deckId: string;
  userId: string;
  question: string;
  answer: string;
  shots: number;
  answerImg: string;
  questionImg: string;
  questionVideo: string;
  answerVideo: string;
  rating: number;
  created: string;
  updated: string;
};

export type learnPropsType = {
  answer?: boolean;
  data?: lernType;
  callback: () => void;
  getValue?: (value: string) => void;
};
const Learn: React.FC<learnPropsType> = ({
  answer,
  data,
  callback,
  getValue,
}) => {
  const onChangeHandler = (value: string) => {
    getValue(value);
  };

  return (
    <CardComponent className={s.card}>
      <Typography className={s.text}>Learn “Pack Name”</Typography>
      <Typography className={s.text2}>Question:{data?.question}</Typography>
      <Typography className={s.text3}>
        Количество попыток ответов на вопрос:{data?.shots}
      </Typography>
      {answer && (
        <Typography className={s.text3}>Answer:{data?.answer}</Typography>
      )}
      {answer && <RadioButtonsGroup callback={onChangeHandler} />}
      <Button fullWidth={true} className={s.button} onClick={callback}>
        <Typography className={s.buttonText}>
          {answer ? "Next Question" : "Show Answer"}
        </Typography>
      </Button>
    </CardComponent>
  );
};

export default Learn;
