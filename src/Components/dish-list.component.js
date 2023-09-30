import React, { useState, useEffect } from "react";
import Axios from "axios";
import { Table, Row, Col, Spinner, Button } from "react-bootstrap";
import DishTableRow from "./DishTableRow";
import Utilities from "./Common/Utilities";
import SearchBar from "./Common/SearchBar";
import env from "react-dotenv";

function DataTable({ dishes, filterText }) {
    const rows = [];

    dishes.forEach((res, i) => {
        if (
            res.esName.toLowerCase().indexOf(filterText.toLowerCase()) === -1 || res.enName.toLowerCase().indexOf(filterText.toLowerCase()) === -1
        ) {
            return;
        }
        rows.push(<DishTableRow obj={res} key={i} />)
    });

    return rows;
}

const DishList = () => {
    const [error, setError] = useState(null);
    const [isLoaded, setIsLoaded] = useState(false);
    const [dishes, setDishes] = useState([]);
    const [filterText, setFilterText] = useState('');

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
                <Row className="mb-3">
                    <Col md="11">
                        <h1>Dishes List</h1>
                    </Col>
                    <Col md="1">
                        <div className="d-grid gap-2">
                            <Button variant="secondary" size="sm" onClick={() => Utilities.downloadJson(dishes, "dishes.json")}>Export</Button >
                        </div>
                    </Col>
                </Row>
                <SearchBar
                    filterText={filterText}
                    onFilterTextChange={setFilterText} />
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
                    <tbody>
                        <DataTable
                            filterText={filterText}
                            dishes={dishes}
                        />
                    </tbody>
                </Table>
            </>
        );
    }

};

export default DishList;
