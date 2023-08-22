import { ChevronDownIcon } from "@radix-ui/react-icons";
import * as Select from "@radix-ui/react-select";

import st from "./select.module.scss";

export type ItemType = {
  value: string;
  text: string;
};

type PropsType = {
  widthBlockSelector?: number;
  stateSelectItems: ItemType[];
  headerSelector: string;
  onValueChange: (value: string | undefined) => void;
};

export const SelectControl = ({
  widthBlockSelector,
  stateSelectItems,
  headerSelector,
  onValueChange,
}: PropsType) => {
  const handlerOnValueChange = (event: string) => {
    let res = stateSelectItems.find((e) => e.value === event);

    onValueChange(res?.text);
  };

  return (
    <Select.Root onValueChange={handlerOnValueChange}>
      <Select.Trigger
        style={{ width: widthBlockSelector }}
        className={st.selectTrigger}
      >
        <Select.Value className={st.title} placeholder={headerSelector} />

        <Select.Icon>
          <ChevronDownIcon />
        </Select.Icon>
      </Select.Trigger>

      <Select.Portal>
        <Select.Content
          style={{ width: widthBlockSelector }}
          className={st.selectContent}
          position="popper" /* - список строго под заголовком*/
        >
          <Select.Viewport>
            <Select.Group>
              {stateSelectItems.map((e) => {
                return (
                  <Select.Item
                    key={e.value}
                    className={st.item}
                    value={e.value}
                  >
                    <Select.ItemText className={st.itemText}>
                      {e.text}
                    </Select.ItemText>
                  </Select.Item>
                );
              })}
            </Select.Group>
          </Select.Viewport>
        </Select.Content>
      </Select.Portal>
    </Select.Root>
  );
};
