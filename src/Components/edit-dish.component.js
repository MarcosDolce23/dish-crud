// EditDish Component for update dish data

// Import Modules
import React, { useState, useEffect } from "react";
import Axios from "axios";
import DishForm from "./DishForm";
import { useParams } from "react-router";

// EditDish Component
const EditDish = (props) => {
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
    const onSubmit = (studentObject) => {
        debugger
        Axios
            .put(
                "http://localhost:4000/dishes/" +
                id,
                studentObject
            )
            .then((res) => {
                if (res.status === 200) {
                    alert("Student successfully updated");
                    // props.history.push("/dish-list");
                } else Promise.reject();
            })
            .catch((err) => alert("Something went wrong"));
    };

    // Load data from server and reinitialize dish form
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
    }, []);

    // Return dish form
    return (
        <DishForm
            initialValues={formData}
            onSubmit={onSubmit}
            enableReinitialize
        >
            Update Student
        </DishForm>
    );
};

// Export EditDish Component
export default EditDish;