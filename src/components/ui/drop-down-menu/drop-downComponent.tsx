import React, { ReactNode, useState } from "react";

import * as DropdownMenu from "@radix-ui/react-dropdown-menu";
import { PersonIcon, TrashIcon } from "@radix-ui/react-icons";
import { useNavigate } from "react-router-dom";

import { useAppDispatch } from "../../../../store.ts";
import { IconEdit } from "../../../assets/icons/iconEdit.tsx";
import { Logout } from "../../../assets/icons/iconLogOut.tsx";
import IconPlayCircle from "../../../assets/icons/LearnIcon.tsx";
import { useLogOutMutation } from "../../../services/decs-query.ts";
import { decksSlice } from "../../../services/slices.ts";
import { AvatarDemo } from "../avatar/avatar.tsx";
import { meType } from "../layout/MainLayout.tsx";
import { Typography } from "../typography";

import s from "./drop-downComponent.module.scss";

// import { Delete } from 'assets/icons/LearnIcon.tsx'

type DropdownProps = {
  arrItems: Array<string>;
  data?: meType;
  children?: ReactNode;
  id?: string;
  img?: string;
};

export const DropdownMenuComponent: React.FC<DropdownProps> = ({
  arrItems,
  data,
  children,
  id,
  img,
}) => {
  const [open, setOpen] = useState(false);

  const [logOut, {}] = useLogOutMutation();

  const dispatch = useAppDispatch();

  const navigate = useNavigate();

  const setState = () => {
    setOpen(!open);
  };

  const signOut = () => {
    logOut();
    navigate("/login");
  };

  const toProfilePage = () => {
    navigate("/profile");
  };

  const handler = () => {};

  const editMode = () => {
    dispatch(decksSlice.actions.editMode(true));
  };

  const delMode = () => {
    dispatch(decksSlice.actions.showDeleteForm(true));
  };

  const leenMode = () => {
    navigate("/learn");
    if (id) {
      dispatch(decksSlice.actions.setId(id));
    }
  };

  const nonFunc = () => {};

  return (
    <DropdownMenu.Root open={open} onOpenChange={setState}>
      <DropdownMenu.Trigger asChild>
        <button className={s.IconButton} aria-label="Customise options">
          {!children ? <AvatarDemo img={img} /> : children}
        </button>
      </DropdownMenu.Trigger>
      <DropdownMenu.Portal>
        <DropdownMenu.Content
          className={
            arrItems.includes("Learn")
              ? s.DropdownMenuSubContentForItemsCountThree
              : s.DropdownMenuContent
          }
          sideOffset={3}
        >
          {arrItems.length <= 2 && (
            <div className={s.DropdownMenuItem}>
              <div
                style={{
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                }}
              >
                <AvatarDemo img={img} />
                <div style={{ margin: "10px" }}>
                  <Typography variant={"h3"}>{data?.name}</Typography>
                  <Typography variant={"body2"}>{data?.email}</Typography>
                </div>
              </div>
            </div>
          )}
          {arrItems.map((e) => {
            return (
              <>
                {!e.includes("Learn") && (
                  <DropdownMenu.Separator className={s.DropdownMenuSeparator} />
                )}
                <DropdownMenu.Item
                  className={s.DropdownMenuItem}
                  onClick={
                    e === "Sign Out"
                      ? signOut
                      : e === "My Profile"
                      ? toProfilePage
                      : e === "Edit"
                      ? editMode
                      : e === "Delete"
                      ? delMode
                      : e === "Learn"
                      ? leenMode
                      : nonFunc
                  }
                >
                  {e === "Sign Out" ? (
                    <Logout style={{ margin: "5px" }} />
                  ) : e === "My Profile" ? (
                    <PersonIcon style={{ margin: "5px" }} />
                  ) : e === "Edit" ? (
                    <IconEdit style={{ margin: "5px" }} />
                  ) : e === "Delete" ? (
                    <TrashIcon style={{ margin: "5px" }} />
                  ) : e === "Learn" ? (
                    <IconPlayCircle style={{ margin: "5px" }} />
                  ) : null}
                  {e}
                </DropdownMenu.Item>
              </>
            );
          })}
        </DropdownMenu.Content>
      </DropdownMenu.Portal>
    </DropdownMenu.Root>
  );
};
