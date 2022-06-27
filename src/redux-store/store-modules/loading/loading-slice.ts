import { createSlice, PayloadAction } from "@reduxjs/toolkit";

import { APP_ACTIONS } from "../../../config/actions";

export type LoadingReducerState = Record<APP_ACTIONS, boolean>;

const initialState: LoadingReducerState = {
  [APP_ACTIONS.SEARCH_MOVIES]: false,
  [APP_ACTIONS.GET_MOVIE_DETAIL]: false,
};

const loadingSlice = createSlice({
  name: "loading",
  initialState,
  reducers: {
    setLoading(state, action: PayloadAction<{ action: APP_ACTIONS; isLoading: boolean }>) {
      return {
        ...state,
        [action.payload.action]: action.payload.isLoading,
      };
    },
  },
});

export const loadingSliceActions = loadingSlice.actions;
export default loadingSlice.reducer;
