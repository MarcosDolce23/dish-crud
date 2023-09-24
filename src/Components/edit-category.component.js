// EditDish Component for update dish data
import React, { useState, useEffect } from "react";
import Axios from "axios";
import CategoryForm from "./CategoryForm";
import { useParams } from "react-router";
import CommonModal from './Common/CommonModal';
import env from "react-dotenv";

const EditCategory = () => {
    const [modalShow, setModalShow] = useState(false);
    const [title, setTitle] = useState('');
    const [subTitle, setSubTitle] = useState('');
    const [text, setText] = useState('');

    const [formData, setFormData] = useState({
        esName: '',
        enName: '',
        ingredients: [],
        image: '',
        base64Image: ''
    });

    const { id } = useParams();

    //onSubmit handler
    const onSubmit = (formData) => {
        let payload = JSON.parse(JSON.stringify(formData));
        payload.ingredients.map(ingredient => {
            return delete ingredient.listId;
        });

        Axios
            .put(
                env.API_URL + "/categories/" +
                id,
                payload
            )
            .then(res => {
                if (res.status === 200) {
                    setTitle('Successful!');
                    setSubTitle('Category successfully edited');
                    setText('The category ' + res.data.esName + ' | ' + res.data.enName + ' was succesfully edited');
                    setModalShow(true);
                } else
                    Promise.reject()
            })
            .catch(err => {
                setTitle('Error!');
                setSubTitle('Category not edited');
                setText('The category was not edited: ' + err);
                setModalShow(true);
            })
    };

    useEffect(() => {
        Axios
            .get(
                env.API_URL + "/categories/"
                + id
            )
            .then((res) => {
                const {
                    esName,
                    enName,
                    ingredients,
                    image,
                    base64Image,
                } = res.data;
                setFormData({
                    esName,
                    enName,
                    ingredients,
                    image,
                    base64Image,
                });
            })
            .catch(err => {
                setTitle('Error!');
                setSubTitle('There has bee an error');
                setText('Error: ' + err);
                setModalShow(true);
            })
    }, [id]);

    return (
        <>
            <CategoryForm
                initialValues={formData}
                onSubmit={onSubmit}
            >
                Update Category
            </CategoryForm>
            <CommonModal
                show={modalShow}
                onHide={() => setModalShow(false)}
                title={title}
                subTitle={subTitle}
                text={text}
            />
        </>
    );
};

export default EditCategory;