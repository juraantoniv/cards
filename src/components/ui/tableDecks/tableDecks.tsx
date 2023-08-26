import { useState } from "react";

import { useNavigate } from "react-router-dom";

import { useGetDecksQuery } from "../../../../decs-query.ts";
import { useAppDispatch } from "../../../../store.ts";
import { ArrowIconDown } from "../../../assets/icons/arrowIconDown.tsx";
import { ArrowUpIcon } from "../../../assets/icons/arrowUpIcon.tsx";
import { DeleteIcon } from "../../../assets/icons/deleteIcon.tsx";
import { EditIcon } from "../../../assets/icons/editIcon.tsx";
import { PlayIcon } from "../../../assets/icons/playIcon.tsx";
import { decksSlice } from "../../../services/store.ts";
import { Delete } from "../../deletePopComponent/detete.tsx";
import { DecksForm } from "../createDecks";
import { PaginationSamurai } from "../paginationSamurai";

import st from "./tableDecks.module.scss";

export type DataItemType = {
  id: string;
  name: string;
  cardsCount: number;
  updated: string;
  created: string;
  author: {
    name: string;
  };
};
type DataHeaderType = {
  key: string;
  title: string;
};
type PropsType = {
  dataContentTable: DataItemType[] | undefined;
  dataHeadersTable?: DataHeaderType[];
  sendDataToServer?: (value: string) => void;
  deleteItem: (id: string) => void;
  totalItems: number;
};
type SortType = {
  key: string;
  direction: "asc" | "desc";
} | null;
export const TableDecks = ({
  dataContentTable,
  dataHeadersTable,
  sendDataToServer,
  deleteItem,
  totalItems,
}: PropsType) => {
  const [sort, setSort] = useState<SortType>(null);
  const navigate = useNavigate();
  const dispatch = useAppDispatch();

  const [show, setShow] = useState(false);
  const [showForDelete, setShowForDelete] = useState(false);
  const [id, setId] = useState("");

  const handlerSort = (key: string) => {
    if (key !== "action") {
      if (sort && sort.key === key) {
        const updatedSort: SortType = {
          key: key,
          direction: sort.direction === "asc" ? "desc" : "asc",
        };

        setSort(updatedSort);
        if (sendDataToServer) {
          sendDataToServer(`${updatedSort.key}-${updatedSort.direction}`);
        }
      } else {
        const updatedSort: SortType = {
          key: key,
          direction: "asc",
        };

        setSort(updatedSort);
        if (sendDataToServer) {
          sendDataToServer(`${updatedSort.key}-${updatedSort.direction}`);
        }
      }
    }
  };

  const beforeDeleteHandler = (id: string, name: string) => {
    setId(id);
    setShowForDelete(true);
  };
  const showEdit = (id: string) => {
    setShow(true);
    setId(id);
  };

  const deleteDecks = () => {
    deleteItem(id);
    setShowForDelete(false);
  };

  const toCardsHandler = (id: string, name: string) => {
    dispatch(decksSlice.actions.getName(name));
    navigate(`${id}`);
  };

  return (
    <>
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
          {dataContentTable?.map((item) => (
            <tr key={item.id} className={st.tr}>
              <td className={st.tdCommonStyle}>{item.name} </td>
              <td className={st.tdCommonStyle}>{item.cardsCount}</td>
              <td className={st.tdCommonStyle}>{item.updated}</td>
              <td className={st.tdCreatedBy}>{item.author.name}</td>
              <td className={st.tdIcons}>
                <PlayIcon onClick={() => toCardsHandler(item.id, item.name)} />
                <EditIcon onClick={() => showEdit(item.id)} />
                <DeleteIcon
                  style={{ cursor: "alias" }}
                  onClick={() => beforeDeleteHandler(item.id)}
                />
                {show && (
                  <div className={st.s}>
                    <DecksForm
                      forEditFlag={true}
                      id={id}
                      callback={() => setShow(false)}
                      headerName={"Edit pack"}
                    />
                  </div>
                )}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      <div style={{ marginTop: "20px" }}>
        <PaginationSamurai allElements={totalItems} />

        {showForDelete && (
          <div className={st.s}>
            <Delete
              hide={() => setShowForDelete(false)}
              callback={deleteDecks}
            />
          </div>
        )}
      </div>
    </>
  );
};
