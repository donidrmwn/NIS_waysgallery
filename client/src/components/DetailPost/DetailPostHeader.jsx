import { useContext, useEffect, useState } from "react";
import { Button, Col, Image, Row } from "react-bootstrap";
import { useMutation, useQuery } from "react-query";
import { useNavigate } from "react-router-dom";
import { API } from "../../config/api";
import { UserContext } from "../../context/userContext";
import { ConvertFormatDate } from "../../utils/ConvertFormatDate";
import LoadingSpinner from "../LoadingSpinner";
export default function DetailPostHeader({ user, title, postID, postDate }) {
    const style = {

        roundedImage: {
            borderRadius: "100%",
            width: "60px",
            heigth: "60px",
            cursor: "pointer"
        }
    }
    const [isLoading, setIsLoading] = useState(false)
    const [state] = useContext(UserContext)
    const userID = user?.id
    const navigate = useNavigate("/")
    const profile = user?.profile

    let { data: follow, refetch } = useQuery("followCache", async () => {
        let response
        if (localStorage.token) {
            response = await API.get("/follow/" + userID);
        }
        setIsLoading(false)
        return response.data.data;
    })



    const handleFollow = useMutation(async (e) => {
        try {
            e.preventDefault();
            setIsLoading(true)
            const response = await API.post(
                '/follow/' + userID
            )
            refetch()
            setIsLoading(false)
            console.log(response)
        } catch (error) {
            setIsLoading(false)
            console.log(error)
        }
    })

    const handleUnFollow = useMutation(async (e) => {
        try {
            e.preventDefault();
            setIsLoading(true)
            const response = await API.delete(
                '/follow/' + userID
            )
            refetch()
            setIsLoading(false)
            console.log(response)
        } catch (error) {
            setIsLoading(false)
            console.log(error)
        }
    })


    return (
        <>
            <Row className="d-flex align-items-center mb-3 h-100">
                <Col md="8" className="d-flex justify-content-start">
                    <Image onClick={() => navigate("/profile/" + userID)} style={style.roundedImage} className="m-auto me-4" src={`${profile?.profile_picture}`} />
                    <Col>
                        <p className="m-auto fw-bold">{title}</p>
                        <p className="m-auto" onClick={() => navigate("/profile/" + userID)} style={{ cursor: "pointer" }}>{profile?.name}</p>
                        <p className="m-auto">{ConvertFormatDate(postDate)}</p>
                    </Col>
                </Col>
                <Col className="d-flex gap-4 justify-content-end">
                    {userID == state.user.id ?
                        <Button onClick={() => navigate("/edit-post/" + postID)} className='fw-bold h-75' style={{ width: "100px", backgroundColor: "#2FC4B2", border: "none", zIndex: 1 }}>Edit Post</Button>
                        :
                        <>
                            {!follow?.followed_user.email ?
                                <Button onClick={(e) => { handleFollow.mutate(e) }} className='fw-bold h-75' style={{ width: "100px", backgroundColor: "#E7E7E7", border: "none", color: "black" }}>
                                    {isLoading ? <div className="m-auto w-75"> <LoadingSpinner /></div> :
                                        <p className="m-auto">Follow</p>
                                    }

                                </Button>
                                :
                                <Button onClick={(e) => { handleUnFollow.mutate(e) }} className='fw-bold h-75' style={{ width: "100px", backgroundColor: "#E7E7E7", border: "none", color: "black" }}>
                                    {isLoading ? <div className="m-auto w-75"> <LoadingSpinner /></div> :
                                        <p className="m-auto">Unfollow</p>
                                    }
                                </Button>
                            }
                            <Button className='fw-bold h-75' style={{ width: "100px", backgroundColor: "#2FC4B2", border: "none", zIndex: 1 }}>Hire</Button>
                        </>
                    }

                </Col>
            </Row>
        </>
    )
}