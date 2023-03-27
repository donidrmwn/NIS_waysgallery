
import { Button, Card, Col, Container, Image, Row } from "react-bootstrap"
import { useNavigate, useParams } from "react-router-dom";
import { useMutation, useQuery } from 'react-query';
import { API } from '../config/api';
import { useContext, useEffect, useState } from "react";
import { UserContext } from "../context/userContext";
import LoadingSpinner from "../components/LoadingSpinner";
import Gallery from "../utils/Gallery";


export default function ProfilePage() {
    const style = {
        rectangle17: {
            position: "absolute",
            width: "330px",
            height: "400px",
            right: "0",
            top: "145px",
            backgroundColor: "#2FC4B2",

        }, roundedImage: {
            borderRadius: "100%",
            width: "120px",
            heigth: "120px",
        },
        cardImage: {
            height: "328px",
            cursor: "pointer"
        }
    }
    const [state] = useContext(UserContext)
    const navigate = useNavigate();
    let { id } = useParams();
    let endPoint = "/profile/user/" + id

    const [isLoading, setIsLoading] = useState(false)


    let { data: profile, refetch: refetchProfile } = useQuery("profile", async () => {
        const response = await API.get(endPoint);
        return response.data.data;
    })

    let { data: follow, refetch: refetchFollow } = useQuery("followCache", async () => {
        let response
        if (localStorage.token) {
            response = await API.get("/follow/" + id);
        }
        setIsLoading(false)
        return response.data.data;
    })



    let { data: postProfile, refetch: refetchPostProfile } = useQuery("postProfileCache", async () => {
        const response = await API.get("/post/user/" + id);
        console.log(response)
        return response.data;
    })

    let { data: postCount, refetch: refetchPostCount } = useQuery("postCountCache", async () => {
        const response = await API.get("/post/count");
        console.log("post count",response)
        return response.data.data;
    })
    useEffect(() => {
        refetchProfile()
        refetchPostProfile()
        console.log("post profile", postProfile)
    }, [id])


    const handleFollow = useMutation(async (e) => {
        try {
            e.preventDefault();
            setIsLoading(true)
            const response = await API.post(
                '/follow/' + id
            )
            refetchFollow()
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
                '/follow/' + id
            )
            refetchFollow()
            setIsLoading(false)
            console.log(response)
        } catch (error) {
            setIsLoading(false)
            console.log(error)
        }
    })
    return (
        <>

            <div style={style.rectangle17} className="rounded "></div>
            <Container fluid className="px-5 mt-5 ">
                <Row className="mb-4 ">
                    <Col md="6">
                        <Image style={style.roundedImage} className="m-auto me-4 mb-3" src={`${profile?.profile_picture}`} />
                        <h5 className="fw-bold mb-4">{profile?.name}</h5>
                        <Row>
                            <Col md="1" className="d-grid justify-content-center">
                                <h5 className="mb-2 d-flex m-auto">Posts</h5>
                                <h5 className="mb-3 m-auto">{postCount}</h5>
                            </Col>
                        </Row>
                        <h1 className="fw-bold">{profile?.greeting}</h1>
                        {id == state.user.id ?
                            <>
                                <Button onClick={() => navigate("/edit-profile/" + state.user.id)} className='fw-bold mt-5' style={{ width: "150px", backgroundColor: "#2FC4B2", border: "none" }}>Edit Profile</Button>
                            </>
                            :
                            <div className="d-flex gap-3">
                                {!follow?.followed_user.email ?
                                    <Button onClick={(e) => { handleFollow.mutate(e) }} className='fw-bold mt-5' style={{ width: "150px", backgroundColor: "#E7E7E7", border: "none", color: "black" }}>
                                        {isLoading ? <div className="m-auto w-75"> <LoadingSpinner /></div> :
                                            <p className="m-auto">Follow</p>
                                        }

                                    </Button>
                                    :
                                    <Button onClick={(e) => { handleUnFollow.mutate(e) }} className='fw-bold mt-5' style={{ width: "150px", backgroundColor: "#E7E7E7", border: "none", color: "black" }}>
                                        {isLoading ? <div className="m-auto w-75"> <LoadingSpinner /></div> :
                                            <p className="m-auto">Unfollow</p>
                                        }
                                    </Button>
                                }
                                <Button onClick={() => navigate("/hired/" + id)} className='fw-bold mt-5' style={{ width: "150px", backgroundColor: "#2FC4B2", border: "none", zIndex: 1 }}>Hire</Button>
                            </div>
                        }

                    </Col>
                    <Col md="5" className="d-flex justify-content-end">


                        <Image className="w-100 rounded" style={{ height: "484px", zIndex: 1 }} src={`${profile?.best_art ? profile?.best_art : "/default-image.jpg"}`} />
                    </Col>
                </Row>
                <Row className="">
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
                    <Gallery data={postProfile} />

                </Row>
            </Container>
        </>
    )
}