import { Item } from "@/redux/slices/item/item.util";
import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export const getAllKeys = (nodes: Item[]): string[] => {
  return nodes.reduce((keys: string[], node) => {
    keys.push(node.id as string);
    if (node.items) {
      keys.push(...getAllKeys(node.items));
    }
    return keys;
  }, []);
};
