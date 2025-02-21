/* eslint-disable @typescript-eslint/no-explicit-any */

"use client";

import { useCallback, useState } from "react";
import { Tree, TreeDataNode } from "antd";
import { DataNode } from "antd/es/tree";

import { ArrowDown, MenuIcon, PlusIcon } from "@/components";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

const treeData: TreeDataNode[] = [
  {
    title: "This is form section",
    key: "0-0",
    children: [
      {
        title: "parent 1-0",
        key: "0-0-0",
        children: [
          {
            title: "leaf",
            key: "0-0-0-0",
          },
          {
            title: "leaf",
            key: "0-0-0-1",
          },
          {
            title: "leaf",
            key: "0-0-0-2",
            children: [
              {
                title: "sfbiubr",
                key: "0-0-0-2-1",
              },
            ],
          },
        ],
      },
      {
        title: "parent 1-1",
        key: "0-0-1",
        children: [
          {
            title: "leaf",
            key: "0-0-1-0",
          },
        ],
      },
      {
        title: "parent 1-2",
        key: "0-0-2",
        children: [
          {
            title: "leaf",
            key: "0-0-2-0",
          },
          {
            title: "leaf",
            key: "0-0-2-1",
          },
        ],
      },
    ],
  },
];

export default function Home() {
  const [expandedKeys, setExpandedKeys] = useState<string[]>([]);

  const expandAll = () => {
    const allKeys = getAllKeys(treeData);
    setExpandedKeys(allKeys);
  };

  const collapseAll = () => {
    setExpandedKeys([]);
  };

  const getAllKeys = (nodes: DataNode[]): string[] => {
    return nodes.reduce((keys: string[], node) => {
      keys.push(node.key as string);
      if (node.children) {
        keys.push(...getAllKeys(node.children));
      }
      return keys;
    }, []);
  };

  const onExpand = useCallback((keys: any) => {
    setExpandedKeys(keys);
  }, []);

  const titleRender = useCallback(
    (node: TreeDataNode) => (
      <div className="group flex flex-row justify-between items-center w-full">
        <div className="text-sm text-sidebar">
          {node.title?.toString()}
        </div>
        <div className="group-hover:opacity-100 transition-opacity opacity-0 duration-300 rounded-full bg-button-secondary ml-4 p-[6px]">
          <PlusIcon />
        </div>
      </div>
    ),
    []
  );

  return (
    <div className="flex flex-row w-full h-[87vh]">
      <div className="flex flex-col gap-5 w-3/12">
        <div className="flex gap-4 items-center mt-8">
          <MenuIcon />
          <div className="text-sidebar text-[32px] font-black">Menus</div>
        </div>
        <div className="flex flex-col gap-2">
          <label className="text-text text-sm">Menu</label>
          <Select>
            <SelectTrigger className="w-full">
              <SelectValue placeholder="Select menu" />
            </SelectTrigger>
            <SelectContent>
              <SelectGroup>
                <SelectItem value="apple">Apple</SelectItem>
                <SelectItem value="banana">Banana</SelectItem>
                <SelectItem value="blueberry">Blueberry</SelectItem>
                <SelectItem value="grapes">Grapes</SelectItem>
                <SelectItem value="pineapple">Pineapple</SelectItem>
              </SelectGroup>
            </SelectContent>
          </Select>
        </div>
        <div className="flex flex-row gap-4">
          <Button onClick={expandAll}>Expand All</Button>
          <Button variant="outline" onClick={collapseAll}>
            Collapse All
          </Button>
        </div>
        <div>
          <Tree
            treeData={treeData}
            showLine
            defaultExpandAll
            expandedKeys={expandedKeys}
            switcherIcon={<ArrowDown />}
            titleRender={titleRender}
            onExpand={onExpand}
          />
        </div>
      </div>

      <div className="w-8/12 flex items-center justify-center">
        <div className="flex flex-col gap-4 w-6/12">
          <div className="grid w-full items-center gap-1.5">
            <Label>Menu ID</Label>
            <Input disabled />
          </div>
          <div className="grid w-8/12 items-center gap-1.5">
            <Label>Depth</Label>
            <Input disabled />
          </div>
          <div className="grid w-8/12 items-center gap-1.5">
            <Label>Parent data</Label>
            <Input disabled />
          </div>
          <div className="grid w-8/12 items-center gap-1.5">
            <Label>Name</Label>
            <Input />
          </div>
          <Button variant="secondary" className="w-8/12">
            Save
          </Button>
        </div>
      </div>
    </div>
  );
}
