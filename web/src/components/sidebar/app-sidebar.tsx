"use client";

import {
  Sidebar,
  SidebarContent,
  SidebarHeader,
  useSidebar
} from "@/components/ui/sidebar";

import { DrawerIcon, Logo } from "../icons";
import { AppSidebarContent } from "./app-sidebar-content";

export const AppSidebar = () => {
  const { toggleSidebar } = useSidebar();

  return (
    <Sidebar className="rounded-3xl bg-sidebar">
      <SidebarHeader className="flex flex-row justify-between py-8 px-8 items-center">
        <Logo />
        <DrawerIcon className="cursor-pointer" onClick={toggleSidebar} />
      </SidebarHeader>
      <SidebarContent className="px-4">
        <AppSidebarContent />
      </SidebarContent>
    </Sidebar>
  );
};
