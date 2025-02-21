export type SidebarItem = {
  name: string;
  type: string;
  url: string;
  children?: SidebarItem[];
};
