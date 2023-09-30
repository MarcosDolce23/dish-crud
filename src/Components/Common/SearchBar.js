import { Col, FormControl, Row } from "react-bootstrap";

function SearchBar({ filterText, onFilterTextChange }) {
    return (
        <Row className="mb-3">
            <Col md="3">
                <FormControl
                    type="text"
                    value={filterText}
                    placeholder="Filter by name"
                    onChange={(e) => onFilterTextChange(e.target.value)}
                />
            </Col>
        </Row>
    )
}

export default SearchBar;