import { useEffect, useState } from "react"
import { useMutation } from 'react-query';
import { Button, Col, Container, Form, Image, Row } from "react-bootstrap"
import { API } from '../config/api'
import LoadingSpinner from "../components/LoadingSpinner";
export default function EditProfilePage() {
    const style = {
        mainProjectImage: {
            borderStyle: "dashed",
            width: "626px",
            
            borderWidth: "5px",
            borderColor: "#B2B2B2"
        },
        mainBestArt: {
            height: "500px",
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

    const [previewBestArt, setPreviewBestArt] = useState(null)
    const [previewProfilePicture, setPreviewProfilePicture] = useState(null)

    const [form, setForm] = useState({
        profile_picture: '',
        best_art: '',
        name: '',
        greeting: '',
    });

    const [isLoading, setIsLoading] = useState(false)

    async function getDataUpdate() {
        const responseProfile = await API.get('/profile/user')
        setPreviewBestArt(`${responseProfile.data.data.best_art}`)
        setPreviewProfilePicture(`${responseProfile.data.data.profile_picture}`)
        setForm({
            ...form,
            name: responseProfile.data.data.name,
            greeting: responseProfile.data.data.greeting,
            profile_picture: responseProfile.data.data.profile_picture,
            best_art: responseProfile.data.data.best_art,
        })
    }

    useEffect(() => {
        getDataUpdate()
    }, [])

    const handleChange = (e) => {
        setForm({
            ...form,
            [e.target.name]:
                e.target.type === "file" ? e.target.files : e.target.value
        });

        if (e.target.type === "file") {
            let url = URL.createObjectURL(e.target.files[0]);
            switch (e.target.name) {
                case "profile_picture":
                    setPreviewProfilePicture(url)
                    break;
                case "best_art":
                    setPreviewBestArt(url)
                    break;
                default:
                    break;
            }
        };
    }

    const handleSubmit = useMutation(async (e) => {
        try {
            e.preventDefault();
            setIsLoading(true);
            const config = {
                headers: {
                    'Content-type': 'multipart/form-data',
                },
            };
            const formData = new FormData();
            if (form.profile_picture) {
                formData.set('profile_picture', form?.profile_picture[0])
            }

            if (form.best_art) {
                formData.set('best_art', form?.best_art[0])
            }

            formData.set('name', form.name);
            formData.set('greeting', form.greeting);

            const response = await API.patch(
                '/profile', formData, config
            );
            console.log(response.data)
            setIsLoading(false);

        } catch (error) {
            console.log(error)
            setIsLoading(false)
        }
    })
    return (
        <>

            <Container className="p-5">
                <Row className="d-flex gap-2">
                    <Form.Label className="col d-grid rounded p-0 align-items-center" style={style.mainProjectImage}>
                        {!previewBestArt ?
                            <>
                                <Image style={style.uploadIcon} className="m-auto" src="/upload.png" />
                                <h2 style={{ color: "#1A2535" }} className="mt-5 d-flex justify-content-center">
                                    <span style={{ color: "#2FC4B2" }} className="me-2">Upload </span> Your Best Art
                                </h2>
                            </>
                            :
                            <Image style={style.mainBestArt} className="m-auto w-100" src={previewBestArt} />
                        }

                        <Form.Control
                            type="file"
                            name="best_art"
                            onChange={handleChange}
                            hidden
                        />
                    </Form.Label>
                    <Col className="d-grid">
                        <Form.Label className="d-flex justify-content-center">
                            {!previewProfilePicture ?
                                <Row style={style.profileUpload} className="m-auto">
                                    <Image style={style.cameraIcon} className="m-auto" src="/camera 1.png" />
                                </Row>
                                :

                                <Image style={style.profileUpload} className="m-auto" src={previewProfilePicture} />

                            }

                            <Form.Control
                                type="file"
                                name="profile_picture"
                                onChange={handleChange}
                                hidden
                            />

                        </Form.Label>


                        <Row className="d-grid gap-3 p-5">
                            <Form.Control
                                className="main-input"
                                onChange={handleChange}
                                value={form?.greeting}
                                type="text"
                                placeholder="Greeting"
                                name="greeting"
                            />
                            <Form.Control
                                className="main-input"
                                onChange={handleChange}
                                value={form?.name}
                                type="text"
                                placeholder="Full Name"
                                name="name"
                            />

                            <Button onClick={(e) => handleSubmit.mutate(e)} className='fw-bold m-auto mt-5' disabled={isLoading} style={{ width: "100px", backgroundColor: "#2FC4B2", border: "none" }}>
                                {isLoading ?
                                    <LoadingSpinner />
                                    :
                                    <>Save</>
                                }

                            </Button>
                        </Row>
                    </Col>
                </Row>
            </Container>
        </>
    )
}