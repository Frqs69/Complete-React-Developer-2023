import { createSlice } from "@reduxjs/toolkit";

const addCartItem = (cartItems, productToAdd) => {
	// find if cartItems contains productToAdd
	// find method return cartItem if condition is true
	const existingCartItem = cartItems.find(
		(cartItem) => cartItem.id === productToAdd.id
	);

	// if found increment quantity

	if (existingCartItem) {
		return cartItems.map((cartItem) =>
			cartItem.id === productToAdd.id
				? { ...cartItem, quantity: cartItem.quantity + 1 }
				: cartItem
		);
	}

	// return new array with modified cartItems/ new cart item
	return [...cartItems, { ...productToAdd, quantity: 1 }];
};

const removeCartItem = (cartItems, productToRemove) => {
	// find if cartItems contains productToRemove
	// find method return cartItem if condition is true
	const existingCartItem = cartItems.find(
		(cartItem) => cartItem.id === productToRemove.id
	);

	// if found increment quantity
	if (existingCartItem.quantity === 1) {
		// if cart item.id not equal to productToRemove.id then keep the value
		// in this case cartItem
		// if cartItem.id EQUAL to productToRemove.id filter cartItem out
		// filer return only values where callback function return true
		return cartItems.filter((cartItem) => cartItem.id !== productToRemove.id);
	}

	return cartItems.map((cartItem) =>
		cartItem.id === productToRemove.id
			? { ...cartItem, quantity: cartItem.quantity - 1 }
			: cartItem
	);
};

const deleteCartItem = (cartItems, productToDelete) => {
	return cartItems.filter((cartItem) => cartItem.id !== productToDelete.id);
};

export const CART_INITIAL_STATE = {
	isCartOpen: false,
	cartItems: [],
};

export const cartSlice = createSlice({
	name: "cart",
	initialState: CART_INITIAL_STATE,
	reducers: {
		setIsCartOpen(state, action) {
			state.isCartOpen = action.payload;
		},
		addItemToCart(state, action) {
			state.cartItems = addCartItem(state.cartItems, action.payload);
		},
		removeItemFromCart(state, action) {
			state.cartItems = removeCartItem(state.cartItems, action.payload);
		},
		deleteItemFromCart(state, action) {
			state.cartItems = deleteCartItem(state.cartItems, action.payload);
		},
	},
});

export const {
	setIsCartOpen,
	addItemToCart,
	removeItemFromCart,
	deleteItemFromCart,
} = cartSlice.actions;

export const cartReducer = cartSlice.reducer;
