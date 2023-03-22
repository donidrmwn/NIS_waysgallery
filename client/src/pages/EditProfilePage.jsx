import { Button, Col, Container, Form, Image, Row } from "react-bootstrap"

export default function EditProfilePage() {
    const style = {
        mainProjectImage: {
            borderStyle: "dashed",
            width: "626px",
            height: "478px",
            borderWidth: "5px",
            borderColor: "#B2B2B2"
        },
        uploadIcon: {
            width: "290px",
            height: "200px"
        },
        profileUpload: {
            borderStyle: "dashed",
            borderRadius: "100%",
            borderColor: "#B2B2B2",
            borderWidth: "5px",
            width: "200px",
            height: "200px",

        },
        cameraIcon: {
            width: "110px",
            height: "86.5px"
        }

    }
    return (
        <>
        
            <Container className="p-5">
                <Row className="d-flex gap-2">
                    <Col className="d-grid rounded p-5" style={style.mainProjectImage}>
                        <Image style={style.uploadIcon} className="m-auto" src="/upload.png" />
                        <h2 style={{ color: "#1A2535" }} className="mt-5 d-flex justify-content-center">
                            <span style={{ color: "#2FC4B2" }} className="me-2">Upload </span> Your Best Art
                        </h2>
                    </Col>
                    <Col className="d-grid">
                        <Row style={style.profileUpload} className="m-auto">
                            <Image style={style.cameraIcon} className="m-auto" src="/camera 1.png" />
                        </Row>
                        <Row className="d-grid gap-3 p-5">
                            <Form.Control
                                className="main-input"
                                type="text"
                                placeholder="Greeting"
                                name="greeting"
                            />
                            <Form.Control
                                className="main-input"
                                type="text"
                                placeholder="Full Name"
                                name="name"
                            />
                            <Button className='fw-bold m-auto mt-5' style={{ width: "100px", backgroundColor: "#2FC4B2", border: "none" }}>Save</Button>
                        </Row>
                    </Col>
                </Row>
            </Container>
        </>
    )
}