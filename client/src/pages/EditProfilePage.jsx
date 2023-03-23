import { useCallback, useEffect, useState } from "react"
import { useMutation } from 'react-query';
import { Button, Col, Container, Form, Image, Row } from "react-bootstrap"
import { API } from '../config/api'
import Dropzone, { useDropzone } from 'react-dropzone'
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
    const [bestArt, setBestArt] = useState(null)
    const [profilePicture, setProfilePicture] = useState(null)
    const [form, setForm] = useState({
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
            [e.target.name]: e.target.value
        });
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
                formData.set('profile_picture', !profilePicture ? "" : profilePicture[0])
            }

            if (form.best_art) {
                formData.set('best_art', !bestArt ? "" : bestArt[0])
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
                    <Dropzone onDrop={acceptedFiles => {
                        let url = URL.createObjectURL(acceptedFiles[0]);
                        console.log(url)
                        setPreviewBestArt(url)
                        setBestArt(acceptedFiles)
                    }}>
                        {({ getRootProps, getInputProps }) => (
                            <Col className="col d-grid rounded p-0 align-items-center rounded"  {...getRootProps()} style={style.mainProjectImage}>
                                <Form.Control  {...getInputProps()} />
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
                            </Col>
                        )}
                    </Dropzone>
                    <Col className="d-grid">
                        <Dropzone onDrop={profile_picture => {
                            let url = URL.createObjectURL(profile_picture[0]);
                            setPreviewProfilePicture(url)
                            setProfilePicture(profile_picture)
                        }}>
                            {({ getRootProps, getInputProps }) => (
                                <div className="d-flex justify-content-center" {...getRootProps()}>
                                    <Form.Control  {...getInputProps()} />
                                    {!previewProfilePicture ?
                                        <Row style={style.profileUpload} className="m-auto">
                                            <Image style={style.cameraIcon} className="m-auto" src="/camera 1.png" />
                                        </Row>
                                        :
                                        <Image style={style.profileUpload} className="m-auto" src={previewProfilePicture} />
                                    }
                                </div>
                            )}
                        </Dropzone>


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