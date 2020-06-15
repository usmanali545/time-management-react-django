import { combineReducers } from "redux";
import { connectRouter } from "connected-react-router";
import { persistReducer } from "redux-persist";
import storage from "redux-persist/lib/storage";
import { authReducer } from "./auth";
import { recordReducer } from "./record";
import { adminReducer } from "./admin";

const authPersistConfig = {
  key: "auth",
  storage: storage,
  blacklist: ["error", "status"],
};

const recordPersistConfig = {
  key: "record",
  storage: storage,
  blacklist: ["error", "status"],
};

const adminPersistConfig = {
  key: "admin",
  storage: storage,
  blacklist: ["error", "status"],
};

const createRootReducer = (history) =>
  combineReducers({
    router: connectRouter(history),
    auth: persistReducer(authPersistConfig, authReducer),
    record: persistReducer(recordPersistConfig, recordReducer),
    admin: persistReducer(adminPersistConfig, adminReducer),
  });

export default createRootReducer;
