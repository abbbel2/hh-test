"use client";

import { useAppDispatch, useAppSelector } from "@/redux/hooks";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { toast } from "sonner";

import { ItemActions } from "@/redux/slices/item/item.slice";

import { Label } from "./ui/label";
import { Input } from "./ui/input";
import { Button } from "./ui/button";
import { Form, FormControl, FormField, FormItem, FormMessage } from "./ui/form";

export const MenuForm = () => {
  const dispatch = useAppDispatch();
  const { createItem } = useAppSelector((state) => state.item);
  const { selectedItem } = useAppSelector((state) => state.item);


  const FormSchema = z.object({
    name: z.string({
      message: "Name is required",
    }),
  });

  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
    defaultValues: {
      name: "",
    },
  });

  const onSubmit = (data: z.infer<typeof FormSchema>) => {
    if (selectedItem?.action === "add") {
      dispatch(
        ItemActions.createItem({
          name: data.name,
          depth: selectedItem?.depth + 1,
          menuId: selectedItem?.menuId,
          parentId: selectedItem?.parentId
        })
      ).then(() => {
        toast('Menu item is added');
        form.reset();
        dispatch(ItemActions.resetSelectedItem());
      });
    }
  };

  if (!selectedItem) {
    return null;
  }

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="w-full md:w-8/12 pt-8 md:pt-0 flex items-center justify-center"
      >
        <div className="flex flex-col gap-4 w-full md:w-6/12">
          <div className="grid w-full items-center gap-1.5">
            <Label>Menu ID</Label>
            <Input disabled value={selectedItem.menuId} />
          </div>
          <div className="grid w-8/12 items-center gap-1.5">
            <Label>Depth</Label>
            <Input disabled value={selectedItem.depth} />
          </div>
          <div className="grid w-8/12 items-center gap-1.5">
            <Label>Parent data</Label>
            <Input disabled value={selectedItem.name} />
          </div>
          <FormField
            control={form.control}
            name="name"
            render={({ field }) => (
              <FormItem>
                <FormControl>
                  <div className="grid w-8/12 items-center gap-1.5">
                    <Label>Name</Label>
                    <Input {...field} />
                  </div>
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <Button variant="secondary" type="submit" className="w-8/12">
            {createItem.loading ? "Loading ..." : "Save"}
          </Button>
        </div>
      </form>
    </Form>
  );
};
