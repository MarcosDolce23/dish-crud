// CreateCategory Component for add new category
import Axios from 'axios';
import CategoryForm from './CategoryForm';

const CreateCategory = () => {
    const formData = {
        esName: '',
        enName: '',
        ingredients: [],
        image: '',
        base64Image: '',
    };

    // onSubmit handler    
    const addCategory = (formData) => {
        let payload = JSON.parse(JSON.stringify(formData));
        payload.ingredients.map(ingredient => {
            return delete ingredient.listId;
        });

        Axios.post(
            'http://localhost:4000/categories', payload)
            .then(res => {
                if (res.status === 200)
                    alert('Category successfully created')
                else
                    Promise.reject()
            })
            .catch(err => console.log('Error: ' + err))
    }

    return (
        <CategoryForm initialValues={formData}
            onSubmit={addCategory}
        >
            Create category 
        </CategoryForm>
    )
}

export default CreateCategory;