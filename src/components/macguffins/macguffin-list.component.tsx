import React, { Fragment, useEffect, useState } from "react";
import axios from "axios";
import { useNavigate, Outlet, useParams } from "react-router-dom";
import { MacGuffin } from "../../models/macguffin.model";
import { MACGUFFIN_API_URL } from "../../util/constants.util";
import MacGuffinItem from "./macguffin-item/macguffin-item.component";

const MacGuffinList = () => {
	const [macguffins, setMacguffins] = useState<MacGuffin[]>([]);
	const navigate = useNavigate();
	const params = useParams();

	useEffect(() => {
		retrieveMacGuffins();
	}, [params]);

	const retrieveMacGuffins = () => {
		axios
			.get(MACGUFFIN_API_URL)
			.then((response) => {
				setMacguffins(response.data);
			})
			.catch((e) => {
				console.log(e);
			});
	};

	const onDelete = (id: number) => {
		axios
			.delete(MACGUFFIN_API_URL + "/" + id)
			.then((response) => {
				console.log(response.data);
				navigate("/");
			})
			.catch((e) => {
				console.log(e);
			});
	};

	const onEdit = (id: number) => {
		navigate("/edit/" + id);
	};

	return (
		<Fragment>
			<div className="container-fluid bg-primary-subtle mt-0 pb-2 border-bottom border-info-subtle">
				<div className="d-flex justify-content-center">
					<h3 className="mt-2 mb-2 display-5">MacGuffins!</h3>
				</div>
			</div>
			<div className="container w-80">
				<Outlet />
			</div>
			<div className="container w-80 mt-2">
				<div className="accordion" id="booklist">
					{macguffins.map((macguffin) => (
						<MacGuffinItem
							key={macguffin.id}
							macguffin={macguffin}
							onDelete={onDelete}
							onEdit={onEdit}
						/>
					))}
				</div>
			</div>
		</Fragment>
	);
};

export default MacGuffinList;
