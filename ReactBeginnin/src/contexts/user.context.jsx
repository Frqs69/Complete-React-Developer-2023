import { createContext, useEffect, useReducer } from "react";

import {
	onAuthStateChangedListener,
	createUserDocumentFromAuth,
} from "../utils/firebase/firebase.utils";

// actual value you want to access - need using reducer and useState
export const UserContext = createContext({
	currentUser: "null",
	setCurrentUser: () => null,
});

// create object contains all types of actions
export const USER_ACTION_TYPES = {
	SET_CURRENT_USER: "SET_CURRENT_USER",
};

// create reducer function which return new object
// action - store type and payload for that action
// type - give type of action
const userReducer = (state, action) => {
	const { type, payload } = action;

	switch (type) {
		case USER_ACTION_TYPES.SET_CURRENT_USER:
			return {
				...state,
				currentUser: payload,
			};
		default:
			throw new Error(`Unhandled type: ${type} in userReducer`);
	}
};

// create initial state for userReducer
const INITIAL_STATE = {
	currentUser: "null",
};

// using UserContext.Provider we can wrap all children in it and pass them data from UserContext
export const UserProvider = ({ children }) => {
	// useReducer have two arguments - our reducer function and initial  value for state
	// [] - what we get back from reducer
	// state - current state from INITIAL_STATE
	// dispatch - function that change state of give object
	// gives to reducer action argument
	const [state, dispatch] = useReducer(userReducer, INITIAL_STATE);

	const { currentUser } = state;

	const setCurrentUser = (user) => {
		dispatch({ type: USER_ACTION_TYPES.SET_CURRENT_USER, payload: user });
	};

	const value = { currentUser, setCurrentUser };

	useEffect(() => {
		const unsubscribe = onAuthStateChangedListener((user) => {
			if (user) {
				createUserDocumentFromAuth(user);
			}
			setCurrentUser(user);
		});

		return unsubscribe;
	}, []);

	// we can access to provider value from anywhere in nested tree
	return <UserContext.Provider value={value}>{children}</UserContext.Provider>;
};
