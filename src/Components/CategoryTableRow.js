import React, { useState } from "react";
import { Button } from "react-bootstrap";
import { Link } from "react-router-dom";
import axios from "axios";
import CommonModal from './Common/CommonModal';

const CategoryTableRow = (props) => {
    const { _id, esName, enName } = props.obj;
    const [modalShow, setModalShow] = useState(false);
    const [title, setTitle] = useState('');
    const [subTitle, setSubTitle] = useState('');
    const [text, setText] = useState('');

    const deleteCategory = () => {
        axios
            .delete(
                env.API_URL + "/categories/" + _id)
            .then(res => {
                if (res.status === 200) {
                    setTitle('Successful!');
                    setSubTitle('Category successfully deleted');
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
                <td>
                    <Link className="edit-link"
                        to={"/edit-category/" + _id}>
                        Edit
                    </Link>
                    <Button onClick={deleteCategory}
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

export default CategoryTableRow;
