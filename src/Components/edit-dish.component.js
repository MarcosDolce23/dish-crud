// EditDish Component for update dish data
import React, { useState, useEffect } from "react";
import Axios from "axios";
import DishForm from "./DishForm";
import { useParams } from "react-router";

const EditDish = () => {
    const [formData, setFormData] = useState({
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
    });

    const { id } = useParams();

    //onSubmit handler
    const onSubmit = (formData) => {
        let payload =  JSON.parse(JSON.stringify(formData));
        payload.ingredients.map(ingredient => {
            return delete ingredient.listId;
        });

        Axios
            .put(
                "http://localhost:4000/dishes/" +
                id,
                payload
            )
            .then((res) => {
                if (res.status === 200) {
                    alert("Dish successfully updated");
                } else Promise.reject();
            })
            .catch((err) => alert("Something went wrong"));
    };

    useEffect(() => {
        Axios
            .get(
                "http://localhost:4000/dishes/"
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
                    esRecipe,
                    enRecipe,
                    image,
                    base64Image,
                    headerImage,
                    base64Header
                });
            })
            .catch((err) => console.log(err));
    }, [id]);

    return (
        <DishForm
            initialValues={formData}
            onSubmit={onSubmit}
        >
            Update Dish 
        </DishForm>
    );
};

export default EditDish;