import { FromInputLabel, Group, Input } from "./form-input.styles";

const FormInput = ({ label, ...otherProps }) => {
	return (
		<Group>
			<Input {...otherProps} />
			{label && (
				<FromInputLabel shrink={otherProps.value.length}>
					{label}
				</FromInputLabel>
			)}
		</Group>
	);
};

export default FormInput;
