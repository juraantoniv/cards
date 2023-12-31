import { useState } from "react";

import { useAppDispatch } from "../../../store.ts";
import { TabPanel } from "../../components/ui/tabPanel";
import { decksSlice } from "../../services/slices.ts";

const myId = "f4333448-5615-447f-beca-5893d431d8fe";

const TabPage = () => {
  const dispatch = useAppDispatch();

  const [active, setActive] = useState("All");
  const handlerTabPanel1 = (name: string) => {
    setActive(name);
    dispatch(decksSlice.actions.setAuthorId(myId));
  };
  const handlerTabPanel2 = (name: string) => {
    setActive(name);
    dispatch(decksSlice.actions.setAuthorId(""));
  };

  const data = [
    {
      id: "tab1",
      name: "MyCards",
      onClick: handlerTabPanel1,
      disabled: false,
    },
    {
      id: "tab2",
      name: "All",
      onClick: handlerTabPanel2,
      disabled: false,
    },
  ];

  return (
    <>
      <TabPanel title={"Show packs cards"} data={data} active={active} />
    </>
  );
};

export default TabPage;
