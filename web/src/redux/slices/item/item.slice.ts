/* eslint-disable @typescript-eslint/no-explicit-any */
import {
  ActionReducerMapBuilder,
  createAction,
  createAsyncThunk,
  createSlice,
} from "@reduxjs/toolkit";
import { Item, ItemSelection, ItemStateTypes } from "./item.util";
import axios from "@/redux/axios";
import { generateQueryString, mergeArrays } from "@/redux/redux.util";
import { ResetApiState } from "@/redux/redux.util";
import { IMenu } from "../menu/menu.util";
import { getAllKeys } from "@/lib/utils";

const name = "item";
const extraActions = createExtraActions();

const ItemInitialState: ItemStateTypes = {
  createItem: ResetApiState(null),
  editItem: ResetApiState(null),
  deleteItem: ResetApiState(null),
  items: ResetApiState([]),
  item: ResetApiState(null),
  cachedTreeItems: [],
  selectedItem: null,
  selectedMenu: null,
  expandedKeys: [],
};

function createExtraActions() {
  const createItem = createAsyncThunk<Item, any>(
    `/create-${name}`,
    async (data: any, thunkApi) =>
      axios
        .post(`${name}`, data)
        .then((response) => {
          if (response.data) {
            return response.data;
          } else {
            return thunkApi.rejectWithValue(response?.data);
          }
        })
        .catch((error) => thunkApi.rejectWithValue(error?.response?.data))
  );

  const editItem = createAsyncThunk<Item, any>(
    `/edit-${name}`,
    async (data: { payload: any; id: string }, thunkApi) =>
      axios
        .put(`${name}/${data.id}`, data.payload)
        .then((response) => {
          if (response.data) {
            return response.data;
          } else {
            return thunkApi.rejectWithValue(response?.data);
          }
        })
        .catch((error) => thunkApi.rejectWithValue(error?.response?.data))
  );

  const deleteItem = createAsyncThunk<Item, any>(
    `/delete-${name}`,
    async (id: string, thunkApi) =>
      axios
        .delete(`${name}/${id}`)
        .then((response) => {
          if (response.data) {
            return response.data;
          } else {
            return thunkApi.rejectWithValue(response?.data);
          }
        })
        .catch((error) => thunkApi.rejectWithValue(error?.response?.data))
  );

  const getItems = createAsyncThunk<Item[], any>(
    `/get-${name}s`,
    async (query, thunkApi) =>
      axios
        .get(`${name}${generateQueryString(query)}`)
        .then((response) => {
          return response.data;
        })
        .catch((error) => thunkApi.rejectWithValue(error?.response?.data))
  );

  const getItem = createAsyncThunk<Item | undefined, any>(
    `/get-one-${name}`,
    async (id: string, thunkApi) =>
      axios
        .get(`${name}/${id}`)
        .then((response) => {
          if (response.data) {
            return response.data;
          } else {
            return thunkApi.rejectWithValue(response?.data);
          }
        })
        .catch((error) => thunkApi.rejectWithValue(error?.response?.data))
  );

  const updateCachedTreeItems = createAction(
    `/update-fetched-tree-${name}`,
    (items: Item[]) => ({ payload: items })
  );

  const resetCachedTreeItems = createAction(`/reset-fetched-tree-${name}`);

  const updateSelectedItem = createAction(
    `/update-selected-item`,
    (item: ItemSelection) => ({ payload: item })
  );

  const resetSelectedItem = createAction(`/reset-selected-item`);

  const updateSelectedMenu = createAction(
    `/update-selected-menu`,
    (item: IMenu) => ({ payload: item })
  );

  const resetSelectedMenu = createAction(`/reset-selected-menu`);

  const updateExpandedKeys = createAction(
    `/update-expanded-keys`,
    (items: Item[] | string[], isKeys: boolean) => {
      if (isKeys) {
        return {
          payload: items as string[]
        }
      } else {
        const keys = getAllKeys(items as Item[]);
        return {
          payload: keys,
        };
      }
      
    }
  );

  const resetExpandedKeys = createAction(`/reset-expanded-keys`);

  return {
    createItem,
    editItem,
    deleteItem,
    getItems,
    getItem,
    updateCachedTreeItems,
    resetCachedTreeItems,
    updateSelectedItem,
    resetSelectedItem,
    updateSelectedMenu,
    resetSelectedMenu,
    updateExpandedKeys,
    resetExpandedKeys,
  };
}

function createExtraReducers(builder: ActionReducerMapBuilder<ItemStateTypes>) {
  return {
    ...createItem(),
    ...editItem(),
    ...deleteItem(),
    ...getItems(),
    ...getItem(),
    ...updateCachedTreeItems(),
    ...resetCachedTreeItems(),
    ...updateSelectedItem(),
    ...resetSelectedItem(),
    ...updateSelectedMenu(),
    ...resetSelectedMenu(),
    ...updateExpandedKeys(),
    ...resetExpandedKeys(),
  };

  function createItem() {
    return {
      ...builder.addCase(extraActions.createItem.pending, (state) => {
        state.createItem = {
          loading: true,
          payload: null,
          successful: false,
          error: null,
        };
      }),
      ...builder.addCase(extraActions.createItem.fulfilled, (state, action) => {
        state.createItem = {
          loading: false,
          payload: action.payload,
          successful: true,
          error: null,
        };

        state.cachedTreeItems = [...state.cachedTreeItems, action.payload];
      }),
      ...builder.addCase(extraActions.createItem.rejected, (state, action) => {
        state.createItem = {
          loading: false,
          payload: null,
          successful: false,
          error: action.payload,
        };
      }),
    };
  }

  function editItem() {
    return {
      ...builder.addCase(extraActions.editItem.pending, (state) => {
        state.editItem = {
          loading: true,
          payload: null,
          successful: false,
          error: null,
        };
      }),
      ...builder.addCase(extraActions.editItem.fulfilled, (state, action) => {
        state.editItem = {
          loading: false,
          payload: action.payload,
          successful: true,
          error: null,
        };

        state.cachedTreeItems = [...state.cachedTreeItems].map((e) => {
          if (e.id === action.payload.id) return action.payload;
          else return e;
        });
      }),
      ...builder.addCase(extraActions.editItem.rejected, (state, action) => {
        state.editItem = {
          loading: false,
          payload: null,
          successful: false,
          error: action.payload,
        };
      }),
    };
  }

  function deleteItem() {
    return {
      ...builder.addCase(extraActions.deleteItem.pending, (state) => {
        state.deleteItem = {
          loading: true,
          payload: null,
          successful: false,
          error: null,
        };
      }),
      ...builder.addCase(extraActions.deleteItem.fulfilled, (state, action) => {
        state.deleteItem = {
          loading: false,
          payload: action.payload,
          successful: true,
          error: null,
        };

        state.cachedTreeItems = state.cachedTreeItems.filter(
          (e) => e.id !== action.payload.id && e.parentId !== action.payload.id
        );
      }),
      ...builder.addCase(extraActions.deleteItem.rejected, (state, action) => {
        state.deleteItem = {
          loading: false,
          payload: null,
          successful: false,
          error: action.payload,
        };
      }),
    };
  }

  function getItems() {
    return {
      ...builder.addCase(extraActions.getItems.pending, (state) => {
        state.items = {
          loading: true,
          payload: [],
          successful: false,
          error: null,
        };
      }),
      ...builder.addCase(extraActions.getItems.fulfilled, (state, action) => {
        state.items = {
          loading: false,
          payload: action.payload,
          successful: true,
          error: null,
        };

        state.cachedTreeItems = mergeArrays(
          state.cachedTreeItems,
          action.payload
        );
      }),
      ...builder.addCase(extraActions.getItems.rejected, (state, action) => {
        state.items = {
          loading: false,
          payload: [],
          successful: false,
          error: action.payload,
        };
      }),
    };
  }

  function getItem() {
    return {
      ...builder.addCase(extraActions.getItem.pending, (state) => {
        state.item = {
          loading: true,
          payload: undefined,
          successful: false,
          error: null,
        };
      }),
      ...builder.addCase(extraActions.getItem.fulfilled, (state, action) => {
        state.item = {
          loading: false,
          payload: action.payload,
          successful: true,
          error: null,
        };
      }),
      ...builder.addCase(extraActions.getItem.rejected, (state, action) => {
        state.item = {
          loading: false,
          payload: undefined,
          successful: false,
          error: action.payload,
        };
      }),
    };
  }

  function updateCachedTreeItems() {
    return {
      ...builder.addCase(
        extraActions.updateCachedTreeItems,
        (state, action) => {
          state.cachedTreeItems = mergeArrays(
            state.cachedTreeItems,
            action.payload
          );
        }
      ),
    };
  }

  function resetCachedTreeItems() {
    return {
      ...builder.addCase(extraActions.resetCachedTreeItems, (state) => {
        state.cachedTreeItems = [];
      }),
    };
  }

  function updateSelectedItem() {
    return {
      ...builder.addCase(extraActions.updateSelectedItem, (state, action) => {
        state.selectedItem = action.payload;
      }),
    };
  }

  function resetSelectedItem() {
    return {
      ...builder.addCase(extraActions.resetSelectedItem, (state) => {
        state.selectedItem = null;
      }),
    };
  }

  function updateSelectedMenu() {
    return {
      ...builder.addCase(extraActions.updateSelectedMenu, (state, action) => {
        state.selectedMenu = action.payload;
      }),
    };
  }

  function resetSelectedMenu() {
    return {
      ...builder.addCase(extraActions.resetSelectedMenu, (state) => {
        state.selectedMenu = null;
      }),
    };
  }

  function updateExpandedKeys() {
    return {
      ...builder.addCase(extraActions.updateExpandedKeys, (state, action) => {
        state.expandedKeys = action.payload;
      }),
    };
  }

  function resetExpandedKeys() {
    return {
      ...builder.addCase(extraActions.resetExpandedKeys, (state) => {
        state.expandedKeys = [];
      }),
    };
  }
}

const ItemSlice = createSlice({
  name,
  initialState: ItemInitialState,
  reducers: {},
  extraReducers: (builder) => createExtraReducers(builder),
});

export const ItemActions = {
  ...ItemSlice.actions,
  ...extraActions,
};
export const ItemReducer = ItemSlice.reducer;
