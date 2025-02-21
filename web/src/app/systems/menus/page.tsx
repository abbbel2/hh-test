"use client";

import { useEffect } from "react";

import { MenuForm, MenuIcon } from "@/components";
import { MenuSelector } from "@/components/menu-selector";
import { SystemTree } from "@/components/system-tree";
import { useAppDispatch } from "@/redux/hooks";
import { MenuActions } from "@/redux/slices/menu/menu.slice";

export default function Home() {
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(MenuActions.getMenus());
  }, [dispatch]);

  return (
    <div className="flex md:flex-row flex-col w-full h-[88vh]">
      <div className="flex flex-col gap-5 w-full md:w-3/12">
        <div className="flex gap-4 items-center mt-8">
          <MenuIcon />
          <div className="text-sidebar text-2xl font-black">Menus</div>
        </div>
        <div className="flex flex-col gap-2">
          <MenuSelector />
        </div>
        <SystemTree />
      </div>
      <MenuForm />
    </div>
  );
}
