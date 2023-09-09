import React from "react";
import { useState } from "react";
import * as Yup from "yup";
import { Form, Row, Col, InputGroup, Button } from "react-bootstrap";

const DishForm = (props) => {
    const [validated, setValidated] = useState(false);

    const handleSubmit = (event) => {
        const form = event.currentTarget;
        if (form.checkValidity() === false) {
            event.preventDefault();
            event.stopPropagation();
        }

        setValidated(true);
    };

    const Ingredients = Array(24).fill(null).map( e => {
        return (
            <Form.Group as={Col} xs="4" md="1" controlId="validationCustomIngre">
                <Form.Check
                    label="Vegan"
                />
            </Form.Group>
        )
    });

    return (
        <Form noValidate validated={validated} onSubmit={handleSubmit}>
            <Row className="mb-3">
                <Form.Group as={Col} md="3" controlId="validationCustom01">
                    <Form.Label>ES Name</Form.Label>
                    <Form.Control
                        required
                        type="text"
                        placeholder="ES Name"
                    />
                    <Form.Control.Feedback>Looks good!</Form.Control.Feedback>
                </Form.Group>
                <Form.Group as={Col} md="3" controlId="validationCustom02">
                    <Form.Label>EN Name</Form.Label>
                    <Form.Control
                        required
                        type="text"
                        placeholder="EN Name"
                    />
                    <Form.Control.Feedback>Looks good!</Form.Control.Feedback>
                </Form.Group>
            </Row>
            <Row className="mb-3">
                <Form.Group as={Col} md="3" controlId="validationCustom03">
                    <Form.Label>ES Label</Form.Label>
                    <Form.Control
                        required
                        type="text"
                        placeholder="ES Label"
                    />
                    <Form.Control.Feedback>Looks good!</Form.Control.Feedback>
                </Form.Group>
                <Form.Group as={Col} md="3" controlId="validationCustom04">
                    <Form.Label>EN Label</Form.Label>
                    <Form.Control
                        required
                        type="text"
                        placeholder="EN Label"
                    />
                    <Form.Control.Feedback>Looks good!</Form.Control.Feedback>
                </Form.Group>
            </Row>
            <Row className="mb-3">
                <Form.Group as={Col} md="3" controlId="validationCustom05">
                    <Form.Label>Cook time</Form.Label>
                    <Form.Control
                        required
                        type="number"
                        placeholder="Cook time"
                    />
                    <Form.Control.Feedback>Looks good!</Form.Control.Feedback>
                </Form.Group>
            </Row>
            <Row className="mb-3">
                <Form.Group as={Col} md="3" controlId="validationCustom06">
                    <Form.Check
                        label="Vegan"
                    />
                </Form.Group>
            </Row>
            <Row className="mb-3">
                <Form.Label>Ingredients</Form.Label>
                {Ingredients}
            </Row>
            <Row className="mb-3">
                <Form.Group as={Col} md="8" controlId="validationCustom07">
                    <Form.Label>ES Recipe</Form.Label>
                    <Form.Control
                        required
                        as="textarea"
                        placeholder="ES Recipe"
                    />
                    <Form.Control.Feedback>Looks good!</Form.Control.Feedback>
                </Form.Group>
            </Row>
            <Row className="mb-3">
                <Form.Group as={Col} md="8" controlId="validationCustom08">
                    <Form.Label>EN Recipe</Form.Label>
                    <Form.Control
                        required
                        as="textarea"
                        placeholder="EN Recipe"
                    />
                    <Form.Control.Feedback>Looks good!</Form.Control.Feedback>
                </Form.Group>
            </Row>
            <Row className="mb-3">
                <Form.Group as={Col} md="8" controlId="validationCustom09">
                    <Form.Label>Image</Form.Label>
                    <Form.Control
                        required
                        type="file"
                    />
                    <Form.Control.Feedback>Looks good!</Form.Control.Feedback>
                </Form.Group>
            </Row>
            <Row className="mb-3">
                <Form.Group as={Col} md="8" controlId="validationCustom10">
                    <Form.Label>Header image</Form.Label>
                    <Form.Control
                        required
                        type="file"
                    />
                    <Form.Control.Feedback>Looks good!</Form.Control.Feedback>
                </Form.Group>
            </Row>
            <Button xs="12" type="submit">Submit form</Button>
        </Form>
    );
};

export default DishForm;