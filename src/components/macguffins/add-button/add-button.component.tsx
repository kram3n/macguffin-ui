import React from "react";
import { useNavigate } from "react-router-dom";

const AddButton = () => {
	const navigate = useNavigate();

	return (
		<button
			className="btn btn-info mt-2 p-2"
			onClick={() => {
				navigate("add");
			}}
		>
			add
		</button>
	);
};

export default AddButton;
