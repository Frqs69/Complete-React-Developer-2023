import { takeLatest, all, call, put } from "redux-saga/effects";

import { getCategoriesAndDocuments } from "../../utils/firebase/firebase.utils";

import {
	fetchCategoriesSuccess,
	fetchCategoriesFailed,
} from "./category.action";

import { CATEGORIES_ACTION_TYPE } from "./category.types";

//yield - place when code stops and wait for our next action
// if action success, then go to next yield action
// put in redux-saga === dispatch in redux-thunk
// call - takes function to be executed and second argument are argument given to this function

export function* fetchCategoriesAsync() {
	try {
		const categoriesArray = yield call(getCategoriesAndDocuments, "categories");
		yield put(fetchCategoriesSuccess(categoriesArray));
	} catch (error) {
		yield put(fetchCategoriesFailed(error));
	}
}

export function* onFetchCategories() {
	yield takeLatest(
		CATEGORIES_ACTION_TYPE.FETCH_CATEGORIES_START,
		fetchCategoriesAsync
	);
}

export function* categoriesSaga() {
	yield all([call(onFetchCategories)]);
}
