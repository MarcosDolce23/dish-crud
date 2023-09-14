import { useState } from "react";
import { Form, Row, Col, CloseButton } from "react-bootstrap";

const IngredientsDropdown = ({ ingredients, categories, ingredient, updateIngredient, removeIngredient }) => {
    const [filteredIngredients, setFilteredIngredients] = useState([]);

    const handleIngredientSelect = (e) => {
        const ingId = parseInt(e.target.value);
        const selected = ingredients.filter(e => e.id === ingId);
        updateIngredient({ ...ingredient, id: ingId, categoryId: selected[0].categoryId, esName: selected[0].esName, enName: selected[0].enName });
    };

    const handleCategorySelect = (e) => {
        const catId = parseInt(e.target.value);
        setFilteredIngredients(ingredients.filter(ingredient => ingredient.categoryId === catId));
        updateIngredient({ ...ingredient, categoryId: catId });
    };

    const categoryList = categories.map(category => {
        return (
            <option key={category.id} value={category.id}>{category.esName} | {category.enName}</option>
        )
    });

    const ingredientList = filteredIngredients.map(ingredient => {
        return (
            <option key={ingredient.id} value={ingredient.id}>{ingredient.esName} | {ingredient.enName}</option>
        )
    });

    return (
        <Row className="mb-3">
            <Form.Group as={Col} xs="4" md="3" controlId="validationCustomIngre">
                <Form.Select value={ingredient.categoryId} onChange={(e) => handleCategorySelect(e)}>
                    <option>Select a category</option>
                    {categoryList}
                </Form.Select>
            </Form.Group>
            <Form.Group as={Col} xs="4" md="3" controlId="validationCustomIngre">
                <Form.Select value={ingredient.id} onChange={(e) => handleIngredientSelect(e)}>
                    <option>Select an ingredient</option>
                    {ingredientList}
                </Form.Select>
            </Form.Group>
            <Form.Group as={Col} xs="4" md="3">
                <CloseButton onClick={() => removeIngredient(ingredient)} />
            </Form.Group>
        </Row>
    );
}

export default IngredientsDropdown;