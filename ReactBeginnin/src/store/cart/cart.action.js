import { CART_ACTION_TYPES } from "./cart.types";
import { createAction } from "../../utils/reducer/reducer.utils";

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


export const setIsCartOpen = (boolean) => createAction(CART_ACTION_TYPES.SET_IS_CART_OPEN, boolean)


export const addItemToCart = (cartItems, productToAdd) => {
    const newCartItems = addCartItem(cartItems, productToAdd);
    return createAction(CART_ACTION_TYPES.SET_CART_ITEMS,  newCartItems);
};

export const removeItemFromCart = (cartItems, productToRemove) => {
    const newCartItems = removeCartItem(cartItems, productToRemove);
    return createAction(CART_ACTION_TYPES.SET_CART_ITEMS,  newCartItems);
};

export const deleteItemFromCart = (cartItems, productToDelete) => {
    const newCartItems = deleteCartItem(cartItems, productToDelete);
    return createAction(CART_ACTION_TYPES.SET_CART_ITEMS,  newCartItems);
};