import { Middleware, configureStore } from "@reduxjs/toolkit";
import { createLogger } from "redux-logger";

import { MenuReducer } from "./slices/menu/menu.slice";
import { ItemReducer } from "./slices/item/item.slice";

const middlewares: Middleware[] = [];
const logger = createLogger();
middlewares.push(logger);

const store = configureStore({
  reducer: {
    menu: MenuReducer,
    item: ItemReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      immutableCheck: false,
      serializableCheck: false,
    }).concat(middlewares),
  devTools: true,
});

export type AppStore = ReturnType<typeof store.getState>;
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
export default store;
