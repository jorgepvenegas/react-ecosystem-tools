import { createStore, combineReducers, applyMiddleware } from "redux";
import { persistReducer } from "redux-persist";
import storage from "redux-persist/lib/storage";
import autoMergeLevel2 from "redux-persist/lib/stateReconciler/autoMergeLevel2";
import thunk from "redux-thunk";
import { composeWithDevTools } from "redux-devtools-extension";
import { todos } from "./todos/reducers";

const reducers = { todos };

const persistConfig = {
  key: "root",
  storage,
  stateReconciler: autoMergeLevel2,
};

const rootReducer = combineReducers(reducers);
const persisterReducer = persistReducer(persistConfig, rootReducer);

const middlewares = [thunk];
const middlewareEnhancer = applyMiddleware(...middlewares);

const enhancers = [middlewareEnhancer];

const composedEnhancers = composeWithDevTools(...enhancers);
export const configureStore = () =>
  createStore(persisterReducer, composedEnhancers);
