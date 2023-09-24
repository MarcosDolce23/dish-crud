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
    const [userCorrect, setUserCorrect] = useState(true);

    const navigate = useNavigate();

    const formData = {
        user: '',
        password: ''
    };

    // onSubmit handler    
    const doLogin = (formData) => {
        Axios.post(
            env.API_URL + '/users', formData)
            .then(res => {
                if (res.status === 200) {
                    if (res.data.length > 0)
                        return navigate("/dish-list");
                    else
                        setUserCorrect(false);
                } else
                    Promise.reject()
            })
            .catch(err => {
                setTitle('Error!');
                setSubTitle('Something went wrong');
                setText('Error: ' + err);
                setModalShow(true);
            })
    }

    // Return ingredient form
    return (
        <>
            <LoginForm initialValues={formData}
                onSubmit={doLogin}
                userCorrect={userCorrect}
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