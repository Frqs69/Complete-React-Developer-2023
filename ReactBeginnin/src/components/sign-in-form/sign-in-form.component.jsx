import { useState } from "react";
import { useDispatch } from "react-redux";

import FormInput from "../form-input/form-input.component";
import Button, { BUTTON_TYPE_CLASSES } from "../button/button.component";

import { ButtonContainer, SignInContainer } from "./sign-in-form.styles";
import {
	googleSignInStart,
	emailSignInStart,
} from "../../store/user/user.action";

const defaultFormFields = {
	email: "",
	password: "",
};
const SignInForm = () => {
	const dispatch = useDispatch();
	const [formFields, setFormFields] = useState(defaultFormFields);
	const { email, password } = formFields;

	const handleChange = (e) => {
		const { name, value } = e.target;
		setFormFields({ ...formFields, [name]: value });
	};

	const resetFormFields = () => {
		setFormFields(defaultFormFields);
	};

	const handleSubmit = async (e) => {
		e.preventDefault();

		try {
			dispatch(emailSignInStart(email, password));

			resetFormFields();
		} catch (err) {
			if (err.code === "auth/user-not-found") {
				alert("User with this email does not exist");
			} else if (err.code === "auth/wrong-password") {
				alert("Incorrect password");
			} else {
				console.log(err);
			}
		}
	};

	const signInWithGoogle = async () => {
		dispatch(googleSignInStart());
	};

	return (
		<SignInContainer>
			<h2>I already have an account</h2>
			<span>Sing in with your email and password</span>
			<form onSubmit={handleSubmit}>
				<FormInput
					label='Email'
					type='email'
					required
					onChange={handleChange}
					name='email'
					value={email}
				/>

				<FormInput
					label='Password'
					type='password'
					required
					onChange={handleChange}
					name='password'
					value={password}
				/>

				<ButtonContainer>
					<Button type='submit'>Sign in</Button>
					<Button
						type='button'
						buttonType={BUTTON_TYPE_CLASSES.google}
						onClick={signInWithGoogle}>
						Sign in with Google
					</Button>
				</ButtonContainer>
			</form>
		</SignInContainer>
	);
};

export default SignInForm;
