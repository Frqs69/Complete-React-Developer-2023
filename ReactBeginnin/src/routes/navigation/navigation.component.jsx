import { Fragment, useContext } from "react";
import { Outlet, Link } from "react-router-dom";

// allow us to interact from component with redux store
import { useSelector } from "react-redux";

import CartIcon from "../../components/cart-icon/cart-icon.component";
import CartDropdown from "../../components/cart-dropdown/cart-dropdown.component";

// import { UserContext } from "../../contexts/user.context";
import { CartContext } from "../../contexts/cart.context";

import { signOutUser } from "../../utils/firebase/firebase.utils";

import { ReactComponent as CrownLogo } from "./../../assets/crown.svg";

import {
	NavigationContainer,
	LogoContainer,
	NavLinks,
	NavLink,
} from "./navigation.styles";

import { selectCurrentUser } from "../../store/user/user.selector";

const Navigation = () => {
	// const { currentUser } = useContext(UserContext);
	const { isCartOpen } = useContext(CartContext);

	// hook witch we give selector function which extracts value which
	// want from store in this case we use user Reducer from Redux
	// and we take currentUser from user
	const currentUser = useSelector(selectCurrentUser);

	return (
		<Fragment>
			<NavigationContainer>
				<LogoContainer to='/'>
					<CrownLogo className='logo' />
				</LogoContainer>
				<NavLinks>
					<NavLink to='/shop'>SHOP</NavLink>
					{currentUser ? (
						<NavLink as='span' onClick={signOutUser}>
							SIGN OUT
						</NavLink>
					) : (
						<NavLink to='/auth'>SIGN IN</NavLink>
					)}
					<CartIcon />
				</NavLinks>
				{isCartOpen && <CartDropdown />}
			</NavigationContainer>
			<Outlet />
		</Fragment>
	);
};

export default Navigation;
