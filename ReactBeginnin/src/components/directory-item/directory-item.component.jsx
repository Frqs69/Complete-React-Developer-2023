import { useNavigate } from "react-router-dom";

import {
	BackgroundImage,
	DirectoryItemBodyContainer,
	DirectoryItemContainer,
} from "./directory-item.styles";

const DirectoryItem = ({ category }) => {
	const { imageUrl, title } = category;
	const navigate = useNavigate();

	const handleNavigate = () => {
		navigate(`shop/${title}`);
	};

	return (
		<DirectoryItemContainer>
			<BackgroundImage imageUrl={imageUrl} />

			<DirectoryItemBodyContainer onClick={handleNavigate}>
				<h2>{title}</h2>
				<p>Shop Now</p>
			</DirectoryItemBodyContainer>
		</DirectoryItemContainer>
	);
};

export default DirectoryItem;
