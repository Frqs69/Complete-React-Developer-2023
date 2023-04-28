import { combineReducers } from "redux";

import { userReducer } from "./user/user.reducer";
import { categoriesReducer } from "./categories/category.reducer";

// create rootReducer which combines all reducers
export const rootReducer = combineReducers({
	user: userReducer,
	categories: categoriesReducer,
});
