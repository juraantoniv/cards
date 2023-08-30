import * as React from "react";

import FormControl from "@mui/material/FormControl";
import FormControlLabel from "@mui/material/FormControlLabel";
import FormLabel from "@mui/material/FormLabel";
import Radio from "@mui/material/Radio";
import RadioGroup from "@mui/material/RadioGroup";

export type radio = {
  callback?: (rate: string) => void;
};
export const RadioButtonsGroup: React.FC<radio> = ({ callback }) => {
  const onchangeHandler = (value: string) => {
    if (callback) {
      callback(value);
    }
  };

  return (
    <FormControl>
      <FormLabel style={{ color: "white" }} id="demo-radio-buttons-group-label">
        Rate yourself:
      </FormLabel>
      <RadioGroup
        aria-labelledby="demo-radio-buttons-group-label"
        defaultValue="1"
        name="radio-buttons-group"
        onChange={(e) => onchangeHandler(e.currentTarget.value)}
      >
        <FormControlLabel value="1" control={<Radio />} label="Did not know" />
        <FormControlLabel value="2" control={<Radio />} label="Forgot" />
        <FormControlLabel
          value="3"
          control={<Radio />}
          label="A lot of thought"
        />
        <FormControlLabel value="4" control={<Radio />} label="Сonfused" />
        <FormControlLabel
          value="5"
          control={<Radio />}
          label="Knew the answer"
        />
      </RadioGroup>
    </FormControl>
  );
};
