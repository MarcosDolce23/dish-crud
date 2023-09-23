import React, { useState, useEffect } from "react";
import Axios from "axios";
import { Table, Spinner } from "react-bootstrap";
import IngredientsTableRow from "./IngredientTableRow";

const IngredientList = () => {
    const [error, setError] = useState(null);
    const [isLoaded, setIsLoaded] = useState(false);
    const [ingredients, setIngredients] = useState([]);

    useEffect(() => {
        Axios({
            url: "http://localhost:4000/ingredients/",
        })
            .then((response) => {
                setIsLoaded(true);
                setIngredients(response.data);
            })
            .catch((error) => {
                console.log(error);
                setIsLoaded(true);
                setError(error);
            });
    }, []);

    const DataTable = () => {
        return ingredients.map((res, i) => {
            return <IngredientsTableRow obj={res} key={i} />;
        });
    };

    if (error) {
        return <div>Error: {error.message}</div>
    } else if (!isLoaded) {
        return (
            <div id="spinner" className="spinner">
                <Spinner animation="border" role="status">
                    <span className="visually-hidden">Loading...</span>
                </Spinner>
            </div>
        )
    } else {
        return (
            <>
                <h1>Ingredients List</h1>
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
            </>
        );
    }

};

export default IngredientList;
