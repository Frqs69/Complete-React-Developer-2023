import { compose, createStore, applyMiddleware } from "redux";
import { persistStore, persistReducer } from "redux-persist";
import storage from "redux-persist/lib/storage";
import logger from "redux-logger";

// we can use one side effect asyncronous library
// we can use redux-thunk
import thunk from "redux-thunk"; // we can use thunk or saga
// or we can use redux-saga
import createSagaMiddleware from "redux-saga";
import { rootSaga } from "./root-saga";

import { rootReducer } from "./root-reducer";

// persist is used to save the redux state in the local storage
const persistConfig = {
	key: "root",
	storage,
	whitelist: ["cart"],
};

const persistedReducer = persistReducer(persistConfig, rootReducer);

const sagaMiddleware = createSagaMiddleware();

// create middleware which run before reduce after dispatch action
// used to log out actions in this case
const middleWares = [
	process.env.NODE_ENV !== "production" && logger,
	// thunk,
	sagaMiddleware,
].filter(Boolean);

// used for add in for firefox for testing
const composeEnhancer =
	(process.env.NODE_ENV !== "production" &&
		window &&
		window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__) ||
	compose;

// join multiple functions in one function using compose
// in this case we compose multiple middlewares if we have if not,
// only use one for now
const composeEnhancers = composeEnhancer(applyMiddleware(...middleWares));

// root reducer - one big reducer with all the reducers
// createStore
// first argument is rootReducer which contains all the reducers
// second argument is for the additional states if we have any
// third parameter are middlewares
export const store = createStore(persistedReducer, undefined, composeEnhancers);

sagaMiddleware.run(rootSaga);

export const persistor = persistStore(store);
