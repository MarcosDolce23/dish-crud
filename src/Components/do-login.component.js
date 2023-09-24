// DoLogin Component for add new ingredient
import Axios from 'axios';
import LoginForm from './LoginForm';
import CommonModal from './Common/CommonModal';
import { useState } from 'react';
import env from "react-dotenv";
import { useNavigate } from "react-router-dom";

const DoLogin = () => {
    const [modalShow, setModalShow] = useState(false);
    const [title, setTitle] = useState('');
    const [subTitle, setSubTitle] = useState('');
    const [text, setText] = useState('');

    const navigate = useNavigate();
    
    const formData = {
        name: '',
        password: ''
    };

    // onSubmit handler    
    const doLogin = (formData) => {
        // Axios.post(
        //     env.API_URL + '/login', formData)
        //     .then(res => {
        //         if (res.status === 200) {
        //         } else
        //             Promise.reject()
        //     })
        //     .catch(err => {
        //         setTitle('Error!');
        //         setSubTitle('Ingredient not created');
        //         setText('The ingredient was not created: ' + err);
        //         setModalShow(true);
        //     })
            return navigate("/dish-list");
    }

    // Return ingredient form
    return (
        <>
            <LoginForm initialValues={formData}
                onSubmit={doLogin}
            >
               Login Form 
            </LoginForm>
            <CommonModal
                show={modalShow}
                onHide={() => setModalShow(false)}
                title={title}
                subTitle={subTitle}
                text={text}
            />
        </>
    )
}

// Export DoLogin Component
export default DoLogin;