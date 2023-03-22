import { useContext, useEffect, useState } from "react";
import { Alert, Button, Container, Form } from "react-bootstrap";
import { useMutation } from 'react-query'
import { UserContext } from '../../context/userContext'

import { API, setAuthToken } from '../../config/api'
import { useNavigate } from "react-router-dom";
import { ProfileContext } from "../../context/profileContext";


export default function Login({ switchLogin, onHide }) {
    const navigate = useNavigate();
    
    const [state, dispatch] = useContext(UserContext);
    const [profileState,dispatchProfile] = useContext(ProfileContext)

    const [message, setMessage] = useState(null);
    const [form, setForm] = useState({
        email: '',
        password: '',
    });

    const handleChange = (e) => {
        setForm({
            ...form,
            [e.target.name]: e.target.value,
        });
    };

    const handleSubmit = useMutation(async (e) => {
        try {
            e.preventDefault();
            const response = await API.post('/login', form);
            dispatch({
                type: 'LOGIN_SUCCESS',
                payload: response.data.data,
            });

            setAuthToken(localStorage.token)
            const alert = (
                <Alert variant="success" className='py-1'>
                    Login Success
                </Alert>
            );
            setMessage(alert);
            onHide();
            navigate("/home")
        } catch (error) {
            const alert = (
                <Alert variant='danger' className='py-1'>
                    Login failed
                </Alert>
            );
            setMessage(alert);
            console.log("login failed: ", error)
        }
    })

    useEffect(() => {
        if (state.isLogin) {
            console.log(state)
        }
    }, [state])
    return (
        <Container>
            {message && message}
            <h1 className="mb-4" style={{ color: "#2FC4B2" }}>Login</h1>
            <Form className="d-grid gap-4 mb-4">
                <Form.Control
                    className="main-input"
                    type="email"
                    placeholder="Email"
                    name="email"
                    onChange={handleChange}
                />
                <Form.Control
                    className="main-input"
                    type="password"
                    placeholder="Password"
                    name="password"
                    onChange={handleChange}
                />

                <Button onClick={(e) => handleSubmit.mutate(e)} className="py-2" style={{ fontSize: "20px", backgroundColor: "#2FC4B2", border: "none" }}>Login</Button>
            </Form>
            <p style={{ textAlign: "center", fontSize: "20px" }}>Don't have an account ?
                Click <span onClick={switchLogin} as={Button} className="fw-bold">Here</span>
            </p>
        </Container>
    )
}