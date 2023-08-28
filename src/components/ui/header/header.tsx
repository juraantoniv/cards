import { ComponentProps, FC, ReactNode } from "react";

import { clsx } from "clsx";
import { ToastContainer } from "react-toastify";

import { Button } from "../button";
import { Typography } from "../typography";

import s from "./header.module.scss";
import im from "./Logo.png";

export type HeaderProps = {
  logIn: boolean;
  children: ReactNode;
  name?: string;
  callback: () => void;
} & Omit<ComponentProps<"header">, "children">;

export const Header: FC<HeaderProps> = ({
  children,
  className,
  logIn,
  name,

  ...rest
}) => {
  const classNames = {
    header: clsx(s.header, className),
  };

  console.log(logIn);

  return (
    <>
      <header className={classNames.header} {...rest}>
        <img src={im} alt={"logo"}></img>
        {logIn ? (
          <div style={{ display: "flex" }}>
            {name && (
              <Typography variant={"h1"} style={{ marginRight: 25 }}>
                {name}
              </Typography>
            )}
            {children}
          </div>
        ) : (
          <Button onClick={rest.callback}>Log In</Button>
        )}
      </header>
    </>
  );
};
