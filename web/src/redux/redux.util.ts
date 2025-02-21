/* eslint-disable @typescript-eslint/no-explicit-any */
import { Item } from "./slices/item/item.util";

export type ApiState<T> = {
  loading: boolean;
  payload: T;
  successful: boolean;
  error: any;
};

export const ResetApiState = (payload: any) => ({
  loading: false,
  payload,
  successful: false,
  error: null,
});

export type tree = { key: string; title: string; children?: tree[] };

export const buildHierarchicalStructure = (items: Item[]): tree[] => {
  const itemMap = new Map<string, tree>();
  const rootItems: tree[] = [];
  items.forEach((item) => {
    itemMap.set(item.id, { key: item.id, title: item.name, children: [] });
  });
  items.forEach((item) => {
    if (item.parentId) {
      const parent = itemMap.get(item.parentId);
      if (parent) {
        parent?.children?.push(itemMap.get(item.id)!);
      }
    } else {
      rootItems.push(itemMap.get(item.id)!);
    }
  });

  return rootItems;
};

export const mergeArrays = (arr1: Item[], arr2: Item[]): Item[] => {
  const arr1Map = new Map(arr1.map((item) => [item.id, item]));

  arr2.forEach((item) => {
    arr1Map.set(item.id, item);
  });

  return Array.from(arr1Map.values());
};

export const generateQueryString = (payload: any) => {
  if (
    payload &&
    typeof payload === "object" &&
    Object.keys(payload).length > 0
  ) {
    return (
      "?" +
      Object.keys(payload)
        .map((key) => `${key}=${payload[key]}`)
        .join("&")
    );
  } else {
    return "";
  }
};
