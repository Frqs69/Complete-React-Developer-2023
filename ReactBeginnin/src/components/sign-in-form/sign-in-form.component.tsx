import { useState, FormEvent, ChangeEvent } from "react";

import FormInput from "../form-input/form-input.component";
import Button, { BUTTON_TYPE_CLASSES } from "../button/button.component";

import { ButtonContainer, SignInContainer } from "./sign-in-form.styles";
import {
	signInWithGooglePopup,
	signInUserWithEmailAndPasswordForm,
} from "../../utils/firebase/firebase.utils";

const defaultFormFields = {
	email: "",
	password: "",
};
const SignInForm = () => {
	const [formFields, setFormFields] = useState(defaultFormFields);
	const { email, password } = formFields;

	const resetFormFields = () => {
		setFormFields(defaultFormFields);
	};

	const signInWithGoogle = async () => {
		await signInWithGooglePopup();
	};

	const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
		event.preventDefault();

		try {
			await signInUserWithEmailAndPasswordForm(email, password);
			resetFormFields();
		} catch (error) {
			console.log("user sign in failed", error);
		}
	};

	const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
		const { name, value } = event.target;

		setFormFields({ ...formFields, [name]: value });
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
