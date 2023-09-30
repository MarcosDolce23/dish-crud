import React, { useState, useEffect } from "react";
import Axios from "axios";
import { Table, Row, Col, Spinner, Button } from "react-bootstrap";
import CategoryTableRow from "./CategoryTableRow";
import SearchBar from "./Common/SearchBar";
import Utilities from "./Common/Utilities";
import env from "react-dotenv";

function DataTable({ categories, filterText }) {
    const rows = [];

    categories.forEach((res, i) => {
        if (
            res.esName.toLowerCase().indexOf(filterText.toLowerCase()) === -1 && res.enName.toLowerCase().indexOf(filterText.toLowerCase()) === -1
        ) {
            return;
        }
        rows.push(<CategoryTableRow obj={res} key={i} />)
    });

    return rows;
}

const CategoryList = () => {
    const [error, setError] = useState(null);
    const [isLoaded, setIsLoaded] = useState(false);
    const [categories, setCategories] = useState([]);
    const [filterText, setFilterText] = useState('');

    useEffect(() => {
        Axios({
            url: env.API_URL + "/categories/",
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
                        <h1>Categories List</h1>
                    </Col>
                    <Col md="1">
                        <div className="d-grid gap-2">
                            <Button variant="secondary" size="sm" onClick={() => Utilities.downloadJson(categories, "categories.json")}>Export</Button >
                        </div>
                    </Col>
                </Row>
                <SearchBar filterText={filterText} onFilterTextChange={setFilterText} />
                <Table responsive striped bordered hover>
                    <thead>
                        <tr>
                            <th>ES Name</th>
                            <th>EN Name</th>
                            <th>Action</th>
                        </tr>
                    </thead>
                    <tbody>
                        <DataTable
                            filterText={filterText}
                            categories={categories}
                        />
                    </tbody>
                </Table>
            </>
        );
    }

};

export default CategoryList;
