import { useState } from "react";

import { useAppDispatch, useAppSelector } from "../../../../store.ts";
import { IconArrow } from "../../../assets/icons/iconArrow.tsx";
import { useGetDecksQuery } from "../../../services/decs-query.ts";
import { decksSlice } from "../../../services/slices.ts";
import { SelectControl } from "../select";

import st from "./paginationSamurai.module.scss";

type PropsType = {
  allElements: number;
};
export const PaginationSamurai = ({ allElements }: PropsType) => {
  const dispatch = useAppDispatch();

  const stateSelectItems = [
    { value: "1", text: "5" },
    { value: "2", text: "8" },
    { value: "3", text: "10" },
    { value: "4", text: "12" },
    { value: "5", text: "15" },
  ];
  let widthBlockSelector = 80;

  let headerSelector = "10";

  const page = useAppSelector((state) => state.decksSlice.currentPage);

  const itemsPerPage: number = useAppSelector(
    (state) => state.decksSlice.itemsPerPage,
  );

  const [amountElementsInOnePage, setAmountElementsInOnePage] =
    useState(itemsPerPage);
  const handlerOnValueChange = (amountElementsInOnePage = "10") => {
    dispatch(
      decksSlice.actions.setItemsPerPage(Number(amountElementsInOnePage)),
    );
    setAmountElementsInOnePage(Number(amountElementsInOnePage));

    /*сделать запрос на сервер чтоб возвращал данное количество элементов и они будут отрисованы на одной странице */
  };

  let amountPages = Math.ceil(allElements / amountElementsInOnePage);
  let maxPart = amountPages / 10;

  let arrayNumbers = [];

  for (let i = 1; i <= amountPages; i++) {
    arrayNumbers.push(i);
  }

  const [part, setPart] = useState(1);
  const [active, setActive] = useState(1);
  const sizeOnePart = 10; /* размер одной части кнопок*/

  const numberStartPart = (part - 1) * sizeOnePart + 1;
  const numberFinishPart = part * sizeOnePart;

  const {} = useGetDecksQuery({
    currentPage: `${page}`,
    itemsPerPage: `${itemsPerPage}`,
  });

  const fetchActivePageHandler = () => {};

  const onClickReturnPart = () => {
    if (part !== 1) {
      setPart(part - 1);
      fetchActivePageHandler();
    }
  };

  const onClickNextPart = () => {
    if (part < maxPart) setPart(part + 1);
    fetchActivePageHandler();
  };

  const onClickHandler = (numberPage: any) => {
    dispatch(decksSlice.actions.setCurrentPage(numberPage));
    setActive(numberPage);
  };

  return (
    <div className={st.common}>
      <div className={st.arrow} onClick={onClickReturnPart}>
        <IconArrow width="28" height="28" />
      </div>

      {arrayNumbers
        .filter((el) => el >= numberStartPart && el <= numberFinishPart)
        .map((el) => {
          return (
            <span
              key={el}
              onClick={() => onClickHandler(el)}
              className={el === active ? st.activeNumber : st.number}
            >
              {el}
            </span>
          );
        })}

      <div className={st.arrow} onClick={onClickNextPart}>
        <IconArrow
          width="28"
          height="28"
          style={{ transform: "rotate(180deg)" }}
        />
      </div>

      <div className={st.blockSeleckWithWords}>
        <SelectControl
          onValueChange={handlerOnValueChange}
          headerSelector={headerSelector}
          widthBlockSelector={widthBlockSelector}
          stateSelectItems={stateSelectItems}
        />
      </div>
    </div>
  );
};
