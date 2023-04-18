import { useState } from "react";

import {
	signInWithGooglePopup,
	createUserDocumentFromAuth,
	signInUserWithEmailAndPasswordForm,
} from "../../utils/firebase/firebase.utils";

import FormInput from "../form-input/form-input.component";
import Button from "../button/button.component";

import "./sign-in-form.styles.scss";

const defaultFormFields = {
	email: "",
	password: "",
};
const SignInForm = () => {
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
			const { user } = await signInUserWithEmailAndPasswordForm(
				email,
				password
			);

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
		await signInWithGooglePopup();
	};

	return (
		<div className='sign-in-container'>
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

				<div className='buttons-container'>
					<Button type='submit'>Sign in</Button>
					<Button type='button' buttonType='google' onClick={signInWithGoogle}>
						Sign in with Google
					</Button>
				</div>
			</form>
		</div>
	);
};

export default SignInForm;
