// EditIngredient Component for update ingredient data
import React, { useState, useEffect } from "react";
import Axios from "axios";
import IngredientForm from "./IngredientForm";
import { useParams } from "react-router";

// EditDish Component
const EditIngredient = () => {
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
            .then((res) => {
                if (res.status === 200) {
                    alert("Ingredient successfully updated");
                } else Promise.reject();
            })
            .catch((err) => alert("Something went wrong"));
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
            .catch((err) => console.log(err));
    }, [id]);

    // Return ingredient form
    return (
        <IngredientForm
            initialValues={formData}
            onSubmit={onSubmit}
        >
            Update Ingredient 
        </IngredientForm>
    );
};

export default EditIngredient;