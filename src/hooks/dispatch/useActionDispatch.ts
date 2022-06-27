import { PayloadAction } from "@reduxjs/toolkit";
import { useDispatch } from "react-redux";

import { APP_ACTIONS } from "../../config/actions";
import { IAppError } from "../../redux-store/store-modules/error/error-slice";

export interface ISagaPayload<D> {
  data: D;
  onSuccess(): void;
  onFailure(error: IAppError): void;
}

export type TSagaPayloadAction<D> = PayloadAction<ISagaPayload<D>, APP_ACTIONS>;

function useActionDispatch<D>() {
  const dispatch: (action: TSagaPayloadAction<D>) => void = useDispatch();
  return dispatch;
}

export default useActionDispatch;
