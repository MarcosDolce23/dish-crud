import React from "react";
import { useState, useEffect } from "react";
import { Form, Row, Col, Button } from "react-bootstrap";
import { saveAs } from "file-saver";
import IngredientsDropdown from "./IngredientsDropdown";
import Utilities from "./Common/Utilities";
import 'bootstrap/dist/css/bootstrap.min.css';

const CategoryForm = ({ initialValues, onSubmit }) => {
    const [formData, setFormData] = useState({ ...initialValues });
    const [validated, setValidated] = useState(false);

    useEffect(() => {
        initialValues.ingredients.map(ingredient => {
            return ingredient.listId = Utilities.getRandomInt();
        });

        setFormData(initialValues);
    }, [initialValues])

    const handleSubmit = (event) => {
        const form = event.currentTarget;
        if (form.checkValidity() === false) {
            event.preventDefault();
            event.stopPropagation();
        }

        setValidated(true);
        onSubmit(formData);
    };

    const updateIngredient = (ingredientObj) => {
        const updatedIngredients = formData.ingredients.map((ingredient) => {
            if (ingredient.listId === ingredientObj.listId) {
                return ingredientObj
            }
            return ingredient
        })
        setFormData({ ...formData, ingredients: updatedIngredients })
    };

    const removeIngredient = (ingredientObj) => {
        const updatedIngredients = formData.ingredients.filter((ingredient) => ingredient.listId !== ingredientObj.listId)
        setFormData({ ...formData, ingredients: updatedIngredients })
    };

    const addIngredient = () => {
        setFormData({
            ...formData, ingredients: [
                ...formData.ingredients, {
                    listId: Utilities.getRandomInt(),
                    id: undefined,
                    categoryId: undefined,
                    esName: '',
                    enName: ''
                }
            ]
        })
    };

    const handleImage = async (e) => {
        const file = e.target.files[0];
        if (!file) return;
        const base64 = await Utilities.convertBase64(file);
        const name = Utilities.getRandomInt() + '-image' + file.name.substr(-3);
        setFormData({ ...formData, image: name, base64Image: base64 });
    };

    const openImage = (src) => {
        let image = new Image();
        image.src = src;

        let w = window.open("");
        w.document.write(image.outerHTML);
    };

    const downloadImage = (src, name) => {
        let file = Utilities.convertBase64ToFile(src, name);
        saveAs(file, name);
    }
    const renderIngredients = formData.ingredients.map(ingredient => <IngredientsDropdown
        key={ingredient.listId}
        ingredients={ingredients}
        categories={categories}
        ingredient={ingredient}
        updateIngredient={updateIngredient}
        removeIngredient={removeIngredient}
    />);

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
            <Row className="mb-3">
                <Form.Label>Ingredients</Form.Label>
            </Row>
            {renderIngredients}
            <Row className="mb-3">
                <Col xs="12">
                    <Button variant="success" onClick={addIngredient}>Add Ingredient</Button>
                </Col>
            </Row>
            <Form.Label>Image</Form.Label>
            <Row className="mb-3">
                <Form.Group as={Col} md="4" controlId="validationCustom09">
                    <Form.Control
                        type="file"
                        onChange={e => handleImage(e)}
                    />
                    <Form.Control.Feedback>Looks good!</Form.Control.Feedback>
                </Form.Group>
                {formData.image ? (
                    <>
                        <Col md="2">
                            <div className="d-grid gap-2">
                                <Button
                                    variant="success"
                                    onClick={() => openImage(formData.base64Image)}
                                >See Image</Button>
                            </div>
                        </Col>
                        <Col md="2">
                            <div className="d-grid gap-2">
                                <Button
                                    variant="success"
                                    onClick={() => downloadImage(formData.base64Header, formData.headerImage)}
                                >Download</Button>
                            </div>
                        </Col>
                    </>
                ) : (
                    null
                )}
            </Row>
            <Button xs="12" type="submit">Submit form</Button>
        </Form>
    );
};

export default CategoryForm;