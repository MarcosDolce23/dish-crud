import React from "react";
import Axios from "axios";
import { useState, useEffect } from "react";
import { Form, Row, Col, Button, Spinner } from "react-bootstrap";
import IngredientsDropdown from "./IngredientsDropdown";
import Utilities from "./Common/Utilities";
import env from "react-dotenv";
import 'bootstrap/dist/css/bootstrap.min.css';

const DishForm = ({ initialValues, onSubmit }) => {
    const [formData, setFormData] = useState({ ...initialValues });
    const [validated, setValidated] = useState(false);
    const [categories, setCategories] = useState([]);
    const [error, setError] = useState(null);
    const [isLoaded, setIsLoaded] = useState(false);

    useEffect(() => {
        initialValues.ingredients.map(ingredient => {
            return ingredient.listId = Utilities.getRandomInt();
        });

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
        const name = Utilities.getRandomInt() + '-image.' + file.name.substr(-3);
        setFormData({ ...formData, image: name, base64Image: base64 });
    };

    const handleHeaderImage = async (e) => {
        const file = e.target.files[0];
        const base64 = await Utilities.convertBase64(file);
        const name = Utilities.getRandomInt() + '-header.' + file.name.substr(-3);
        setFormData({ ...formData, headerImage: name, base64Header: base64 });
    };

    const renderIngredients = formData.ingredients.map(ingredient => <IngredientsDropdown
        key={ingredient.listId}
        categories={categories}
        ingredient={ingredient}
        updateIngredient={updateIngredient}
        removeIngredient={removeIngredient}
    />);

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
            <Form noValidate validated={validated} onSubmit={handleSubmit}>
                <h1>Create Dish</h1>
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
                    </Form.Group>
                </Row>
                <Row className="mb-3">
                    <Form.Group as={Col} md="3" controlId="validationCustom03">
                        <Form.Label>ES Label</Form.Label>
                        <Form.Control
                            required
                            type="text"
                            placeholder="ES Label"
                            value={formData.esLabel}
                            onChange={e => setFormData({ ...formData, esLabel: e.target.value })}
                        />
                    </Form.Group>
                    <Form.Group as={Col} md="3" controlId="validationCustom04">
                        <Form.Label>EN Label</Form.Label>
                        <Form.Control
                            required
                            type="text"
                            placeholder="EN Label"
                            value={formData.enLabel}
                            onChange={e => setFormData({ ...formData, enLabel: e.target.value })}
                        />
                    </Form.Group>
                </Row>
                <Row className="mb-3">
                    <Form.Group as={Col} md="3" controlId="validationCustom05">
                        <Form.Label>Cook time</Form.Label>
                        <Form.Control
                            required
                            type="number"
                            placeholder="Cook time"
                            value={formData.cookTime}
                            onChange={e => setFormData({ ...formData, cookTime: e.target.value })}
                        />
                    </Form.Group>
                </Row>
                <Row className="mb-3">
                    <Form.Group as={Col} md="3" controlId="validationCustom06">
                        <Form.Check
                            label="Vegan"
                            checked={formData.vegan}
                            onChange={e => setFormData({ ...formData, vegan: e.target.checked })}
                        />
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
                <Row className="mb-3">
                    <Form.Group as={Col} md="8" controlId="validationCustom07">
                        <Form.Label>ES Quantities</Form.Label>
                        <Form.Control
                            required
                            as="textarea"
                            placeholder="ES Quantities"
                            value={formData.esQuantities.join('\n')}
                            onChange={e => setFormData({ ...formData, esQuantities: e.target.value.split(/\r\n|\r|\n/g) })}
                        />
                    </Form.Group>
                </Row>
                <Row className="mb-3">
                    <Form.Group as={Col} md="8" controlId="validationCustom08">
                        <Form.Label>EN Quantites</Form.Label>
                        <Form.Control
                            required
                            as="textarea"
                            placeholder="EN Quantities"
                            value={formData.enQuantities.join('\n')}
                            onChange={e => setFormData({ ...formData, enQuantities: e.target.value.split(/\r\n|\r|\n/g) })}
                        />
                    </Form.Group>
                </Row>
                <Row className="mb-3">
                    <Form.Group as={Col} md="8" controlId="validationCustom09">
                        <Form.Label>ES Recipe</Form.Label>
                        <Form.Control
                            required
                            as="textarea"
                            placeholder="ES Recipe"
                            value={formData.esRecipe.join('\n')}
                            onChange={e => setFormData({ ...formData, esRecipe: e.target.value.split(/\r\n|\r|\n/g) })}
                        />
                    </Form.Group>
                </Row>
                <Row className="mb-3">
                    <Form.Group as={Col} md="8" controlId="validationCustom10">
                        <Form.Label>EN Recipe</Form.Label>
                        <Form.Control
                            required
                            as="textarea"
                            placeholder="EN Recipe"
                            value={formData.enRecipe.join('\n')}
                            onChange={e => setFormData({ ...formData, enRecipe: e.target.value.split(/\r\n|\r|\n/g) })}
                        />
                    </Form.Group>
                </Row>
                <Row className="mb-3">
                    <Form.Label>Image</Form.Label>
                    <Form.Group as={Col} md="4" controlId="validationCustom11">
                        <Form.Control
                            type="file"
                            onChange={e => handleImage(e)}
                        />
                    </Form.Group>
                    {formData.image ? (
                        <>
                            <Col md="2">
                                <div className="d-grid gap-2">
                                    <Button
                                        variant="success"
                                        onClick={() => Utilities.openImage(formData.base64Image)}
                                    >See Image</Button>
                                </div>
                            </Col>
                            <Col md="2">
                                <div className="d-grid gap-2">
                                    <Button
                                        variant="success"
                                        onClick={() => Utilities.downloadImage(formData.base64Image, formData.image)}
                                    >Download</Button>
                                </div>
                            </Col>
                        </>
                    ) : (
                        null
                    )}
                </Row>
                <Form.Label>Header image</Form.Label>
                <Row className="mb-3">
                    <Form.Group as={Col} md="4" controlId="validationCustom12">
                        <Form.Control
                            type="file"
                            onChange={e => handleHeaderImage(e)}
                        />
                    </Form.Group>
                    {formData.headerImage ? (
                        <>
                            <Col md="2">
                                <div className="d-grid gap-2">
                                    <Button
                                        variant="success"
                                        onClick={() => Utilities.openImage(formData.base64Header)}
                                    >See Image</Button>
                                </div>
                            </Col>
                            <Col md="2">
                                <div className="d-grid gap-2">
                                    <Button
                                        variant="success"
                                        onClick={() => Utilities.downloadImage(formData.base64Header, formData.headerImage)}
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
    }
};

export default DishForm;