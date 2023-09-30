import React, { useState, useEffect } from "react";
import Axios from "axios";
import { Table, Row, Col, Spinner, Button } from "react-bootstrap";
import IngredientsTableRow from "./IngredientTableRow";
import Utilities from "./Common/Utilities";
import env from "react-dotenv";

const IngredientList = () => {
    const [error, setError] = useState(null);
    const [isLoaded, setIsLoaded] = useState(false);
    const [ingredients, setIngredients] = useState([]);

    useEffect(() => {
        Axios({
            url: env.API_URL + "/ingredients/",
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
                <Row mb="3">
                    <Col md="11">
                        <h1>Ingredients List</h1>
                    </Col>
                    <Col md="1">
                        <div className="d-grid gap-2">
                            <Button variant="secondary" size="sm" onClick={() => Utilities.downloadJson(ingredients, "ingredients.json")}>Export</Button >
                        </div>
                    </Col>
                </Row>
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
