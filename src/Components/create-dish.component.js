// CreateDish Component for add new dish
import Axios from 'axios';
import DishForm from "./DishForm";

// CreateDish Component
const CreateDish = () => {
    const formData = {
        esName: '',
        enName: '',
        esLabel: '',
        enLabel: '',
        cookTime: '',
        vegan: false,
        ingredients: [],
        esRecipe: [],
        enRecipe: [],
        image: '',
        base64Image: '',
        headerImage: '',
        base64Header: ''
    };

    // onSubmit handler    
    const addDish = (formData) => {
        let payload =  JSON.parse(JSON.stringify(formData));
        payload.ingredients.map(ingredient => {
            return delete ingredient.listId;
        });

        Axios.post(
            'http://localhost:4000/dishes', payload )
            .then(res => {
                if (res.status === 200)
                    alert('dish successfully created')
                else
                    Promise.reject()
            })
            .catch(err => console.log('Error: ' + err))
    }

    // Return dish form
    return (
        <DishForm initialValues={formData}
            onSubmit={addDish}
            >
            Create dish
        </DishForm>
    )
}

// Export CreateDish Component
export default CreateDish