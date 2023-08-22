import React, { ComponentPropsWithoutRef, ReactNode } from "react";

export type ButtonProps = {
  as?: any;
  // variant?: "primary" | "secondary" | "tertiary" | "link";
  fullWidth?: boolean;
  text?: string;
  childrenJSX?: ReactNode;
} & ComponentPropsWithoutRef<"div">;

import s from "./card.module.scss";

export const Card = ({
  // variant = "primary",
  fullWidth,
  className,
  childrenJSX,
  text,
  as: Component = "div",
  ...rest
}: ButtonProps) => {
  return (
    <Component
      className={` ${fullWidth ? s.fullWidth : ""} ${className}`}
      {...rest}
    >
      {text}
    </Component>
  );
};
