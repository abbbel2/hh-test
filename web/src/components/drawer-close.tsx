"use client";

import { useIsMobile } from "@/hooks/use-mobile";
import { DrawerCloseIcon } from "./icons";
import { useSidebar } from "./ui/sidebar";

export const DrawerClose = () => {
  const { toggleSidebar } = useSidebar();
  const isMobile = useIsMobile();

  if (!isMobile) {
    return null;
  }

  return <DrawerCloseIcon className="cursor-pointer mb-8" onClick={toggleSidebar} />;
};
