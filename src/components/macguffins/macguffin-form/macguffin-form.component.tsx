import { Formik, Form, Field } from "formik";
import React, { useEffect, useState } from "react";
import * as Yup from "yup";
import axios from "axios";
import { useNavigate, useParams } from "react-router-dom";
import { MACGUFFIN_API_URL } from "../../../util/constants.util";

const MacguffinSchema = Yup.object().shape({
	name: Yup.string()
		.min(2, "Name must be greater than 2 characters.")
		.required("Required"),
	description: Yup.string()
		.min(3, "Description must be greater than 3 characters.")
		.required("Required"),
	origin: Yup.string()
		.min(2, "Origin must be greater than 2 characters.")
		.required("Required"),
	rating: Yup.number()
		.min(0, "Rating must be greater than 0.")
		.max(5, "Rating must be less than 5.")
		.required("Required"),
});

const MacGuffinForm = () => {
	const navigate = useNavigate();
	const { id } = useParams();
	const [initialValues, setInitialValues] = useState({
		name: "",
		description: "",
		origin: "",
		rating: 5,
	});

	useEffect(() => {
		if (id) {
			axios
				.get(MACGUFFIN_API_URL + "/" + id)
				.then((response) => {
					console.log(response.data);
					setInitialValues(response.data);
				})
				.catch((e) => {
					console.log(e);
				});
		}
	}, [id]);

	return (
		<div>
			<Formik
				initialValues={initialValues}
				enableReinitialize={true}
				validationSchema={MacguffinSchema}
				onSubmit={(values) => {
					if (id) {
						axios
							.put(`${MACGUFFIN_API_URL}/${id}`, values)
							.then((response) => console.log(response.data))
							.catch((e) => console.log(e))
							.finally(() => navigate("/"));
					} else {
						axios
							.post(MACGUFFIN_API_URL, values)
							.then((response) => console.log(response.data))
							.catch((e) => console.log(e))
							.finally(() => navigate("/"));
					}
				}}
			>
				{({ errors, touched }) => (
					<Form className="container bg-info-subtle p-2 mb-2 mt-2 rounded">
						<div className="form-floating m-2">
							<Field
								id="name"
								name="name"
								type="text"
								placeholder="name"
								className={`form-control ${
									errors.name && touched.name ? "is-invalid" : null
								}`}
							/>
							<label htmlFor="name" className="form-label">
								name
							</label>
							{errors.name && touched.name ? (
								<div id="nameFeedback" className="invalid-feedback">
									{errors.name}
								</div>
							) : null}
						</div>
						<div className="form-floating m-2">
							<Field
								id="description"
								name="description"
								type="text"
								placeholder="description"
								className={`form-control ${
									errors.description && touched.description
										? "is-invalid"
										: null
								}`}
							/>
							<label htmlFor="description" className="form-label">
								description
							</label>
							{errors.description && touched.description ? (
								<div id="descriptionFeedback" className="invalid-feedback">
									{errors.description}
								</div>
							) : null}
						</div>
						<div className="d-flex justify-content-between">
							<div className="form-floating m-2 flex-grow-1">
								<Field
									id="origin"
									name="origin"
									type="text"
									placeholder="origin"
									className={`form-control ${
										errors.origin && touched.origin ? "is-invalid" : null
									}`}
								/>
								<label htmlFor="origin" className="form-label">
									origin
								</label>
								{errors.origin && touched.origin ? (
									<div className="invalid-feedback">{errors.origin}</div>
								) : null}
							</div>
							<div className="form-floating m-2 flex-grow-1">
								<Field
									id="rating"
									name="rating"
									type="number"
									placeholder="rating"
									className={`form-control ${
										errors.rating && touched.rating ? "is-invalid" : null
									}`}
								/>
								<label htmlFor="rating" className="form-label">
									rating
								</label>
								{errors.rating && touched.rating ? (
									<div className="invalid-feedback">{errors.rating}</div>
								) : null}
							</div>
						</div>
						<div className="d-flex">
							<button type="submit" className="btn btn-secondary m-2">
								Submit
							</button>
							<button
								type="button"
								className="btn btn-secondary m-2"
								onClick={() => navigate("/")}
							>
								Cancel
							</button>
						</div>
					</Form>
				)}
			</Formik>
		</div>
	);
};

export default MacGuffinForm;
