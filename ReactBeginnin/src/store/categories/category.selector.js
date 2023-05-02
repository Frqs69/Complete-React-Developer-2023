import { createSelector } from "reselect";

const selectCategoryReducer = (state) => state.categories;

// run only if selectCategoryReducer is change
// sum up, it only work when categories changed
export const selectCategories = createSelector(
	[selectCategoryReducer], // input selector
	(categoriesSlice) => categoriesSlice.categoriesArray // output selector
);

// if selectCategoryReducer changed rerun this method 
export const selectCategoriesMap = createSelector(
	[selectCategories],
	(categories) =>
		categories.reduce((acc, category) => {
			const { title, items } = category;
			acc[title.toLowerCase()] = items;
			return acc;
		}, {})
);
