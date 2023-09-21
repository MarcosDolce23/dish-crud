// CreateDish Component for add new dish
import Axios from 'axios';
import DishForm from "./DishForm";
import CommonModal from './Common/CommonModal';
import { useState } from 'react';

const CreateDish = () => {
    const [modalShow, setModalShow] = useState(false);
    const [title, setTitle] = useState('');
    const [subTitle, setSubTitle] = useState('');
    const [text, setText] = useState('');

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
                if (res.status === 200) {
                    setTitle('Successful!');
                    setSubTitle('Dish successfully created');
                    setText('The dish ' + res.data.esName + ' | ' + res.data.enName + ' was succesfully created');
                    setModalShow(true);
                } else
                    Promise.reject()
            })
            .catch(err => {
                    setTitle('Error!');
                    setSubTitle('Dish not created');
                    setText('The dish was not created: ' + err);
                    setModalShow(true);
            })
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
                title={title}
                subTitle={subTitle}
                text={text}
            />

        </>
    )
}

export default CreateDish;