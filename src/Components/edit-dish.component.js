// EditDish Component for update dish data
  
// Import Modules
import React, { useState, useEffect } from "react";
import axios from "axios";
import DishForm from "./DishForm";
  
// EditDish Component
const EditDish = (props) => {
  const [formValues, setFormValues] = useState({
    name: "",
    email: "",
    rollno: "",
  });
    
  //onSubmit handler
  const onSubmit = (studentObject) => {
    axios
      .put(
        "http://localhost:4000/students/update-dish/" +
          props.match.params.id,
        studentObject
      )
      .then((res) => {
        if (res.status === 200) {
          alert("Student successfully updated");
          props.history.push("/dish-list");
        } else Promise.reject();
      })
      .catch((err) => alert("Something went wrong"));
  };
  
  // Load data from server and reinitialize dish form
  useEffect(() => {
    axios
      .get(
        "http://localhost:4000/students/update-dish/" 
        + props.match.params.id
      )
      .then((res) => {
        const { name, email, rollno } = res.data;
        setFormValues({ name, email, rollno });
      })
      .catch((err) => console.log(err));
  }, []);
  
  // Return dish form
  return (
    <DishForm
      initialValues={formValues}
      onSubmit={onSubmit}
      enableReinitialize
    >
      Update Student
    </DishForm>
  );
};
  
// Export EditDish Component
export default EditDish;