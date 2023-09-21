// EditIngredient Component for update ingredient data
import React, { useState, useEffect } from "react";
import Axios from "axios";
import IngredientForm from "./IngredientForm";
import { useParams } from "react-router";
import CommonModal from './Common/CommonModal';
import { useState } from 'react';

// EditDish Component
const EditIngredient = () => {
    const [modalShow, setModalShow] = useState(false);
    const [title, setTitle] = useState('');
    const [subTitle, setSubTitle] = useState('');
    const [text, setText] = useState('');

    const [formData, setFormData] = useState({
        esName: '',
        enName: ''
    });

    const { id } = useParams();

    //onSubmit handler
    const onSubmit = (formData) => {
        Axios
            .put(
                "http://localhost:4000/ingredients/" +
                id,
                formData
            )
            .then(res => {
                if (res.status === 200) {
                    setTitle('Successful!');
                    setSubTitle('Ingredient successfully edited');
                    setText('The ingredient ' + res.data.esName + ' | ' + res.data.enName + ' was succesfully edited');
                    setModalShow(true);
                } else
                    Promise.reject()
            })
            .catch(err => {
                setTitle('Error!');
                setSubTitle('Ingredient not edited');
                setText('The ingredient was not edited: ' + err);
                setModalShow(true);
            })
    };

    // Load data from server and reinitialize ingredient form
    useEffect(() => {
        Axios
            .get(
                "http://localhost:4000/ingredients/"
                + id
            )
            .then((res) => {
                const {
                    esName,
                    enName,
                } = res.data;
                setFormData({
                    esName,
                    enName,
                });
            })
            .catch(err => {
                setTitle('Error!');
                setSubTitle('There has bee an error');
                setText('Error: ' + err);
                setModalShow(true);
            });
    }, [id]);

    // Return ingredient form
    return (
        <>
            <IngredientForm
                initialValues={formData}
                onSubmit={onSubmit}
            >
                Update Ingredient
            </IngredientForm>
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

export default EditIngredient;