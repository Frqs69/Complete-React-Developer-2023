import { Routes, Route } from "react-router-dom";
import { useEffect } from "react";
import { useDispatch } from "react-redux";

import Home from "./routes/home/home.component";
import Navigation from "./routes/navigation/navigation.component";
import Authentication from "./routes/authentication/authentication.component";
import Shop from "./routes/shop/shop.component";
import Checkout from "./routes/checkout/checkout.component";
import {
	onAuthStateChangedListener,
	createUserDocumentFromAuth,
} from "./utils/firebase/firebase.utils";
import { setCurrentUser } from "./store/user/user.reducer";

// index - if you hit route '/' it will be rendered as base component
function App() {
	const dispatch = useDispatch();

	useEffect(() => {
		const unsubscribe = onAuthStateChangedListener((user) => {
			if (user) {
				createUserDocumentFromAuth(user);
			}
			console.log(setCurrentUser(user));
			dispatch(setCurrentUser(user));
		});

		return unsubscribe;
	}, []);

	return (
		<Routes>
			<Route path='/' element={<Navigation />}>
				<Route index element={<Home />} />
				<Route path='auth' element={<Authentication />} />
				<Route path='shop/*' element={<Shop />}></Route>
				<Route path='checkout' element={<Checkout />} />
			</Route>
		</Routes>
	);
}
export default App;
