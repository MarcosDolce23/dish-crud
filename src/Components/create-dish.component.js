// CreateDish Component for add new dish

// Import Modules
import React, { useState, useEffect } from "react";
import axios from 'axios';
import DishForm from "./DishForm";

// CreateDish Component
const CreateDish = () => {
    const [formValues, setFormValues] =
        useState({ name: '', email: '', rollno: '' })
    // onSubmit handler
    const onSubmit = dishObject => {
        axios.post(
            'http://localhost:4000/dishs/create-dish',
            dishObject)
            .then(res => {
                if (res.status === 200)
                    alert('dish successfully created')
                else
                    Promise.reject()
            })
            .catch(err => alert('Something went wrong'))
    }

    // Return dish form
    return (
        <DishForm initialValues={formValues}
            onSubmit={onSubmit}
            enableReinitialize>
            Create dish
        </DishForm>
    )
}

// Export CreateDish Component
export default CreateDish