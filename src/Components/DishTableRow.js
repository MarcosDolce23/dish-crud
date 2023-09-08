import React from "react";
import { Button } from "react-bootstrap";
import { Link } from "react-router-dom";
import axios from "axios";

const DishesTableRow = (props) => {
const { _id, name, email, rollno } = props.obj;

const deleteDish = () => {
	axios
	.delete(
"http://localhost:4000/dishes/delete-dish/" + _id)
	.then((res) => {
		if (res.status === 200) {
		alert("Dish successfully deleted");
		window.location.reload();
		} else Promise.reject();
	})
	.catch((err) => alert("Something went wrong"));
};

return (
	<tr>
	<td>{name}</td>
	<td>{email}</td>
	<td>{rollno}</td>
	<td>
		<Link className="edit-link"
		to={"/edit-dish/" + _id}>
		Edit
		</Link>
		<Button onClick={deleteDish}
		size="sm" variant="danger">
		Delete
		</Button>
	</td>
	</tr>
);
};

export default DishesTableRow;
