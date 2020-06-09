import { createStore, compose, applyMiddleware } from "redux";
import { persistStore, persistReducer } from "redux-persist";
import storage from "redux-persist/lib/storage";
import createSagaMiddleware from "redux-saga";
import { createBrowserHistory } from "history";
import { routerMiddleware } from "connected-react-router";
import createRootReducer from "./reducers";
import rootSaga from "./sagas";

export const history = createBrowserHistory();

const sagaMiddleware = createSagaMiddleware();

const rootPersistConfig = {
  key: "root",
  storage,
  blacklist: ["auth"],
};

export default function configureStore(preloadedState = {}) {
  const composeEnhanders =
    window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
  const persistedReducer = persistReducer(
    rootPersistConfig,
    createRootReducer(history)
  );
  const store = createStore(
    persistedReducer,
    preloadedState,
    composeEnhanders(applyMiddleware(routerMiddleware(history), sagaMiddleware))
  );
  sagaMiddleware.run(rootSaga);
  let persistor = persistStore(store);
  return { store, persistor };
}
