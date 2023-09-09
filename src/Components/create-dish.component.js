// CreateDish Component for add new dish

// Import Modules
import React, { useState } from "react";
import Axios from 'axios';
import DishForm from "./DishForm";

// CreateDish Component
const CreateDish = () => {
    const [formValues, setFormValues] =
        useState({ esName: '', enName: '', esLabel: '', enLabel: '', cookTime: '', vegan: false, esIngredients: [], enIngredients: [], esRecipes: '', enRecipes: '' })


    // onSubmit handler    
    const addDish = (formData) => {
        debugger
        Axios.post(
            'http://localhost:4000/dishs/create-dish', formData )
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
            onSubmit={addDish}
            enableReinitialize>
            Create dish
        </DishForm>
    )
}

// Export CreateDish Component
export default CreateDish