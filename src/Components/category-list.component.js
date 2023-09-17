import React, { useState, useEffect } from "react";
import Axios from "axios";
import { Table, Spinner } from "react-bootstrap";
import CategoryTableRow from "./CategoryTableRow";

const CategoryList = () => {
    const [error, setError] = useState(null);
    const [isLoaded, setIsLoaded] = useState(false);
    const [categories, setCategories] = useState([]);

    useEffect(() => {
        Axios({
            url: "http://localhost:4000/categories/",
        })
            .then((response) => {
                setIsLoaded(true);
                setCategories(response.data);
            })
            .catch((error) => {
                console.log(error);
                setIsLoaded(true);
                setError(error);
            });
    }, []);

    const DataTable = () => {
        return categories.map((res, i) => {
            return <CategoryTableRow obj={res} key={i} />;
        });
    };

    if (error) {
        return <div>Error: {error.message}</div>
    } else if (!isLoaded) {
        return (
            <div id="spinner">
                <Spinner animation="border" role="status">
                    <span className="visually-hidden">Loading...</span>
                </Spinner>
            </div>
        )
    } else {
        return (
            <Table responsive striped bordered hover>
                <thead>
                    <tr>
                        <th>ES Name</th>
                        <th>EN Name</th>
                        <th>Action</th>
                    </tr>
                </thead>
                <tbody>{DataTable()}</tbody>
            </Table>
        );
    }

};

export default CategoryList;
