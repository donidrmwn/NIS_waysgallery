import { Button, Col, Container, Form, Image, Row } from "react-bootstrap";

export default function SendProjectPage() {

    const style = {
        mainProjectImage: {
            borderStyle: "dashed",
            width: "626px",
            height: "478px",
            borderWidth: "5px",
            borderColor: "#B2B2B2"
        },
        subProjectImage: {
            borderStyle: "dashed",
            width: "150px",
            height: "111px",
            borderWidth: "5px",
            borderColor: "#B2B2B2"
        },
        uploadIcon: {
            width: "290px",
            height: "200px"
        },
        plusIcon: {
            width: "53px",
            height: "53px"
        }
    }

    return (
        <>
            <Container className="p-5">
                <Row className="px-5 d-flex justify-content-center align-items-start gap-4">
                    <Col>
                        <Row className="rounded p-5" style={style.mainProjectImage}>
                            <Image style={style.uploadIcon} className="m-auto" src="/upload.png" />
                            <h2 style={{ color: "#1A2535" }} className="mt-5 d-flex justify-content-center">
                                <span style={{ color: "#2FC4B2" }} className="me-2">Browse </span> to choose a file
                            </h2>

                        </Row>
                        <Row md="6" className="d-flex gap-2 mt-3 justify-content-center p-0">
                            <Col className="d-flex rounded" style={style.subProjectImage}>
                                <Image style={style.plusIcon} className="m-auto" src="/plus 1.png" />
                            </Col>
                            <Col className="d-flex rounded" style={style.subProjectImage}>
                                <Image style={style.plusIcon} className="m-auto" src="/plus 1.png" />
                            </Col>
                            <Col className="d-flex rounded" style={style.subProjectImage}>
                                <Image style={style.plusIcon} className="m-auto" src="/plus 1.png" />
                            </Col>
                            <Col className="d-flex rounded" style={style.subProjectImage}>
                                <Image style={style.plusIcon} className="m-auto" src="/plus 1.png" />
                            </Col>
                        </Row>
                    </Col>
                    <Col className="d-grid gap-4 py-1">                        
                        <Form.Control
                            style={{ height: "198px" }}
                            className="main-input"
                            as="textarea"
                            placeholder="Description"
                            name="description"
                        />
                        <Row className="d-flex justify-content-center gap-4 mt-1">                                          
                            <Button className='fw-bold ' style={{ width: "150px", backgroundColor: "#2FC4B2", border: "none"}}>Send Project</Button>
                        </Row>
                    </Col>
                </Row>

            </Container>
        </>
    )
}