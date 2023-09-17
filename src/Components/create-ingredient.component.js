// CreateIngredient Component for add new ingredient
import Axios from 'axios';
import IngredientForm from './IngredientForm';

const CreateIngredient = () => {
    const formData = {
        esName: '',
        enName: ''
    };

    // onSubmit handler    
    const addIngredient = (formData) => {
        Axios.post(
            'http://localhost:4000/ingredients', formData )
            .then(res => {
                if (res.status === 200)
                    alert('Ingredient successfully created')
                else
                    Promise.reject()
            })
            .catch(err => console.log('Error: ' + err))
    }

    // Return ingredient form
    return (
        <IngredientForm initialValues={formData}
            onSubmit={addIngredient}
        >
            Create ingredient 
        </IngredientForm>
    )
}

// Export CreateDish Component
export default CreateIngredient;