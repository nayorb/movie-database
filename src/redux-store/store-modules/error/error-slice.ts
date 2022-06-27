import { createSlice, PayloadAction } from "@reduxjs/toolkit";

import { APP_ACTIONS } from "../../../config/actions";

export interface IAppError {
  action: APP_ACTIONS;
  message?: string;
  sourceError: { message: string };
}

export type ErrorReducerState = {
  [key in APP_ACTIONS]?: IAppError;
};

const initialState: ErrorReducerState = {};

const errorSlice = createSlice({
  name: "error",
  initialState,
  reducers: {
    addError(state, action: PayloadAction<IAppError>) {
      return { ...state, [action.payload.action]: action.payload };
    },
    removeError(state, action: PayloadAction<APP_ACTIONS>) {
      const newState = { ...state };
      delete newState[action.payload];

      return newState;
    },
  },
});

export const errorSliceActions = errorSlice.actions;
export default errorSlice.reducer;
