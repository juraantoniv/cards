import { ComponentPropsWithoutRef, ReactNode } from "react";

import st from "./cardComponent.module.scss";

type PropsType = {
  children?: ReactNode;
} & ComponentPropsWithoutRef<"div">;
export const CardComponent = ({
  children,
  className,
  ...restProps
}: PropsType) => {
  return (
    <div className={`${st.frame} ${className}`} {...restProps}>
      {children}
    </div>
  );
};
