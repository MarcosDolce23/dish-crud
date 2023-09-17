import React from "react";
import { Button } from "react-bootstrap";
import { Link } from "react-router-dom";
import axios from "axios";

const IngredientsTableRow = (props) => {
    const { _id, esName, enName } = props.obj;

    const deleteIngredient = () => {
        axios
            .delete(
                "http://localhost:4000/ingredients/" + _id)
            .then((res) => {
                if (res.status === 200) {
                    alert("Ingredient successfully deleted");
                    window.location.reload();
                } else Promise.reject();
            })
            .catch((err) => alert("Something went wrong"));
    };

    return (
        <tr>
            <td>{esName}</td>
            <td>{enName}</td>
            <td>
                <Link className="edit-link"
                    to={"/edit-ingredient/" + _id}>
                    Edit
                </Link>
                <Button onClick={deleteIngredient}
                    size="sm" variant="danger">
                    Delete
                </Button>
            </td>
        </tr>
    );
};

export default IngredientsTableRow;
