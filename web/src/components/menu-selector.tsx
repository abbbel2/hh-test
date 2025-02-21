import { useCallback } from "react";

import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectItem,
} from "@/components/ui/select";
import { useAppDispatch, useAppSelector } from "@/redux/hooks";
import { ItemActions } from "@/redux/slices/item/item.slice";
import { Item } from "@/redux/slices/item/item.util";
import { IMenu } from "@/redux/slices/menu/menu.util";

export const MenuSelector = () => {
  const dispatch = useAppDispatch();
  const { menus } = useAppSelector((state) => state.menu);

  const onSelect = useCallback(
    (value: string) => {
      const selectedMenu = menus.payload.find((m) => m.id === value);
      dispatch(ItemActions.updateSelectedMenu(selectedMenu as IMenu));
      dispatch(ItemActions.getItems({ menuId: value })).then(({ payload }) => {
        dispatch(ItemActions.updateCachedTreeItems(payload as Item[]));
        if ((payload as Item[]).length === 0) {
          dispatch(
            ItemActions.updateExpandedKeys([selectedMenu?.id as string], true)
          );
        } else {
          dispatch(ItemActions.updateExpandedKeys(payload as Item[], false));
        }
      });
    },
    [dispatch, menus.payload]
  );

  return (
    <>
      <label className="text-text text-sm">Menu</label>
      <Select onValueChange={onSelect}>
        <SelectTrigger className="w-full">
          <SelectValue placeholder="Select menu" />
        </SelectTrigger>
        <SelectContent>
          {menus.loading && <div>Loading ...</div>}
          {!menus.loading &&
            menus.payload.map((menu) => (
              <SelectItem key={menu.id} value={menu.id}>
                {menu.name}
              </SelectItem>
            ))}
        </SelectContent>
      </Select>
    </>
  );
};
