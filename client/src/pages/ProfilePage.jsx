
import { Button, Card, Col, Container, Image, Row } from "react-bootstrap"
import { useNavigate, useParams } from "react-router-dom";
import { useQuery } from 'react-query';
import { API } from '../config/api';
import { useContext, useEffect, useState } from "react";
import { UserContext } from "../context/userContext";


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
    const [state] = useContext(UserContext)
    const navigate = useNavigate();
    let { id } = useParams();
    let endPoint = "/profile/user/" + id




    let { data: profile, refetch: refetchProfile } = useQuery("profile", async () => {
        const response = await API.get(endPoint);
        return response.data.data;
    })
    

    let { data: postProfile, refetch: refetchPostProfile } = useQuery("postProfileCache", async () => {
        const response = await API.get("/post/user/"+profile?.user_id);
        return response.data.data;
    })

    useEffect(() => {
        refetchProfile() 
        refetchPostProfile()
        console.log("post profile",postProfile)
    }, [])

    return (
        <>

            <div style={style.rectangle17} className="rounded"></div>
            <Container fluid className="px-5 mt-5">
                <Row className="mb-4">
                    <Col md="6">
                        <Image style={style.roundedImage} className="m-auto me-4 mb-3" src={`${profile?.profile_picture}`} />
                        <h5 className="fw-bold mb-4">{profile?.name}</h5>
                        <h1 className="fw-bold">{profile?.greeting}</h1>
                        {id == state.user.id ?
                            <>
                                <Button onClick={() => navigate("/edit-profile/"+state.user.id)} className='fw-bold mt-5' style={{ width: "150px", backgroundColor: "#2FC4B2", border: "none" }}>Edit Profile</Button>
                            </>
                            :
                            <div className="d-flex gap-3">
                                <Button className='fw-bold mt-5' style={{ width: "150px", backgroundColor: "#E7E7E7", border: "none", color: "black" }}>Follow</Button>
                                <Button className='fw-bold mt-5' style={{ width: "150px", backgroundColor: "#2FC4B2", border: "none", zIndex: 1 }}>Hire</Button>
                            </div>
                        }

                    </Col>
                    <Col md="5" className="d-flex justify-content-end">


                        <Image className="w-100" style={{ height: "484px", zIndex: 1 }} src={`${profile?.best_art ? profile?.best_art : "/default-image.jpg"}`} />
                    </Col>
                </Row>
                <Row>
                    <p className="fw-bold">
                        {id == state.user.id ?
                            <>
                                My Works
                            </>
                            :
                            <>
                                {profile?.name} Works 
                            </>
                        }
                    </p>
                    <Row md="5" className="w-100 d-flex gap-3 justify-content-start mt-4 mb-5 p-2">
                        {}
                        {postProfile?.map((item, index) => {
                            return (
                                <Col key={index}>
                                    <Card.Img src={item?.photos[0].photo} style={style.cardImage} />
                                </Col>
                            )
                        })}
                    </Row>
                </Row>
            </Container>
        </>
    )
}