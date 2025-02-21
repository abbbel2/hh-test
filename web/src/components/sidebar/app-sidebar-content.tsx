import { useCallback } from "react";
import cls from "clsx";
import { usePathname, useRouter } from "next/navigation";

import { sidebarItems } from "@/constants";
import { SidebarItem } from "@/types-def";

import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "../ui/collapsible";
import { SidebarGroup, SidebarGroupLabel } from "../ui/sidebar";
import { FileWhite, SubMenuIcon } from "../icons";

export const AppSidebarContent = () => {
  const pathname = usePathname();
  const router = useRouter();

  const handleNav = useCallback(
    (item: SidebarItem) => {
      if (!item.children?.length) {
        router.push(item.url);
      }
    },
    [router]
  );

  return (
    <>
      {sidebarItems.map((sidebarItem, index) => (
        <Collapsible
          defaultOpen
          className={cls("group/collapsible rounded-xl", {
            "bg-button-primary": index === 0,
            "py-1": !!sidebarItem?.children,
          })}
          key={index}
        >
          <SidebarGroup className="m-0 p-0">
            <SidebarGroupLabel asChild className="px-4 py-3">
              <CollapsibleTrigger
                className="flex flex-row space-x-4"
                onClick={() => handleNav(sidebarItem)}
              >
                <FileWhite
                  fill={pathname === sidebarItem.url ? "white" : "none"}
                  stroke={pathname === sidebarItem.url ? "white" : "#475467"}
                />
                <div
                  className={cls("text-sm font-bold", {
                    "text-white": pathname === sidebarItem.url,
                    "text-text": pathname !== sidebarItem.url,
                  })}
                >
                  {sidebarItem.name}
                </div>
              </CollapsibleTrigger>
            </SidebarGroupLabel>
            {!!sidebarItem?.children && (
              <CollapsibleContent className="flex flex-col justify-center">
                {sidebarItem.children.map((item, j) => (
                  <div
                    key={j}
                    className={cls(
                      "flex flex-row space-x-4 cursor-pointer px-4 py-3 rounded-xl",
                      { "bg-foreground": item.url === pathname }
                    )}
                    onClick={() => handleNav(item)}
                  >
                    <SubMenuIcon />
                    <div className="text-sm font-bold text-[#667085]">
                      {item.name}
                    </div>
                  </div>
                ))}
              </CollapsibleContent>
            )}
          </SidebarGroup>
        </Collapsible>
      ))}
    </>
  );
};
