import React, { ComponentPropsWithoutRef } from "react";

import * as Avatar from "@radix-ui/react-avatar";

import s from "./avatar.module.scss";

export type AvatarType = {
  style?: string;
} & ComponentPropsWithoutRef<"div">;

export const AvatarDemo: React.FC<AvatarType> = ({ className }) => (
  <div className={`${s.divStyle} `}>
    <Avatar.Root className={`${s.AvatarRoot} ${className}`}>
      <Avatar.Image
        className={s.AvatarImage}
        src="https://images.unsplash.com/photo-1511485977113-f34c92461ad9?ixlib=rb-1.2.1&w=128&h=128&dpr=2&q=80"
        alt="Pedro Duarte"
      />
      <Avatar.Fallback className={s.AvatarFallback} delayMs={600}>
        JD
      </Avatar.Fallback>
    </Avatar.Root>
  </div>
);
