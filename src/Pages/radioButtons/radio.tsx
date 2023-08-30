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
      <FormLabel id="demo-radio-buttons-group-label">Gender</FormLabel>
      <RadioGroup
        aria-labelledby="demo-radio-buttons-group-label"
        defaultValue="female"
        name="radio-buttons-group"
        onChange={(e) => onchangeHandler(e.currentTarget.value)}
      >
        <FormControlLabel value="1" control={<Radio />} label="Female" />
        <FormControlLabel value="2" control={<Radio />} label="Male" />
        <FormControlLabel value="3" control={<Radio />} label="Other" />
        <FormControlLabel value="4" control={<Radio />} label="Other" />
        <FormControlLabel value="5" control={<Radio />} label="Other" />
      </RadioGroup>
    </FormControl>
  );
};
