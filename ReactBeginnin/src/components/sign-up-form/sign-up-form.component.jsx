import { useState } from "react";

import FormInput from "../form-input/form-input.component";

import {
	createUserWithEmailAndPasswordForm,
	createUserDocumentFromAuth,
} from "../../utils/firebase/firebase.utils";

const defaultFormFields = {
	displayName: "",
	email: "",
	password: "",
	confirmPassword: "",
};

const SignUpForm = () => {
	const [formFields, setFormFields] = useState(defaultFormFields);
	const { displayName, email, password, confirmPassword } = formFields;

	// add value from fields to formFields object
	const handleChange = (event) => {
		const { name, value } = event.target;

		setFormFields({ ...formFields, [name]: value });
	};

	const resetFormFields = () => {
		setFormFields(defaultFormFields);
	};

	// handle submit form
	const handleSubmit = async (event) => {
		event.preventDefault();

		if (password !== confirmPassword) {
			alert("Passwords do not match");
			return;
		}

		try {
			const { user } = await createUserWithEmailAndPasswordForm(
				email,
				password
			);

			const userDocRef = await createUserDocumentFromAuth(user, {
				displayName,
			});

			resetFormFields();
		} catch (err) {
			if (error.code === "auth/email-already-in-use") {
				alert("Cannot create user, email already in use");
			} else {
				console.log(err);
			}
		}
	};

	return (
		<div>
			<h1>Sing up with your email and password</h1>
			<form onSubmit={handleSubmit}>
				<FormInput
					label='Display name'
					type='text'
					required
					onChange={handleChange}
					name='displayName'
					value={displayName}
				/>

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

				<FormInput
					label='Confirm Password'
					type='password'
					required
					onChange={handleChange}
					name='confirmPassword'
					value={confirmPassword}
				/>

				<button type='submit'>Sign up</button>
			</form>
		</div>
	);
};

export default SignUpForm;
