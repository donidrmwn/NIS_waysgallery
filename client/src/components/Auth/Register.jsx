import { Alert, Button, Container, Form } from "react-bootstrap";
import { API } from '../../config/api';
import { useMutation } from 'react-query'
import { useState } from "react";

export default function Register({ switchRegister }) {
    const [message, setMessage] = useState(null)
    const [form, setForm] = useState({
        name: '',
        email: '',
        password: '',
    });

    // const { name, email, password } = form;
    const handleChange = (e) => {
        setForm({
            ...form,
            [e.target.name]: e.target.value,
        });
    }

    const handleSubmit = useMutation(async (e) => {
        try {
            e.preventDefault();
            const response = await API.post("/register", form);
            const alert = (
                <Alert variant="success" className="py-1">
                    Register Success !
                </Alert>
            );
            console.log(response)
            setMessage(alert)
            switchRegister()
        } catch (error) {
            const alert = (
                <Alert variant="danger" className="py-1">
                    Failed to register !
                </Alert>
            );
            setMessage(alert);
            console.log(error)
        };
    })

    return (
        <Container>
            <h1 className="mb-4" style={{ color: "#2FC4B2" }}>Register</h1>
            {message && message}
            <Form className="d-grid gap-4 mb-4">
                <Form.Control
                    className="main-input"
                    type="email"
                    placeholder="Email"
                    onChange={handleChange}
                    name="email"
                />
                <Form.Control
                    className="main-input"
                    type="password"
                    placeholder="Password"
                    onChange={handleChange}
                    name="password"
                />
                <Form.Control
                    className="main-input"
                    type="text"
                    placeholder="Full Name"
                    onChange={handleChange}
                    name="name"
                />
                <Button onClick={(e) => handleSubmit.mutate(e)} className="py-2" style={{ fontSize: "20px", backgroundColor: "#2FC4B2", border: "none" }}>Register</Button>
            </Form>
            <p style={{ textAlign: "center", fontSize: "20px" }}>Already have an account ?
                Click <span  style={{cursor:"pointer"}} onClick={switchRegister} as={Button} className="fw-bold">Here</span>
            </p>
        </Container>
    )
}