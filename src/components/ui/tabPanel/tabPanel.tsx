import * as Tabs from "@radix-ui/react-tabs";

import { Typography } from "../typography";

import st from "./tabPanel.module.scss";

export type itemTabType = {
  id: string;
  name: string;
  onClick: (name: string) => void;
  disabled: boolean;
};

type PropsType = {
  data?: itemTabType[];
  active?: string;
  title: string;
};

export const TabPanel = ({ data, active, title }: PropsType) => {
  return (
    <Tabs.Root className={st.common}>
      <Typography variant={"body2"}>{title}</Typography>
      <Tabs.List>
        {data?.map((e: itemTabType) => {
          return (
            <Tabs.Trigger
              disabled={e.disabled}
              onClick={() => e.onClick(e.name)}
              key={e.id}
              className={active === e.name ? st.active : st.tabTrigger}
              value={e.id}
            >
              <Typography variant={"body1"}>{e.name}</Typography>
            </Tabs.Trigger>
          );
        })}
      </Tabs.List>
    </Tabs.Root>
  );
};
