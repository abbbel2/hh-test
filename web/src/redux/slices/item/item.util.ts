import { ApiState } from "@/redux/redux.util";
import { IMenu } from "../menu/menu.util";

export interface Item {
  id: string;
  name: string;
  depth: number;
  parentId: string | null;
  menuId: string;
  items: Item[];
}

export interface ItemSelection {
  parentId?: string;
  name: string;
  type: "menu" | "item";
  depth: number;
  menuId: string;
  action: 'add' | 'edit';
}

export type ItemStateTypes = {
  createItem: ApiState<Item | null>;
  editItem: ApiState<Item | null>;
  deleteItem: ApiState<Item | null>;
  items: ApiState<Item[]>;
  item: ApiState<Item | undefined>;
  cachedTreeItems: Item[];
  selectedItem: ItemSelection | null;
  selectedMenu: IMenu | null;
  expandedKeys: string[];
};
