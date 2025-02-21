import { ApiState } from "@/redux/redux.util";
import { Item } from "../item/item.util";

export interface IMenu {
  id: string;
  name: string;
  items: Item[];
}

export type MenuStateTypes = {
  createMenu: ApiState<IMenu | null>;
  editMenu: ApiState<IMenu | null>;
  deleteMenu: ApiState<IMenu | null>;
  menus: ApiState<IMenu[]>;
  menu: ApiState<IMenu | undefined>;
};
