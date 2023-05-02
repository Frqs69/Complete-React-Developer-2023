import { createContext, useState, useEffect } from "react";

import { onAuthStateChangedListener, createUserDocumentFromAuth } from "../utils/firebase/firebase.utils";

// actual value you want to access
export const UserContext = createContext({
	currentUser: "null",
	setCurrentUser: () => null,
});

// using UserContext.Provider we can wrap all children in it and pass them data from UserContext
export const UserProvider = ({ children }) => {
	const [currentUser, setCurrentUser] = useState(null);
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
