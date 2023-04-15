import { initializeApp } from "firebase/app";
import {
	getAuth,
	signInWithRedirect,
	signInWithPopup,
	GoogleAuthProvider,
} from "firebase/auth";

import { getFirestore, doc, getDoc, setDoc } from "firebase/firestore";

// Your web app's Firebase configuration
const firebaseConfig = {
	apiKey: "AIzaSyBLCBz71wEvSPDLYe9Qz0-w5LQcgXW8Qh4",
	authDomain: "firstprojectdb-de75b.firebaseapp.com",
	projectId: "firstprojectdb-de75b",
	storageBucket: "firstprojectdb-de75b.appspot.com",
	messagingSenderId: "198635365524",
	appId: "1:198635365524:web:dc204989df64ffd120c081",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// setting up provider
const provider = new GoogleAuthProvider();
provider.setCustomParameters({
	prompt: "select_account",
});

// taking authorization from user
export const auth = getAuth();

// enables sign in with google popup
export const signInWithGooglePopup = () => signInWithPopup(auth, provider);

export const db = getFirestore();

export const createUserDocumentFromAuth = async (userAuth) => {
	// connect to database table users and create user using userID
	const userDocRef = doc(db, "users", userAuth.uid);

	// allow access data from firebase
	const userSnapshot = await getDoc(userDocRef);

	// check if user exists
	//console.log(userSnapshot.exists());

	// if user data  not exists
	if (!userSnapshot.exists()) {
		const { displayName, email } = userAuth;
		const createdAt = new Date();

		try {
			await setDoc(userDocRef, {
				displayName,
				email,
				createdAt,
			});
		} catch (error) {
			console.log("error creating user", error.message);
		}
	}

	// return userDocRef
	return userDocRef;
};
