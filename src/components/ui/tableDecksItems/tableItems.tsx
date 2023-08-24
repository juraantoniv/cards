import { useState } from "react";

import Rating from "@mui/material/Rating";

import { carsdType } from "../../../../decs-query.ts";
import { ArrowIconDown } from "../../../assets/icons/arrowIconDown.tsx";
import { ArrowUpIcon } from "../../../assets/icons/arrowUpIcon.tsx";
import { DeleteIcon } from "../../../assets/icons/deleteIcon.tsx";
import { EditIcon } from "../../../assets/icons/editIcon.tsx";
import { PlayIcon } from "../../../assets/icons/playIcon.tsx";
import { RatingComponent } from "../starRating/startRatingComponent.tsx";

import st from "./tableDecks.module.scss";

type DataItemType = {
  title: string;
  cardsCount: number;
  updated: string;
  createdBy: string;
};
type DataHeaderType = {
  key: string;
  title: string;
};
type PropsType = {
  dataContentTable: carsdType;
  dataHeadersTable?: DataHeaderType[];
  sendDataToServer?: (value: string) => void;
  callback: (id: string) => void;
};
type SortType = {
  key: string;
  direction: "asc" | "desc";
} | null;
export const TableDecksItems = ({
  dataContentTable,
  dataHeadersTable,
  sendDataToServer,
  callback,
}: PropsType) => {
  const [sort, setSort] = useState<SortType>(null);
  const handlerSort = (key: string) => {
    console.log(key);
    if (key !== "action") {
      if (sort && sort.key === key) {
        const updatedSort: SortType = {
          key: key,
          direction: sort.direction === "asc" ? "desc" : "asc",
        };

        setSort(updatedSort);
        sendDataToServer(`${updatedSort.key}-${updatedSort.direction}`);
      } else {
        const updatedSort: SortType = {
          key: key,
          direction: "asc",
        };

        setSort(updatedSort);
        sendDataToServer(`${updatedSort.key}-${updatedSort.direction}`);
      }
    }
  };

  const handler = (deckId: string) => {
    callback(deckId);
  };

  return (
    <table className={st.table}>
      <thead>
        <tr className={st.header}>
          {dataHeadersTable?.map((el) => (
            <th
              key={el.key}
              className={st.thHeader}
              onClick={() => handlerSort(el.key)}
            >
              {el.title}
              {sort === null && <ArrowUpIcon />}
              {sort?.key === el.key && sort?.direction === "asc" && (
                <ArrowUpIcon />
              )}
              {sort?.key === el.key && sort?.direction === "desc" && (
                <ArrowIconDown />
              )}
              {sort && sort?.key !== el.key && <ArrowUpIcon />}
            </th>
          ))}
          <th></th>
        </tr>
      </thead>
      <tbody>
        {dataContentTable?.items.map((item) => (
          <tr key={item.id} className={st.tr}>
            <td className={st.tdCommonStyle}>{item.question}</td>
            <td className={st.tdCommonStyle}>{item.answer}</td>
            <td className={st.tdCommonStyle}>{item.created}</td>
            <td className={st.tdCommonStyle}>
              <Rating
                name={"rating"}
                defaultValue={1}
                value={item?.grade === 0 ? 1 : Number(item?.grade)}
              />
            </td>
            <td className={st.tdIcons}>
              <EditIcon />
              <DeleteIcon onClick={() => handler(item.id)} />
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
};
