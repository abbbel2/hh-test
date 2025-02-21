/* eslint-disable @typescript-eslint/no-explicit-any */
import { useCallback, useMemo } from "react";
import { Tree, TreeDataNode } from "antd";

import { useAppDispatch, useAppSelector } from "@/redux/hooks";
import { buildHierarchicalStructure } from "@/redux/redux.util";
import { ItemActions } from "@/redux/slices/item/item.slice";

import { ArrowDown, PlusIcon } from "./icons";
import { Button } from "./ui/button";
import { getAllKeys } from "@/lib/utils";

export const SystemTree = () => {
  const dispatch = useAppDispatch();
  const { menus } = useAppSelector((state) => state.menu);
  const { items, cachedTreeItems, selectedMenu, expandedKeys } = useAppSelector(
    (state) => state.item
  );

  const menuId = useMemo(() => menus.payload?.[0]?.id, [menus]);

  const expandAll = useCallback(() => {
    dispatch(ItemActions.updateExpandedKeys([menuId, ...getAllKeys(items.payload)], true));
  }, [dispatch, items.payload, menuId]);

  const collapseAll = useCallback(() => {
    dispatch(ItemActions.updateExpandedKeys([menuId], true));
  }, [dispatch, menuId]);

  const onExpand = useCallback(
    (keys: any) => {
      dispatch(ItemActions.updateExpandedKeys(keys, true));
    },
    [dispatch]
  );

  const handleItemAdd = useCallback(
    (node: TreeDataNode) => {
      const menu = menus.payload.find((menu) => menu.id === node.key);
      const selectedItem = cachedTreeItems.find((item) => item.id === node.key);
      const type = menu ? "menu" : "item";
      dispatch(
        ItemActions.updateSelectedItem({
          parentId: selectedItem?.id,
          action: "add",
          menuId: selectedMenu?.id as string,
          name: node.title as string,
          type,
          depth: selectedItem ? selectedItem.depth : 1,
        })
      );
    },
    [cachedTreeItems, dispatch, menus.payload, selectedMenu?.id]
  );

  const titleRender = useCallback(
    (node: TreeDataNode) => (
      <div className="group flex flex-row justify-between items-center w-full">
        <div className="text-sm text-sidebar">{node.title?.toString()}</div>
        <div
          className="group-hover:opacity-100 transition-opacity opacity-0 duration-300 rounded-full bg-button-secondary ml-4 p-[6px]"
          onClick={() => handleItemAdd(node)}
        >
          <PlusIcon />
        </div>
      </div>
    ),
    [handleItemAdd]
  );

  const treeData = useMemo(() => {
    return [
      {
        title: menus.payload?.[0]?.name,
        key: menus.payload?.[0]?.id,
        children: buildHierarchicalStructure(cachedTreeItems),
      },
    ];
  }, [cachedTreeItems, menus.payload]);

  return (
    <>
      <div className="flex flex-row gap-4">
        <Button onClick={expandAll}>Expand All</Button>
        <Button variant="outline" onClick={collapseAll}>
          Collapse All
        </Button>
      </div>
      {items.loading && <div>Loading ...</div>}
      {!items.loading &&
        items.successful &&
        !!expandedKeys.length &&
        !!treeData.length && (
          <div className="overflow-y-scroll w-full">
            <Tree
              treeData={treeData}
              showLine
              expandedKeys={expandedKeys}
              switcherIcon={<ArrowDown />}
              titleRender={titleRender}
              onExpand={onExpand}
            />
          </div>
        )}
    </>
  );
};
