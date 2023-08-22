import { ComponentPropsWithoutRef } from "react";

export type ButtonProps = {
  as?: any;
  variant?: "primary" | "secondary" | "tertiary" | "link";
  fullWidth?: boolean;
} & ComponentPropsWithoutRef<"button">;

import s from "./button.module.scss";

export const Button = ({
  variant = "primary",
  fullWidth,
  className,
  as: Component = "button",
  ...rest
}: ButtonProps) => {
  return (
    <Component
      className={`${s[variant]} ${fullWidth ? s.fullWidth : ""} ${className}`}
      {...rest}
    />
  );
};
