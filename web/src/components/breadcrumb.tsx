'use client'

import { usePathname } from "next/navigation";

import { FileWhite } from "./icons";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbList,
  BreadcrumbSeparator,
} from "./ui/breadcrumb";
import { routeBreadcrumbMap } from "@/constants";

export const BreadCrumb = () => {
  const pathname = usePathname();

  return (
    <Breadcrumb>
      <BreadcrumbList>
        <BreadcrumbItem>
          <FileWhite fill="#D0D5DD" />
        </BreadcrumbItem>
        <BreadcrumbSeparator>
            /
        </BreadcrumbSeparator>
        <BreadcrumbItem className="cursor-pointer">
          <p>{routeBreadcrumbMap[pathname]}</p>
        </BreadcrumbItem>
      </BreadcrumbList>
    </Breadcrumb>
  );
};
