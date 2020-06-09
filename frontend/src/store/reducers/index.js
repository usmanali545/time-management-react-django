import { combineReducers } from "redux";
import { connectRouter } from "connected-react-router";
import { persistReducer } from "redux-persist";
import storage from "redux-persist/lib/storage";
import { authReducer } from "./auth";

const authPersistConfig = {
  key: "auth",
  storage: storage,
  blacklist: [],
};

const createRootReducer = (history) =>
  combineReducers({
    router: connectRouter(history),
    auth: persistReducer(authPersistConfig, authReducer),
  });

export default createRootReducer;
