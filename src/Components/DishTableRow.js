import React, { useState } from "react";
import { Button } from "react-bootstrap";
import { Link } from "react-router-dom";
import axios from "axios";
import CommonModal from './Common/CommonModal';

const DishesTableRow = (props) => {
    const { _id, esName, enName, esLabel, enLabel, cookTime, vegan } = props.obj;
    const [modalShow, setModalShow] = useState(false);
    const [title, setTitle] = useState('');
    const [subTitle, setSubTitle] = useState('');
    const [text, setText] = useState('');

    const deleteDish = () => {
        axios
            .delete(
                "http://localhost:4000/dishes/" + _id)
            .then(res => {
                if (res.status === 200) {
                    setTitle('Successful!');
                    setSubTitle('Dish successfully deleted');
                    setText('The dish ' + res.data.esName + ' | ' + res.data.enName + ' was succesfully deleted');
                    setModalShow(true);
                } else
                    Promise.reject()
            })
            .catch(err => {
                setTitle('Error!');
                setSubTitle('Dish not deleted');
                setText('The dish was not deleted: ' + err);
                setModalShow(true);
            })
    };

    return (
        <>
            <tr>
                <td>{esName}</td>
                <td>{enName}</td>
                <td>{esLabel}</td>
                <td>{enLabel}</td>
                <td>{cookTime}</td>
                <td>{vegan.toString()}</td>
                <td>
                    <Link className="edit-link"
                        to={"/edit-dish/" + _id}>
                        Edit
                    </Link>
                    <Button onClick={deleteDish}
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

export default DishesTableRow;
