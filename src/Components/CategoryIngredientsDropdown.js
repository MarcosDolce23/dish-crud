import { Form, Row, Col, CloseButton } from "react-bootstrap";

const CategoryIngredientsDropdown = ({ ingredients, ingredient, updateIngredient, removeIngredient }) => {

    const handleIngredientSelect = (e) => {
        const ingId = e.target.value;
        const selected = ingredients.filter(e => e._id === ingId);
        updateIngredient({ ...ingredient, _id: ingId, esName: selected[0].esName, enName: selected[0].enName });
    };

    const ingredientList = ingredients.map(ingredient => {
        return (
            <option key={ingredient._id} value={ingredient._id}>{ingredient.esName} | {ingredient.enName}</option>
        )
    });

    return (
        <Row className="mb-3">
            <Form.Group as={Col} xs="4" md="3">
                <Form.Select required value={ingredient._id} onChange={(e) => handleIngredientSelect(e)}>
                    <option value="">Select an ingredient</option>
                    {ingredientList}
                </Form.Select>
            </Form.Group>
            <Form.Group as={Col} xs="4" md="3">
                <CloseButton onClick={() => removeIngredient(ingredient)} />
            </Form.Group>
        </Row>
    );
}

export default CategoryIngredientsDropdown;