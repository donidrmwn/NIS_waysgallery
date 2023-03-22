import { useState } from "react";
import { Button, Container, Form } from "react-bootstrap";
import ModalSuccessOffer from "../components/Modals/ModalOffer";

export default function HiredPage() {
    const [showModalSuccessOFfer, setShowModalSuccessOffer] = useState(false)
    const handleShowModalSuccessOffer = () => setShowModalSuccessOffer(true)
    const handlecloseModalSuccessOffer = () => setShowModalSuccessOffer(false)
    return (
        <>
        
            <Container className="p-5">
                <Form className="d-grid gap-4">
                    <Form.Control
                        className="main-input"
                        type="text"
                        name="title"
                        placeholder="Title"
                    />
                    <Form.Control
                        style={{ height: "198px" }}
                        className="main-input"
                        as="textarea"
                        placeholder="Description"
                        name="description"
                    />
                    <Form.Group className="d-flex gap-5">
                        <Form.Control
                            className="main-input"
                            type="date"
                            placeholder="Description"
                            name="description"
                        />
                        <Form.Control
                            className="main-input"
                            type="date"
                            placeholder="Description"
                            name="description"
                        />
                    </Form.Group>
                    <Form.Control
                        className="main-input"
                        type="number"
                        name="price"
                        placeholder="Price"
                    />
                    <Form.Group className="d-flex justify-content-center gap-4 mt-5">
                        <Button className='fw-bold' style={{ width: "100px", backgroundColor: "#E7E7E7", border: "none", color: "black" }}>Cancel</Button>
                        <Button onClick={() => handleShowModalSuccessOffer()} className='fw-bold ' style={{ width: "100px", backgroundColor: "#2FC4B2", border: "none" }}>Bidding</Button>
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