import React, { useState, useEffect } from "react";
import Axios from "axios";
import { Table, Spinner } from "react-bootstrap";
import DishTableRow from "./DishTableRow";

const DishList = () => {
    const [error, setError] = useState(null);
    const [isLoaded, setIsLoaded] = useState(false);
    const [dishes, setDishes] = useState([]);

    useEffect(() => {
        Axios({
            url: env.API_URL + "/dishes/",
        })
            .then((response) => {
                setIsLoaded(true);
                setDishes(response.data);
            })
            .catch((error) => {
                console.log(error);
                setIsLoaded(true);
                setError(error);
            });
    }, []);

    const DataTable = () => {
        return dishes.map((res, i) => {
            return <DishTableRow obj={res} key={i} />;
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
                <h1>Dishes List</h1>
                <Table responsive striped bordered hover>
                    <thead>
                        <tr>
                            <th>ES Name</th>
                            <th>EN Name</th>
                            <th>ES Label</th>
                            <th>EN Label</th>
                            <th>Cook time</th>
                            <th>Vegan</th>
                            <th>Action</th>
                        </tr>
                    </thead>
                    <tbody>{DataTable()}</tbody>
                </Table>
            </>
        );
    }

};

export default DishList;
