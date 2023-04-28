import { compose, createStore, applyMiddleware } from "redux";
import logger from "redux-logger";

import { rootReducer } from "./root-reducer";

// create middleware which run before reduce after dispatch action
// used to log out actions in this case
const middleWares = [logger];

// join multiple functions in one function using compose
// in this case we compose multiple middlewares if we have if not,
// only use one for now
const composeEnhancers = compose(applyMiddleware(...middleWares));

// root reducer - one big reducer with all the reducers
// createStore
// first argument is rootReducer which contains all the reducers
// second argument is for the additional states if we have any
// third parameter are middlewares
export const store = createStore(rootReducer, undefined, composeEnhancers);
