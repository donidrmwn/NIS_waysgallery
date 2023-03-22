import { useState } from "react"
import { Button, Card, Col, Container, Image, Row } from "react-bootstrap"
import { useNavigate } from "react-router-dom";

export default function ProfilePage() {
    const style = {
        rectangle17: {
            position: "absolute",
            width: "330px",
            height: "400px",
            right: "0",
            top: "121px",
            backgroundColor: "#2FC4B2",
            zIndex: "-1"
        }, roundedImage: {
            borderRadius: "100%",
            width: "120px",
            heigth: "120px",
        },
        cardImage: {
            height: "328px"
        }
    }
    

    const [isUserLogin] = useState(true)
    const navigate = useNavigate();
    return (
        <>
        
            <div style={style.rectangle17} className="rounded"></div>
            <Container fluid className="px-5 mt-5">
                <Row className="mb-4">
                    <Col md="6">
                        <Image style={style.roundedImage} className="m-auto me-4 mb-3" src={`${"/profile.png"}`} />
                        <h5 className="fw-bold mb-4">Nama User Login</h5>
                        <h1 className="fw-bold">Welcome to my Art</h1>
                        {isUserLogin ?
                            <>
                                <Button onClick={() => navigate("/edit-profile")} className='fw-bold mt-5' style={{ width: "150px", backgroundColor: "#2FC4B2", border: "none" }}>Edit Profile</Button>
                            </>
                            :
                            <div className="d-flex gap-3">
                                <Button className='fw-bold mt-5' style={{ width: "150px", backgroundColor: "#E7E7E7", border: "none", color: "black" }}>Follow</Button>
                                <Button className='fw-bold mt-5' style={{ width: "150px", backgroundColor: "#2FC4B2", border: "none", zIndex: 1 }}>Hire</Button>
                            </div>
                        }

                    </Col>
                    <Col md="5" className="d-flex justify-content-end">
                        <Image className="w-100" style={{ height: "484px" }} src="/sample Image/Rectangle 10.png" />
                    </Col>
                </Row>
                <Row>
                    <p className="fw-bold">
                        {isUserLogin ?
                            <>
                                My Works
                            </>
                            :
                            <>
                                Nama User Works
                            </>
                        }
                    </p>
                    <Row md="4" className="w-100 d-flex gap-3 justify-content-start mt-4 mb-5 p-2">
                        <Col>
                            <Card.Img variant="top" style={style.cardImage} src="/sample Image/Rectangle 15.png" />
                        </Col>
                        <Col>
                            <Card.Img variant="top" style={style.cardImage} src="/sample Image/Rectangle 8.png" />
                        </Col>
                        <Col>
                            <Card.Img variant="top" style={style.cardImage} src="/sample Image/Rectangle 10.png" />
                        </Col>
                        <Col>
                            <Card.Img variant="top" style={style.cardImage} src="/sample Image/Rectangle 10.png" />
                        </Col>

                    </Row>
                </Row>
            </Container>
        </>
    )
}