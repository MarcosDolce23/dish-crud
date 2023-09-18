// EditDish Component for update dish data
import React, { useState, useEffect } from "react";
import Axios from "axios";
import CategoryForm from "./CategoryForm";
import { useParams } from "react-router";

const EditCategory = () => {
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
                "http://localhost:4000/categories/" +
                id,
                payload
            )
            .then((res) => {
                if (res.status === 200) {
                    alert("Categories successfully updated");
                } else Promise.reject();
            })
            .catch((err) => alert("Something went wrong"));
    };

    useEffect(() => {
        Axios
            .get(
                "http://localhost:4000/categories/"
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
            .catch((err) => console.log(err));
    }, [id]);

    return (
        <CategoryForm
            initialValues={formData}
            onSubmit={onSubmit}
        >
            Update Category 
        </CategoryForm>
    );
};

export default EditCategory;