import {
  Control,
  FieldPath,
  FieldValues,
  useController,
} from "react-hook-form";

import { PropsInputBaseType, TextField } from "../../components/ui/textField";

type PropsType<T extends FieldValues> = {
  control: Control<T>;
  name: FieldPath<T>;
} & Omit<PropsInputBaseType, "onChange" | "value">;

export const ControlTextField = <T extends FieldValues>({
  control,
  name,
  ...rest
}: PropsType<T>) => {
  const {
    field: { value, onChange },
    fieldState: { error },
  } = useController({
    name,
    control,
  });

  return (
    <TextField
      {...rest}
      error={error?.message}
      value={value}
      onChange={onChange}
    />
  );
};
