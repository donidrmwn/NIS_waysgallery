import { useContext } from "react";
import { Button, Col, Image, Row } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import { UserContext } from "../../context/userContext";

export default function DetailPostHeader({ user, title, postID }) {
    const style = {

        roundedImage: {
            borderRadius: "100%",
            width: "60px",
            heigth: "60px",
        }
    }
    const [state] = useContext(UserContext)
    const userID = user?.id
    const navigate = useNavigate("/")
    console.log(userID == state.user.id)
    const profile = user?.profile
    return (
        <>
            <Row className="d-flex align-items-center mb-3 h-100">
                <Col className="d-flex justify-content-start">
                    <Image style={style.roundedImage} className="m-auto me-4" src={`${profile?.profile_picture}`} />
                    <Col>
                        <p className="m-auto fw-bold">{title}</p>
                        <p className="m-auto" onClick={() => navigate("/profile/" + userID)} style={{ cursor: "pointer" }}>{profile?.name}</p>
                    </Col>
                </Col>
                <Col className="d-flex gap-4 justify-content-end">
                    {userID == state.user.id ?
                        <Button onClick={() => navigate("/edit-post/"+postID)} className='fw-bold h-75' style={{ width: "100px", backgroundColor: "#2FC4B2", border: "none", zIndex: 1 }}>Edit Post</Button>
                        :
                        <>
                            <Button className='fw-bold h-75' style={{ width: "100px", backgroundColor: "#E7E7E7", border: "none", color: "black" }}>Follow</Button>
                            <Button className='fw-bold h-75' style={{ width: "100px", backgroundColor: "#2FC4B2", border: "none", zIndex: 1 }}>Hire</Button>
                        </>
                    }

                </Col>
            </Row>
        </>
    )
}