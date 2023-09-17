import React from "react";
import { Button } from "react-bootstrap";
import { Link } from "react-router-dom";
import axios from "axios";

const CategoryTableRow = (props) => {
    const { _id, esName, enName } = props.obj;

    const deleteCategory = () => {
        axios
            .delete(
                "http://localhost:4000/categories/" + _id)
            .then((res) => {
                if (res.status === 200) {
                    alert("Category successfully deleted");
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
                    to={"/edit-category/" + _id}>
                    Edit
                </Link>
                <Button onClick={deleteCategory}
                    size="sm" variant="danger">
                    Delete
                </Button>
            </td>
        </tr>
    );
};

export default CategoryTableRow;
