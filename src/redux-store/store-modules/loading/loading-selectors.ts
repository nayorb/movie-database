import { createSelector } from "reselect";
import { APP_ACTIONS } from "../../../config/actions";
import { TRootState } from "../../index";

export const selectLoadingState = createSelector(
  (state: TRootState) => state.loading,
  (loading) => loading,
);

export const selectIsActionLoading = (appAction: APP_ACTIONS) =>
  createSelector(selectLoadingState, (loading) => loading[appAction]);

export const selectIsAnyActionLoading = createSelector(selectLoadingState, (loadingState) => {
  const isAnyActionLoading = !Object.values(loadingState).every((actionState) => !actionState);

  return isAnyActionLoading;
});
