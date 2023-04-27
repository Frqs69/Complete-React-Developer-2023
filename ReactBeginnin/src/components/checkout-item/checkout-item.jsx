import { useContext } from "react";

import { CartContext } from "../../contexts/cart.context";

import {
	Arrow,
	CheckoutItemContainer,
	ImageContainer,
	Name,
	Price,
	Quantity,
	RemoveButton,
	Value,
} from "./checkout-item.styles";

const CheckoutItem = ({ cartItem }) => {
	const { deleteItemFromCart, removeItemFromCart, addItemToCart } =
		useContext(CartContext);

	const { id, name, imageUrl, price, quantity } = cartItem;

	const clearItemHandler = () => deleteItemFromCart(cartItem);
	const addItemHandler = () => addItemToCart(cartItem);
	const removeItemHandler = () => removeItemFromCart(cartItem);

	return (
		<CheckoutItemContainer key={id}>
			<ImageContainer>
				<img src={imageUrl} alt={`${name}`} />
			</ImageContainer>
			<Name>{name}</Name>
			<Quantity>
				<Arrow onClick={removeItemHandler}>&#10094;</Arrow>
				<Value>{quantity}</Value>
				<Arrow onClick={addItemHandler}>&#10095;</Arrow>
			</Quantity>
			<Price>${price}</Price>
			<RemoveButton onClick={clearItemHandler}>&#10005;</RemoveButton>
		</CheckoutItemContainer>
	);
};

export default CheckoutItem;
