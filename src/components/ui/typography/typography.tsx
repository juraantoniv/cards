import { ComponentPropsWithoutRef, ElementType, ReactNode } from "react";

import s from "./typography.module.scss";

export interface TextProps<T extends ElementType> {
  as?: T;
  variant?:
    | "large"
    | "h1"
    | "h2"
    | "h3"
    | "body1"
    | "body2"
    | "subtitle1"
    | "subtitle2"
    | "caption"
    | "overline"
    | "link1"
    | "link2"
    | "error";
  children?: ReactNode;
  className?: string;
}

export function Typography<T extends ElementType = "p">(
  props: TextProps<T> & Omit<ComponentPropsWithoutRef<T>, keyof TextProps<T>>,
) {
  const { variant = "body1", className, as: Component = "p", ...rest } = props;

  const classNames = `${s.text} ${s[variant]} ${className}`;

  return <Component className={classNames} {...rest} />;
}
