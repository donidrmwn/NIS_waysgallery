import { Button, Col, Container, Image, Modal, Row } from "react-bootstrap";
import { Navigate, useNavigate } from "react-router-dom";
import ProfileList from "../../utils/ProfileList";

export default function ModalListUserFollow(props) {
    const style = {
        roundedImage: {
            borderRadius: "100%",
            width: "60px",
            heigth: "60px",
        }
    }
    const navigate = useNavigate()
    return (
        <Modal className="modal-l " show={props.show} onHide={props.onHide} centered>
            <Modal.Body>
                {props.statusModalFollow == "follower" ?
                    <>
                        {props.follower?.data.map((item, index) => {
                            return (
                                <div onClick={() => { navigate("/profile/" + item.follower_user.id); props.onHide() }} style={{ cursor: "pointer" }} key={index}>
                                    <Row className='mt-4 mb-4 m-auto'>
                                        <Col md="2">
                                            <Image style={style.roundedImage} className="m-auto me-4" src={`${item.follower_user.profile.profile_picture}`} />
                                        </Col>
                                        <Col>
                                            <p>{item.follower_user.profile.name}</p>
                                            <p>{item.follower_user.profile.greeting}</p>
                                        </Col>
                                    </Row>
                                    <hr />
                                </div>
                            )
                        })}
                    </>
                    :
                    <>
                        {props.following?.data.map((item, index) => {
                            return (
                                <div onClick={() => { navigate("/profile/" + item?.followed_user.id); props.onHide() }} style={{ cursor: "pointer" }} key={index}>
                                    <Row className='mt-4 mb-4 m-auto'>
                                        <Col md="2">
                                            <Image style={style.roundedImage} className="m-auto me-4" src={`${item.followed_user?.profile.profile_picture}`} />
                                        </Col>
                                        <Col>
                                            <p>{item.followed_user?.profile.name}</p>
                                            <p>{item.followed_user?.profile.greeting}</p>
                                        </Col>
                                    </Row>
                                    <hr />
                                </div>
                            )
                        })}
                    </>
                }

            </Modal.Body>
        </Modal>
    )
}