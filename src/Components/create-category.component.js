// CreateCategory Component for add new category
import Axios from 'axios';
import CategoryForm from './CategoryForm';
import CommonModal from './Common/CommonModal';
import { useState } from 'react';

const CreateCategory = () => {
    const [modalShow, setModalShow] = useState(false);
    const [title, setTitle] = useState('');
    const [subTitle, setSubTitle] = useState('');
    const [text, setText] = useState('');

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
                if (res.status === 200) {
                    setTitle('Successful!');
                    setSubTitle('Category successfully created');
                    setText('The category ' + res.data.esName + ' | ' + res.data.enName + ' was succesfully created');
                    setModalShow(true);
                } else
                    Promise.reject()
            })
            .catch(err => {
                setTitle('Error!');
                setSubTitle('Category not created');
                setText('The category was not created: ' + err);
                setModalShow(true);
            })
    }

    return (
        <>
            <CategoryForm initialValues={formData}
                onSubmit={addCategory}
            >
                Create category
            </CategoryForm>
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

export default CreateCategory;