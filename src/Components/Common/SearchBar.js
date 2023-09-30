import { Col, Row } from "react-bootstrap";

function SearchBar({ filterText, onFilterTextChange }) {
    return (
        <Row>
            <Col md="3">
                <input
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