import React from "react";
import { useState, useEffect } from "react";
import { Form, Row, Col, Button } from "react-bootstrap";
import IngredientsDropdown from "./IngredientsDropdown";

const DishForm = ({ initialValues, onSubmit }) => {
    const [formData, setFormData] = useState({ ...initialValues });

    useEffect(() => {
        setFormData(initialValues);
    }, [initialValues])

    const categories = [
        {
            id: 0,
            esName: "Lacteos",
            enName: "Dairy"
        },
        {
            id: 1,
            esName: "Vegetales",
            enName: "Vegetables"
        }
    ];

    const ingredients = [
        {
            id: 0,
            categoryId: 0,
            esName: "Leche",
            enName: "Milk",
        },
        {
            id: 1,
            categoryId: 0,
            esName: "Manteca",
            enName: "Butter",
        },
        {
            id: 2,
            categoryId: 0,
            esName: "Crema",
            enName: "Cream",
        },
        {
            id: 3,
            categoryId: 0,
            esName: "Queso",
            enName: "Cheese",
        },
        {
            id: 4,
            categoryId: 1,
            esName: "Lechuga",
            enName: "Lettuce",
        },
        {
            id: 5,
            categoryId: 1,
            esName: "Cebolla",
            enName: "Onion",
        },
        {
            id: 6,
            categoryId: 1,
            esName: "Berenjena",
            enName: "Eggplant",
        }
    ];

    // const [ingredients, setIngredients] = useState([]);
    const [listId, setListId] = useState(1);
    const [validated, setValidated] = useState(false);

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
                    listId: listId,
                    id: undefined,
                    categoryId: undefined,
                    esName: '',
                    enName: ''
                }
            ]
        })
        setListId(listId + 1);
    };

    const handleImage = async (e) => {
        const file = e.target.files[0];
        const base64 = await convertBase64(file);
        setFormData({ ...formData, image: file.name, base64Image: base64 });
    };

    const handleHeaderImage = async (e) => {
        const file = e.target.files[0];
        const base64 = await convertBase64(file);
        setFormData({ ...formData, headerImage: file.name, base64Header: base64 });
    };

    const convertBase64 = (file) => {
        return new Promise((resolve, reject) => {
            const fileReader = new FileReader();
            fileReader.readAsDataURL(file)
            fileReader.onload = () => {
                resolve(fileReader.result);
            }
            fileReader.onerror = (error) => {
                reject(error);
            }
        })
    };

    const renderIngredients = formData.ingredients.map(ingredient => <IngredientsDropdown
        key={ingredient.listId}
        ingredients={ingredients}
        categories={categories}
        ingredient={ingredient}
        listId={listId - 1}
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
                <Form.Group as={Col} md="3" controlId="validationCustom03">
                    <Form.Label>ES Label</Form.Label>
                    <Form.Control
                        required
                        type="text"
                        placeholder="ES Label"
                        value={formData.esLabel}
                        onChange={e => setFormData({ ...formData, esLabel: e.target.value })}
                    />
                    <Form.Control.Feedback>Looks good!</Form.Control.Feedback>
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
                        value={formData.cookTime}
                        onChange={e => setFormData({ ...formData, cookTime: e.target.value })}
                    />
                    <Form.Control.Feedback>Looks good!</Form.Control.Feedback>
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
                    <Form.Label>ES Recipe</Form.Label>
                    <Form.Control
                        required
                        as="textarea"
                        placeholder="ES Recipe"
                        value={formData.esRecipe.join('\n')}
                        onChange={e => setFormData({ ...formData, esRecipe: e.target.value.split(/\r\n|\r|\n/g) })}
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
                        value={formData.enRecipe.join('\n')}
                        onChange={e => setFormData({ ...formData, enRecipe: e.target.value.split(/\r\n|\r|\n/g) })}
                    />
                    <Form.Control.Feedback>Looks good!</Form.Control.Feedback>
                </Form.Group>
            </Row>
            <Row className="mb-3">
                <Form.Group as={Col} md="8" controlId="validationCustom09">
                    <Form.Label>Image</Form.Label>
                    <Form.Control
                        type="file"
                        onChange={e => handleImage(e)}
                    />
                    <Form.Control.Feedback>Looks good!</Form.Control.Feedback>
                </Form.Group>
            </Row>
            <Row className="mb-3">
                <Form.Group as={Col} md="8" controlId="validationCustom10">
                    <Form.Label>Header image</Form.Label>
                    <Form.Control
                        type="file"
                        onChange={e => handleHeaderImage(e)}
                    />
                    <Form.Control.Feedback>Looks good!</Form.Control.Feedback>
                </Form.Group>
            </Row>
            <Button xs="12" type="submit">Submit form</Button>
        </Form>
    );
};

const ingredientsList = [
    {
        id: 1,
        name: "Lacteos",
        ingredients: ["Manteca", "Leche", "Crema", "Queso"]
    },
    {
        id: 3,
        name: "Vegetales",
        ingredients: ["Lechuga", "Cebolla", "Berenjena"]
    }
];

export default DishForm;