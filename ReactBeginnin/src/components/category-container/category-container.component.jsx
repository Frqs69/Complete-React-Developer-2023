import DirectoryItem from "./../directory-item/directory-item.component";

import "./categories.styles.scss";

const CategoryContainer = ({ categories }) => {
	return (
		<div className='categories-container'>
			{categories.map((category) => (
				<DirectoryItem key={category.id} category={category} />
			))}
		</div>
	);
};

export default CategoryContainer;
