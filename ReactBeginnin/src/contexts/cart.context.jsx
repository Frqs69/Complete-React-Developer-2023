import { createContext, useState, useReducer, useEffect } from "react";

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

export const CartContext = createContext({
	isCartOpen: false,
	setIsCartOpen: () => {},
	cartItems: [],
	addItemToCart: () => {},
	cartCount: 0,
	removeItemFromCart: () => {},
	deleteItemFromCart: () => {},
	totalPrice: 0,
});

export const CART_ACTION_TYPES = {
	SET_CART_ITEMS: "SET_CART_ITEMS",
};

const cartReducer = (state, action) => {
	const { type, payload } = action;

	switch (type) {
		case CART_ACTION_TYPES.SET_CART_ITEMS:
			return { ...state, ...payload };
		default:
			throw new Error(`Unhandled type: ${type} in cartReducer`);
	}
};

const INITIAL_STATE = {
	isCartOpen: true,
	cartItems: [],
	cartCount: 0,
	totalPrice: 0,
};

export const CartProvider = ({ children }) => {
	// const [isCartOpen, setIsCartOpen] = useState(false);
	// const [cartItems, setCartItems] = useState([]);
	// const [cartCount, setCartCount] = useState(0);
	// const [totalPrice, setTotalPrice] = useState(0);

	const [state, dispatch] = useReducer(cartReducer, INITIAL_STATE);

	const { isCartOpen, cartItems, cartCount, totalPrice } = state;

	// useEffect(() => {
	// 	const newCartCount = cartItems.reduce(
	// 		(total, cartItem) => total + cartItem.quantity,
	// 		0
	// 	);
	// 	setCartCount(newCartCount);
	// }, [cartItems]);

	// useEffect(() => {
	// 	const newTotalPrice = cartItems.reduce(
	// 		(total, cartItem) => total + cartItem.price * cartItem.quantity,
	// 		0
	// 	);
	// 	setTotalPrice(newTotalPrice);
	// }, [cartItems]);

	const updateCartItemsReducer = (newCartItems) => {
		const newCartCount = newCartItems.reduce(
			(total, cartItem) => total + cartItem.quantity,
			0
		);

		const newTotalPrice = newCartItems.reduce(
			(total, cartItem) => total + cartItem.price * cartItem.quantity,
			0
		);

		dispatch({
			type: "SET_CART_ITEMS",
			payload: {
				cartItems: newCartItems,
				cartCount: newCartCount,
				totalPrice: newTotalPrice,
			},
		});
	};

	const addItemToCart = (productToAdd) => {
		const newCartItems = addCartItem(cartItems, productToAdd);
		updateCartItemsReducer(newCartItems);
	};

	const removeItemFromCart = (productToRemove) => {
		const newCartItems = removeCartItem(cartItems, productToRemove);
		updateCartItemsReducer(newCartItems);
	};

	const deleteItemFromCart = (productToDelete) => {
		const newCartItems = deleteCartItem(cartItems, productToDelete);
		updateCartItemsReducer(newCartItems);
	};

	const value = {
		isCartOpen,
		setIsCartOpen: () => {},
		addItemToCart,
		removeItemFromCart,
		deleteItemFromCart,
		cartItems,
		cartCount,
		totalPrice,
	};
	return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
};
