import { useState } from "react";
import { Button, Container, Form } from "react-bootstrap";
import { useMutation } from "react-query";
import { useNavigate, useParams } from "react-router-dom";
import ModalSuccessOffer from "../components/Modals/ModalOffer";
import { API } from "../config/api";

export default function HiredPage() {
    const navigate = useNavigate()
    const [showModalSuccessOFfer, setShowModalSuccessOffer] = useState(false)
    const handleShowModalSuccessOffer = () => {
        setShowModalSuccessOffer(true)

    }
    const handlecloseModalSuccessOffer = () => {
        setShowModalSuccessOffer(false)
        navigate("/order")
    }

    let { id } = useParams();

    const [form, setForm] = useState({
        title: '',
        description: '',
        start_date: '',
        end_date: '',
        price: '',
    })

    const [isLoading, setIsLoading] = useState(false)

    const handleChange = (e) => {
        setForm({
            ...form,
            [e.target.name]: e.target.value
        })
    }

    const handleSubmit = useMutation(async (e) => {
        try {
            e.preventDefault();
            setIsLoading(true)
            const config = {
                headers: {
                    'Content-type': 'multipart/form-data',
                },
            };
            const formData = new FormData();
            if (form.title) {
                formData.set("title", form.title)
            }
            if (form.description) {
                formData.set("description", form.description)
            }
            if (form.start_date) {
                formData.set("start_date", form.start_date)
            }
            if (form.end_date) {
                formData.set("end_date", form.end_date)
            }
            if (form.price) {
                formData.set("price", form.price)
            }


            const response = await API.post(
                '/order/' + id, formData, config
            );
            console.log(response)
            setIsLoading(false)
            handleShowModalSuccessOffer()
        } catch (error) {
            console.log(error)
        }
    })
    return (
        <>

            <Container className="p-5">
                <Form className="d-grid gap-4">
                    <Form.Control
                        className="main-input"
                        type="text"
                        name="title"
                        placeholder="Title"
                        onChange={handleChange}
                    />
                    <Form.Control
                        style={{ height: "198px" }}
                        className="main-input"
                        as="textarea"
                        placeholder="Description"
                        name="description"
                        onChange={handleChange}
                    />
                    <Form.Group className="d-flex gap-5">
                        <Form.Control
                            className="main-input"
                            type="date"
                            placeholder="Description"
                            name="start_date"
                            onChange={handleChange}
                        />
                        <Form.Control
                            className="main-input"
                            type="date"
                            placeholder="Description"
                            name="end_date"
                            onChange={handleChange}
                        />
                    </Form.Group>
                    <Form.Control
                        className="main-input"
                        type="number"
                        name="price"
                        placeholder="Price"
                        onChange={handleChange}
                    />
                    <Form.Group className="d-flex justify-content-center gap-4 mt-5">
                        <Button className='fw-bold' style={{ width: "100px", backgroundColor: "#E7E7E7", border: "none", color: "black" }}>Cancel</Button>
                        <Button onClick={(e) => handleSubmit.mutate(e)} className='fw-bold ' style={{ width: "100px", backgroundColor: "#2FC4B2", border: "none" }}>Bidding</Button>
                    </Form.Group>
                </Form>
            </Container>
            <ModalSuccessOffer
                show={showModalSuccessOFfer}
                onHide={handlecloseModalSuccessOffer}
            />
        </>
    )
}