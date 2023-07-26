import React, { useState } from "react";
import { MacGuffin } from "../../../models/macguffin.model";

interface Props {
	macguffin: MacGuffin;
	onDelete: (id: number) => void;
	onEdit: (id: number) => void;
}

const MacGuffinItem = (props: Props) => {
	const { macguffin, onDelete, onEdit } = props;
	const [isOpen, setIsOpen] = useState(false);

	const toggleOpen = () => setIsOpen(!isOpen);

	return (
		<div className="accordion-item bg-info-subtle">
			<h2 className="accordion-header" id={`headingOne${macguffin.id}`}>
				<button
					className="accordion-button bg-secondary-subtle border border-info-subtle rounded"
					type="button"
					onClick={toggleOpen}
					aria-expanded={isOpen}
					aria-controls={`collapse${macguffin.id}`}
				>
					{macguffin.name}
				</button>
			</h2>
			<div
				id={`collapse${macguffin.id}`}
				className={`accordion-collapse collapse ${isOpen ? "show" : ""}`}
				aria-labelledby={`headingOne${macguffin.id}`}
			>
				<div className="accordion-body">
					<div className="d-flex m-0">
						<div className="flex-grow-1">
							<p>{`${macguffin.description}`}</p>
						</div>
						<div className="flex-grow-1">
							<p className="me-auto ">
								<strong>Origin: </strong>
								{`${macguffin.origin}`}
							</p>
						</div>
						<div className="flex-grow-1">
							<p>
								<strong>Rating: </strong>
								{`${macguffin.rating}`}
							</p>
						</div>
					</div>
				</div>
				<div className="d-flex m-2 mt-0 justify-content-end align-items-center">
					<button
						className="btn btn-outline-primary me-auto"
						onClick={() => onEdit(macguffin.id)}
					>
						Edit
					</button>
					<button
						className="btn btn-outline-danger"
						onClick={() => onDelete(macguffin.id)}
					>
						Delete
					</button>
				</div>
			</div>
		</div>
	);
};

export default MacGuffinItem;
