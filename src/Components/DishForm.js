import React from "react";
import * as Yup from "yup";
import { Formik, Form, Field, ErrorMessage } from "formik";
import { FormGroup, FormControl, Button } from "react-bootstrap";

const DishForm = (props) => {
    const validationSchema = Yup.object().shape({
        esName: Yup.string().required("Required"),
        enName: Yup.string().required("Required"),
        esLabel: Yup.string().required("Required"),
        enLabel: Yup.string().required("Required"),
        cookTime: Yup.number()
            .positive("Invalid roll number")
            .integer("Invalid roll number")
            .required("Required"),
        vegan: Yup.boolean().required("Required"),
        esIngredients: Yup.array().required("Required"),
        enIngredients: Yup.array().required("Required"),
        esRecipes: Yup.array().required("Required"),
        enRecipes: Yup.array().required("Required")
    });
    console.log(props);
    return (
        <div className="form-wrapper">
            <Formik {...props} validationSchema={validationSchema}>
                <Form>
                    <FormGroup>
                        <label htmlFor="esName">ES Name:</label>
                        <Field id="esName" name="esName" type="text"
                            className="form-control" />
                        <ErrorMessage
                            name="esName"
                            className="d-block invalid-feedback"
                            component="span"
                        />
                    </FormGroup>
                    <FormGroup>
                        <label htmlFor="enName">EN Name:</label>
                        <Field id="enName" name="enName" type="text"
                            className="form-control" />
                        <ErrorMessage
                            name="enName"
                            className="d-block invalid-feedback"
                            component="span"
                        />
                    </FormGroup>
                    <FormGroup>
                        <label htmlFor="esLabel">ES Label:</label>
                        <Field id="esLabel" name="esLabel" type="text"
                            className="form-control" />
                        <ErrorMessage
                            name="esLabel"
                            className="d-block invalid-feedback"
                            component="span"
                        />
                    </FormGroup>
                    <FormGroup>
                        <label htmlFor="enLabel">EN Label:</label>
                        <Field id="enLabel" name="enLabel" type="text"
                            className="form-control" />
                        <ErrorMessage
                            name="enLabel"
                            className="d-block invalid-feedback"
                            component="span"
                        />
                    </FormGroup>
                    <FormGroup>
                        <label htmlFor="cookTime">Cook time:</label>
                        <Field id="cookTime" name="cookTime" type="number"
                            className="form-control" />
                        <ErrorMessage
                            name="cookTime"
                            className="d-block invalid-feedback"
                            component="span"
                        />
                    </FormGroup>
                    <FormGroup>
                        <label htmlFor="vegan">Vegan:</label>
                        <Field id="vegan" name="vegan" type="checkbox" />
                        <ErrorMessage
                            name="vegan"
                            className="d-block invalid-feedback"
                            component="span"
                        />
                    </FormGroup>
                    <FormGroup>
                        <label htmlFor="esIngredients">ES Ingredients:</label>
                        <Field id="esIngredients" name="esIngredients" type="text"
                            className="form-control" />
                        <ErrorMessage
                            name="esIngredients"
                            className="d-block invalid-feedback"
                            component="span"
                        />
                    </FormGroup>
                    <FormGroup>
                        <label htmlFor="enIngredients">EN Ingredients:</label>
                        <Field id="enIngredients" name="enIngredients" type="text"
                            className="form-control" />
                        <ErrorMessage
                            name="enIngredients"
                            className="d-block invalid-feedback"
                            component="span"
                        />
                    </FormGroup>
                    <FormGroup>
                        <label htmlFor="esRecipes">ES Recipes:</label>
                        <Field id="esRecipes" name="esRecipes" type="text"
                            className="form-control" />
                        <ErrorMessage
                            name="esRecipes"
                            className="d-block invalid-feedback"
                            component="span"
                        />
                    </FormGroup>
                    <FormGroup>
                        <label htmlFor="enRecipes">EN Recipes:</label>
                        <Field id="enRecipes" name="enRecipes" type="text"
                            className="form-control" />
                        <ErrorMessage
                            name="enRecipes"
                            className="d-block invalid-feedback"
                            component="span"
                        />
                    </FormGroup>
                    <Button variant="danger" size="lg"
                        block="block" type="submit">
                        {props.children}
                    </Button>
                </Form>
            </Formik>
        </div>
    );
};

export default DishForm;