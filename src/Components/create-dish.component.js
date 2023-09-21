// CreateDish Component for add new dish
import Axios from 'axios';
import DishForm from "./DishForm";
import CommonModal from './Common/CommonModal';
import { useState } from 'react';

const CreateDish = () => {
    const [modalShow, setModalShow] = useState(false);
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
        let payload = JSON.parse(JSON.stringify(formData));
        payload.ingredients.map(ingredient => {
            return delete ingredient.listId;
        });

        Axios.post(
            'http://localhost:4000/dishes', payload)
            .then(res => {
                if (res.status === 200)
                    setModalShow(true);
                else
                    Promise.reject()
            })
            .catch(err => console.log('Error: ' + err))
    }

    return (
        <>
            <DishForm initialValues={formData}
                onSubmit={addDish}
            >
                Create dish
            </DishForm>
            <CommonModal
                show={modalShow}
                onHide={() => setModalShow(false)}
                title="Dish created"
                subTitle="Dish successfully created"
                text="The dish was successfully created"
            />

        </>
    )
}

export default CreateDish;