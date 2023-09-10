import React, { ComponentPropsWithoutRef } from "react";

import * as Avatar from "@radix-ui/react-avatar";

import { useMeQuery } from "../../../../decs-query.ts";

import s from "./avatar.module.scss";

export type AvatarType = {
  style?: string;
  img?: string;
} & ComponentPropsWithoutRef<"div">;

export const AvatarDemo: React.FC<AvatarType> = ({ className, img }) => (
  <div className={`${s.divStyle} `}>
    <Avatar.Root className={`${s.AvatarRoot} ${className}`}>
      <Avatar.Image className={s.AvatarImage} src={img} alt="Pedro Duarte" />
      <Avatar.Fallback
        className={s.AvatarFallback}
        delayMs={600}
      ></Avatar.Fallback>
    </Avatar.Root>
  </div>
);
