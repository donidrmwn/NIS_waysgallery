
import { Button, Card, Col, Container, Image, Row } from "react-bootstrap"
import { useNavigate, useParams } from "react-router-dom";
import { useQuery } from 'react-query';
import { API } from '../config/api';

export default function ProfilePage() {
    const style = {
        rectangle17: {
            position: "absolute",
            width: "330px",
            height: "400px",
            right: "0",
            top: "121px",
            backgroundColor: "#2FC4B2",
            
        }, roundedImage: {
            borderRadius: "100%",
            width: "120px",
            heigth: "120px",
        },
        cardImage: {
            height: "328px"
        }
    }


    const navigate = useNavigate();
    let { user } = useParams();
    let { data: profile } = useQuery("profileCache", async () => {
        const response = await API.get("/profile/user");
        return response.data.data;
    })


    return (
        <>

            <div style={style.rectangle17} className="rounded"></div>
            <Container fluid className="px-5 mt-5">
                <Row className="mb-4">
                    <Col md="6">
                        <Image style={style.roundedImage} className="m-auto me-4 mb-3" src={`${profile?.profile_picture}`} />
                        <h5 className="fw-bold mb-4">{profile?.name}</h5>
                        <h1 className="fw-bold">{profile?.greeting}</h1>
                        {user == "my-profile" ?
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
                       
                       
                        <Image className="w-100" style={{ height: "484px",zIndex:1 }} src={`${profile?.best_art ? profile?.best_art : "/default-image.jpg"}`} />
                    </Col>
                </Row>
                <Row>
                    <p className="fw-bold">
                        {user == "my-profile" ?
                            <>
                                My Works
                            </>
                            :
                            <>
                                Nama User Works
                            </>
                        }
                    </p>
                    <Row md="5" className="w-100 d-flex gap-3 justify-content-center mt-4 mb-5 p-2">
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