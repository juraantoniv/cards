import * as Checkbox from "@radix-ui/react-checkbox";
import { CheckIcon } from "@radix-ui/react-icons";

import st from "./checkbox.module.scss";

export type PropsCheckboxComponentType = {
  checkboxText?: string;
  value?: boolean;
  onChange?: (value: boolean) => void;
  disabled?: boolean;
};

export const CheckboxUniversal = ({
  value,
  onChange,
  checkboxText,
  disabled,
}: PropsCheckboxComponentType) => {
  const handlerOnCheckedChange = (value: boolean) => {
    onChange?.(value);
  };

  return (
    <div>
      <label className={st.common}>
        <div
          className={
            disabled ? st.blockUnderCheckboxDisabled : st.blockUnderCheckbox
          }
        >
          <Checkbox.Root
            disabled={disabled}
            onCheckedChange={handlerOnCheckedChange}
            checked={value}
            className={value ? st.checkboxTrue : st.checkboxFalse}
          >
            <Checkbox.Indicator className={st.checkboxIndicator}>
              <CheckIcon />
            </Checkbox.Indicator>
          </Checkbox.Root>
        </div>

        <div>{checkboxText}</div>
      </label>
    </div>
  );
};
