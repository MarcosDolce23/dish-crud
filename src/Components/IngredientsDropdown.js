import { useState } from "react";
import { Form, Row, Col, CloseButton } from "react-bootstrap";

const IngredientsDropdown = ({ categories, ingredient, updateIngredient, removeIngredient }) => {
    const getCategory = (ingredient) => {
        return categories.filter(category => category.ingredients.some(i => ingredient._id === i._id))[0];
    };

    const [category, setCategory] = useState(getCategory(ingredient) ? getCategory(ingredient) : { _id: undefined });
    const [ingredients, setIngredients] = useState(category._id ? category.ingredients : []);

    const handleIngredientSelect = (e) => {
        const ingId = e.target.value;
        const selected = category.ingredients.filter(e => e._id === ingId);
        updateIngredient({ ...ingredient, _id: ingId, esName: selected[0].esName, enName: selected[0].enName });
    };

    const handleCategorySelect = (e) => {
        const catId = e.target.value;
        setIngredients(categories.filter(category => category._id === catId)[0].ingredients);
        setCategory(categories.filter(category => category._id === catId)[0]);
        updateIngredient({ ...ingredient });
    };

    const categoryList = categories.map(category => {
        return (
            <option key={category._id} value={category._id}>{category.esName} | {category.enName}</option>
        )
    });

    const ingredientList = ingredients.map(ingredient => {
        return (
            <option key={ingredient._id} value={ingredient._id}>{ingredient.esName} | {ingredient.enName}</option>
        )
    });

    return (
        <Row className="mb-3">
            <Form.Group as={Col} xs="4" md="3">
                <Form.Control as="select" value={category._id} onChange={(e) => handleCategorySelect(e)} required>
                    <option value="">Select a category</option>
                    {categoryList}
                </Form.Control>
            </Form.Group>
            <Form.Group as={Col} xs="4" md="3" controlId="validationCustomIngre">
                <Form.Control as="select" value={ingredient._id} onChange={(e) => handleIngredientSelect(e)} required>
                    <option value="">Select an ingredient</option>
                    {ingredientList}
                </Form.Control>
            </Form.Group>
            <Form.Group as={Col} xs="4" md="3">
                <CloseButton onClick={() => removeIngredient(ingredient)} />
            </Form.Group>
        </Row>
    );
}

export default IngredientsDropdown;