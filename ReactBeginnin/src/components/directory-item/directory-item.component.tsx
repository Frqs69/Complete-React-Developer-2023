import { FC } from "react";
import { useNavigate } from "react-router-dom";

import {
	BackgroundImage,
	DirectoryItemBodyContainer,
	DirectoryItemContainer,
} from "./directory-item.styles";

import { DirectoryCategory } from "../category-container/category-container.component";

type DirectoryItemProps = {
	category: DirectoryCategory;
};

const DirectoryItem: FC<DirectoryItemProps> = ({ category }) => {
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
