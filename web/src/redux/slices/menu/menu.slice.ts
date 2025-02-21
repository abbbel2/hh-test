/* eslint-disable @typescript-eslint/no-explicit-any */
import axios from "@/redux/axios";
import { ResetApiState } from "@/redux/redux.util";
import {
  ActionReducerMapBuilder,
  createAsyncThunk,
  createSlice,
} from "@reduxjs/toolkit";
import { IMenu, MenuStateTypes } from "./menu.util";

const name = "menu";
const extraActions = createExtraActions();

const MenuInitialState: MenuStateTypes = {
  createMenu: ResetApiState(null),
  editMenu: ResetApiState(null),
  deleteMenu: ResetApiState(null),
  menus: ResetApiState([]),
  menu: ResetApiState(null),
};

function createExtraActions() {
  const createMenu = createAsyncThunk<IMenu, any>(
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

  const editMenu = createAsyncThunk<IMenu, any>(
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

  const deleteMenu = createAsyncThunk<IMenu, any>(
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

  const getMenus = createAsyncThunk<IMenu[]>(
    `/get-${name}s`,
    async (_, thunkApi) =>
      axios
        .get(`${name}`)
        .then((response) => {
          return response.data;
        })
        .catch((error) => thunkApi.rejectWithValue(error?.response?.data))
  );

  const getMenu = createAsyncThunk<IMenu | undefined, any>(
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

  return {
    createMenu,
    editMenu,
    deleteMenu,
    getMenus,
    getMenu,
  };
}

function createExtraReducers(builder: ActionReducerMapBuilder<MenuStateTypes>) {
  return {
    ...createMenu(),
    ...editMenu(),
    ...deleteMenu(),
    ...getMenus(),
    ...getMenu(),
  };

  function createMenu() {
    return {
      ...builder.addCase(extraActions.createMenu.pending, (state) => {
        state.createMenu = {
          loading: true,
          payload: null,
          successful: false,
          error: null,
        };
      }),
      ...builder.addCase(extraActions.createMenu.fulfilled, (state, action) => {
        state.createMenu = {
          loading: false,
          payload: action.payload,
          successful: true,
          error: null,
        };
      }),
      ...builder.addCase(extraActions.createMenu.rejected, (state, action) => {
        state.createMenu = {
          loading: false,
          payload: null,
          successful: false,
          error: action.payload,
        };
      }),
    };
  }

  function editMenu() {
    return {
      ...builder.addCase(extraActions.editMenu.pending, (state) => {
        state.editMenu = {
          loading: true,
          payload: null,
          successful: false,
          error: null,
        };
      }),
      ...builder.addCase(extraActions.editMenu.fulfilled, (state, action) => {
        state.editMenu = {
          loading: false,
          payload: action.payload,
          successful: true,
          error: null,
        };
      }),
      ...builder.addCase(extraActions.editMenu.rejected, (state, action) => {
        state.editMenu = {
          loading: false,
          payload: null,
          successful: false,
          error: action.payload,
        };
      }),
    };
  }

  function deleteMenu() {
    return {
      ...builder.addCase(extraActions.deleteMenu.pending, (state) => {
        state.deleteMenu = {
          loading: true,
          payload: null,
          successful: false,
          error: null,
        };
      }),
      ...builder.addCase(extraActions.deleteMenu.fulfilled, (state, action) => {
        state.deleteMenu = {
          loading: false,
          payload: action.payload,
          successful: true,
          error: null,
        };
      }),
      ...builder.addCase(extraActions.deleteMenu.rejected, (state, action) => {
        state.deleteMenu = {
          loading: false,
          payload: null,
          successful: false,
          error: action.payload,
        };
      }),
    };
  }

  function getMenus() {
    return {
      ...builder.addCase(extraActions.getMenus.pending, (state) => {
        state.menus = {
          loading: true,
          payload: [],
          successful: false,
          error: null,
        };
      }),
      ...builder.addCase(extraActions.getMenus.fulfilled, (state, action) => {
        state.menus = {
          loading: false,
          payload: action.payload,
          successful: true,
          error: null,
        };
      }),
      ...builder.addCase(extraActions.getMenus.rejected, (state, action) => {
        state.menus = {
          loading: false,
          payload: [],
          successful: false,
          error: action.payload,
        };
      }),
    };
  }

  function getMenu() {
    return {
      ...builder.addCase(extraActions.getMenu.pending, (state) => {
        state.menu = {
          loading: true,
          payload: undefined,
          successful: false,
          error: null,
        };
      }),
      ...builder.addCase(extraActions.getMenu.fulfilled, (state, action) => {
        state.menu = {
          loading: false,
          payload: action.payload,
          successful: true,
          error: null,
        };
      }),
      ...builder.addCase(extraActions.getMenu.rejected, (state, action) => {
        state.menu = {
          loading: false,
          payload: undefined,
          successful: false,
          error: action.payload,
        };
      }),
    };
  }
}

const MenuSlice = createSlice({
  name,
  initialState: MenuInitialState,
  reducers: {},
  extraReducers: (builder) => createExtraReducers(builder),
});

export const MenuActions = {
  ...MenuSlice.actions,
  ...extraActions,
};
export const MenuReducer = MenuSlice.reducer;
