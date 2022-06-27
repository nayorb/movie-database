import { createSelector } from "reselect";

import { TRootState } from "../../index";
import { APP_ACTIONS } from "../../../config/actions";

export const selectErrorState = createSelector(
  (state: TRootState) => state.error,
  (errors) => errors,
);

export const selectActionError = (appAction: APP_ACTIONS) =>
  createSelector(selectErrorState, (errors) => errors[appAction]);
