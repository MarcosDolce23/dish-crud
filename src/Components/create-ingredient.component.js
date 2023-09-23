// CreateIngredient Component for add new ingredient
import Axios from 'axios';
import IngredientForm from './IngredientForm';
import CommonModal from './Common/CommonModal';
import { useState } from 'react';

const CreateIngredient = () => {
    const [modalShow, setModalShow] = useState(false);
    const [title, setTitle] = useState('');
    const [subTitle, setSubTitle] = useState('');
    const [text, setText] = useState('');

    const formData = {
        esName: '',
        enName: ''
    };

    // onSubmit handler    
    const addIngredient = (formData) => {
        Axios.post(
            'http://localhost:4000/ingredients', formData)
            .then(res => {
                if (res.status === 200) {
                    setTitle('Successful!');
                    setSubTitle('Ingredient successfully created');
                    setText('The ingredient ' + res.data.esName + ' | ' + res.data.enName + ' was succesfully created');
                    setModalShow(true);
                } else
                    Promise.reject()
            })
            .catch(err => {
                setTitle('Error!');
                setSubTitle('Ingredient not created');
                setText('The ingredient was not created: ' + err);
                setModalShow(true);
            })
    }

    // Return ingredient form
    return (
        <>
            <IngredientForm initialValues={formData}
                onSubmit={addIngredient}
            >
                Create ingredient
            </IngredientForm>
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

// Export CreateDish Component
export default CreateIngredient;