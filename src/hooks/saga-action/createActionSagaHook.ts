import React from "react";
import { useSelector } from "react-redux";

import { APP_ACTIONS } from "../../config/actions";
import useActionDispatch from "../dispatch/useActionDispatch";
import { IAppError } from "../../redux-store/store-modules/error/error-slice";
import { selectActionError } from "../../redux-store/store-modules/error/error-selectors";
import { selectIsActionLoading } from "../../redux-store/store-modules/loading/loading-selectors";

function createActionSagaHook<D>(appActionType: APP_ACTIONS) {
  return (): {
    isLoading: boolean;
    action(data?: D): Promise<unknown>;
    error: IAppError | undefined;
  } => {
    const actionDispatch = useActionDispatch<D>();

    const runAppAction = React.useCallback(
      (data: D) =>
        new Promise((res, rej) => {
          const onSuccess = () => res(undefined);
          const onFailure = (error: IAppError) => rej(error);

          actionDispatch({
            type: appActionType,
            payload: {
              data,
              onSuccess,
              onFailure,
            },
          });
        }),
      [actionDispatch],
    );

    const error = useSelector(selectActionError(appActionType));
    const isLoading = useSelector(selectIsActionLoading(appActionType));

    return {
      isLoading,
      action: runAppAction,
      error,
    };
  };
}

export default createActionSagaHook;
