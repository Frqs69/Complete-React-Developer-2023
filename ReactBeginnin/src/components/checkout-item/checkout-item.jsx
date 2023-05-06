import { useDispatch } from "react-redux";

import {
	addItemToCart,
	removeItemFromCart,
	deleteItemFromCart,
} from "../../store/cart/cart.reducer";

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
	const dispatch = useDispatch();

	const { id, name, imageUrl, price, quantity } = cartItem;

	const clearItemHandler = () => dispatch(deleteItemFromCart(cartItem));

	const addItemHandler = () => dispatch(addItemToCart(cartItem));

	const removeItemHandler = () => dispatch(removeItemFromCart(cartItem));

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
