// EditDish Component for update dish data
import React, { useState, useEffect } from "react";
import Axios from "axios";
import DishForm from "./DishForm";
import { useParams } from "react-router";
import CommonModal from './Common/CommonModal';
import env from "react-dotenv";

const EditDish = () => {
    const [modalShow, setModalShow] = useState(false);
    const [title, setTitle] = useState('');
    const [subTitle, setSubTitle] = useState('');
    const [text, setText] = useState('');

    const [formData, setFormData] = useState({
        esName: '',
        enName: '',
        esLabel: '',
        enLabel: '',
        cookTime: '',
        vegan: false,
        ingredients: [],
        esQuantities: [],
        enQuantities: [],
        esRecipe: [],
        enRecipe: [],
        image: '',
        base64Image: '',
        headerImage: '',
        base64Header: ''
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
                env.API_URL + "/dishes/" +
                id,
                payload
            )
            .then(res => {
                if (res.status === 200) {
                    setTitle('Successful!');
                    setSubTitle('Dish successfully edited');
                    setText('The dish ' + res.data.esName + ' | ' + res.data.enName + ' was succesfully edited');
                    setModalShow(true);
                } else
                    Promise.reject()
            })
            .catch(err => {
                setTitle('Error!');
                setSubTitle('Dish not edited');
                setText('The dish was not edited: ' + err);
                setModalShow(true);
            })
    };

    useEffect(() => {
        Axios
            .get(
                env.API_URL + "/dishes/"
                + id
            )
            .then((res) => {
                const {
                    esName,
                    enName,
                    esLabel,
                    enLabel,
                    cookTime,
                    vegan,
                    ingredients,
                    esQuantities,
                    enQuantities,
                    esRecipe,
                    enRecipe,
                    image,
                    base64Image,
                    headerImage,
                    base64Header
                } = res.data;
                setFormData({
                    esName,
                    enName,
                    esLabel,
                    enLabel,
                    cookTime,
                    vegan,
                    ingredients,
                    esQuantities,
                    enQuantities,
                    esRecipe,
                    enRecipe,
                    image,
                    base64Image,
                    headerImage,
                    base64Header
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
            <DishForm
                initialValues={formData}
                onSubmit={onSubmit}
            >
                Update Dish
            </DishForm>
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

export default EditDish;