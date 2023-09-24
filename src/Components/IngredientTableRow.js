import React, { useState } from "react";
import { Button } from "react-bootstrap";
import { Link } from "react-router-dom";
import axios from "axios";
import CommonModal from './Common/CommonModal';
import env from "react-dotenv";

const IngredientsTableRow = (props) => {
    const { _id, esName, enName } = props.obj;
    const [modalShow, setModalShow] = useState(false);
    const [title, setTitle] = useState('');
    const [subTitle, setSubTitle] = useState('');
    const [text, setText] = useState('');

    const deleteIngredient = () => {
        axios
            .delete(
                env.API_URL + "/ingredients/" + _id)
            .then(res => {
                if (res.status === 200) {
                    setTitle('Successful!');
                    setSubTitle('Ingredient successfully deleted');
                    setText('The ingredient ' + res.data.esName + ' | ' + res.data.enName + ' was succesfully deleted');
                    setModalShow(true);
                } else
                    Promise.reject()
            })
            .catch(err => {
                setTitle('Error!');
                setSubTitle('Ingredient not deleted');
                setText('The ingredient was not deleted: ' + err);
                setModalShow(true);
            })
    };

    return (
        <>
            <tr>
                <td>{esName}</td>
                <td>{enName}</td>
                <td>
                    <Link className="edit-link"
                        to={"/edit-ingredient/" + _id}>
                        Edit
                    </Link>
                    <Button onClick={deleteIngredient}
                        size="sm" variant="danger">
                        Delete
                    </Button>
                </td>
            </tr>
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

export default IngredientsTableRow;
