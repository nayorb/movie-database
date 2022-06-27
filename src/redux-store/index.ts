import { configureStore } from "@reduxjs/toolkit";
import createSagaMiddleware from "redux-saga";
import rootReducer from "./root-reducer";
import actionSagas from "./action-sagas";

const sagaMiddleware = createSagaMiddleware();

const store = configureStore({
  reducer: rootReducer,
  middleware: [sagaMiddleware],
});

export type TRootState = ReturnType<typeof store.getState>;

export default store;

sagaMiddleware.run(actionSagas);
