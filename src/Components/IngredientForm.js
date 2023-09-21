import React from "react";
import { useState, useEffect } from "react";
import { Form, Row, Col, Button } from "react-bootstrap";
import Utilities from "./Common/Utilities";
import 'bootstrap/dist/css/bootstrap.min.css';

const IngredientForm = ({ initialValues, onSubmit }) => {
    const [formData, setFormData] = useState({ ...initialValues });
    const [validated, setValidated] = useState(false);

    useEffect(() => {
        setFormData(initialValues);
    }, [initialValues])

    const handleSubmit = (event) => {
        event.preventDefault();
        const form = event.currentTarget;
        if (form.checkValidity() === false) {
            event.preventDefault();
            event.stopPropagation();
            setValidated(true);
        } else
            onSubmit(formData);
    };

    return (
        <Form noValidate validated={validated} onSubmit={handleSubmit}>
            <Row className="mb-3">
                <Form.Group as={Col} md="3" controlId="validationCustom01">
                    <Form.Label>ES Name</Form.Label>
                    <Form.Control
                        required
                        type="text"
                        placeholder="ES Name"
                        value={formData.esName}
                        onChange={e => setFormData({ ...formData, esName: e.target.value })}
                    />
                    <Form.Control.Feedback>Looks good!</Form.Control.Feedback>
                </Form.Group>
                <Form.Group as={Col} md="3" controlId="validationCustom02">
                    <Form.Label>EN Name</Form.Label>
                    <Form.Control
                        required
                        type="text"
                        placeholder="EN Name"
                        value={formData.enName}
                        onChange={e => setFormData({ ...formData, enName: e.target.value })}
                    />
                    <Form.Control.Feedback>Looks good!</Form.Control.Feedback>
                </Form.Group>
            </Row>
            <Button xs="12" type="submit">Submit form</Button>
        </Form>
    );
};

export default IngredientForm;