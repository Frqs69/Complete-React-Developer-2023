import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import { Provider } from "react-redux";
import { PersistGate } from "redux-persist/integration/react";
import { Elements } from "@stripe/react-stripe-js";
import { stripePromise } from "./utils/stripe/stripe.utils";

import App from "./App";
import { store } from "./store/store";

import "./index.scss";

// Everything in app component can access data from UserProvider
// and check if it is a valid user or not, and when we log in
// current user can be saved in UserProvider

ReactDOM.createRoot(document.getElementById("root")).render(
	<React.StrictMode>
		<Provider store={store}>
			{/* <PersistGate loading={null} persistor={persistor}> */}
			<BrowserRouter>
				<Elements stripe={stripePromise}>
					<App />
				</Elements>
			</BrowserRouter>
			{/* </PersistGate> */}
		</Provider>
	</React.StrictMode>
);
