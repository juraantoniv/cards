import { ComponentProps, FC, ReactNode } from "react";

import { clsx } from "clsx";
import { ToastContainer } from "react-toastify";

import { Button } from "../button";
import { meType } from "../layout/MainLayout.tsx";
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
  name,

  ...rest
}) => {
  const classNames = {
    header: clsx(s.header, className),
  };

  return (
    <>
      <header className={classNames.header} {...rest}>
        <img src={im} alt={"logo"}></img>
        {rest.logIn ? (
          <div style={{ display: "flex" }}>
            {name && (
              <Typography variant={"h1"} style={{ marginRight: 25 }}>
                {name}
              </Typography>
            )}
            {children}
          </div>
        ) : (
          <Button onClick={rest.callback}>
            {rest.logIn ? "Log Out" : "Log In"}
          </Button>
        )}
      </header>
    </>
  );
};
