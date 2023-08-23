import * as React from "react";

import Rating from "@mui/material/Rating";
import Stack from "@mui/material/Stack";

export const RatingComponent = () => {
  return (
    <Stack spacing={1}>
      <Rating name="rating" precision={1} size={"small"} />
    </Stack>
  );
};
