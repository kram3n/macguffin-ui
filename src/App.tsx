import React, { Fragment } from "react";
import { Route, Routes } from "react-router";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle";
import MacGuffinList from "./components/macguffins/macguffin-list.component";
import MacGuffinForm from "./components/macguffins/macguffin-form/macguffin-form.component";
import AddButton from "./components/macguffins/add-button/add-button.component";

function App() {
	return (
		<Fragment>
			<Routes>
				<Route path="/" element={<MacGuffinList />}>
					<Route path="edit/:id" element={<MacGuffinForm />}></Route>
					<Route path="add" element={<MacGuffinForm />}></Route>
					<Route path="" element={<AddButton />}></Route>
				</Route>
			</Routes>
		</Fragment>
	);
}

export default App;
