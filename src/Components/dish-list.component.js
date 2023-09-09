import React, { useState, useEffect } from "react";
import axios from "axios";
import { Table } from "react-bootstrap";
import DishTableRow from "./DishTableRow";

const DishList = () => {
    const [dishes, setDishes] = useState([]);

    useEffect(() => {
        axios
            .get("http://localhost:4000/dishes/")
            .then(({ data }) => {
                setDishes(data);
            })
            .catch((error) => {
                console.log(error);
            });
    }, []);

    const DataTable = () => {
        return dishes.map((res, i) => {
            return <DishTableRow obj={res} key={i} />;
        });
    };

    return (
        <div className="table-wrapper">
            <Table striped bordered hover>
                <thead>
                    <tr>
                        <th>Name</th>
                        <th>Email</th>
                        <th>Roll No</th>
                        <th>Action</th>
                    </tr>
                </thead>
                <tbody>{DataTable()}</tbody>
            </Table>
        </div>
    );
};

export default DishList;
