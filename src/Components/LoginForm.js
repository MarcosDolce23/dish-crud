import React from "react";
import { useState } from "react";
import { Form, Row, Col, Button } from "react-bootstrap";
import 'bootstrap/dist/css/bootstrap.min.css';

const LoginForm = ({ initialValues, onSubmit }) => {
    const [formData, setFormData] = useState({ ...initialValues });
    const [validated, setValidated] = useState(false);

    const handleSubmit = (event) => {
        event.preventDefault();
        const form = event.currentTarget;
        if (form.checkValidity() === false) {
            event.preventDefault();
            event.stopPropagation();
            setValidated(true);
        } else {
            onSubmit(formData);
        }
    };

    return (
        <Form noValidate validated={validated} onSubmit={handleSubmit}>
            <Row className="mb-3">
                <Form.Group as={Col} md={{ span: 3, offset: 4 }} controlId="validationCustom01">
                    <Form.Label>User</Form.Label>
                    <Form.Control
                        required
                        type="text"
                        placeholder="User"
                        value={formData.user}
                        onChange={e => setFormData({ ...formData, user: e.target.value })}
                    />
                </Form.Group>
            </Row>
            <Row className="mb-3">
                <Form.Group as={Col} md={{ span: 3, offset: 4 }} controlId="validationCustom02">
                    <Form.Label>Password</Form.Label>
                    <Form.Control
                        required
                        type="password"
                        placeholder="Password"
                        value={formData.password}
                        onChange={e => setFormData({ ...formData, password: e.target.value })}
                    />
                </Form.Group>
            </Row>
            <Row>
                <Col md={{ span: 3, offset: 4 }}>
                    <div className="d-grid gap-2">
                        <Button type="submit">Sign in</Button>
                    </div>
                </Col>
            </Row>
        </Form>
    );
};

export default LoginForm;