import { useState } from "react";

import * as Slider from "@radix-ui/react-slider";

import st from "./slider.module.scss";

type PropsType = {
  startArrayValue: number[];
  onValueCommit: (value: number[]) => void;
};

export const SliderBar = ({ startArrayValue, onValueCommit }: PropsType) => {
  const [value, setValue] = useState(startArrayValue);
  const handlerOnValueChange = (event: number[]) => {
    setValue([event[0], event[1]]);
  };

  const handlerOnValueCommit = () => {
    onValueCommit(value);
  };

  return (
    <div className={st.common}>
      <div className={st.value}>{value[0]}</div>
      <Slider.Root
        name={"slider"}
        onValueCommit={handlerOnValueCommit}
        min={0}
        max={20}
        value={[value[0], value[1]]}
        onValueChange={handlerOnValueChange}
        className={st.SliderRoot}
      >
        <Slider.Track className={st.SliderTrack}>
          <Slider.Range />
        </Slider.Track>
        <Slider.Thumb className={st.SliderThumb} />
        <Slider.Thumb className={st.SliderThumb} />
      </Slider.Root>
      <div className={st.value}>{value[1]}</div>
    </div>
  );
};
