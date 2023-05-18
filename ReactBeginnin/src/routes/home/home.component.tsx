import { Outlet } from "react-router-dom";

import CategoryContainer from "./../../components/category-container/category-container.component";

function Home() {
	return (
		<div>
			<CategoryContainer />
			<Outlet />
		</div>
	);
}

export default Home;
