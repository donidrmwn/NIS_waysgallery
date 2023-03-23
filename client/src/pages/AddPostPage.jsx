import { useState } from "react";
import { Button, Col, Container, Form, Image, Row } from "react-bootstrap";
import Dropzone from "react-dropzone";
import { useMutation } from "react-query";
import LoadingSpinner from "../components/LoadingSpinner";
import { API } from "../config/api";

export default function AddPostPage() {
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
        ,
        previewSub: {
            width: "150px",
            height: "111px",

        }
    }

    const [previewMainImage, setPreviewMainImage] = useState(null)
    const [previewImage2, setPreviewImage2] = useState(null)
    const [previewImage3, setPreviewImage3] = useState(null)
    const [previewImage4, setPreviewImage4] = useState(null)
    const [previewImage5, setPreviewImage5] = useState(null)

    const [mainImage, setMainImage] = useState(null)
    const [image2, setImage2] = useState(null)
    const [image3, setImage3] = useState(null)
    const [image4, setImage4] = useState(null)
    const [image5, setImage5] = useState(null)

    const [form, setForm] = useState({

        title: '',
        description: '',
    })

    const [isLoading, setIsLoading] = useState(false)

    const handleChange = (e) => {
        setForm({
            ...form,
            [e.target.name]: e.target.value
        });
    }

    const handleSubmit = useMutation(async (e) => {
        try {
            e.preventDefault();

            setIsLoading(true)
            const config = {
                headers: {
                    'Content-type': 'multipart/form-data',
                },
            };
            const formData = new FormData();
            console.log(mainImage)
            formData.set('main_image', !mainImage ? "" : mainImage)
            formData.set('image_2', !image2 ? "" : image2)
            formData.set('image_3', !image3 ? "" : image3)
            formData.set('image_4', !image4 ? "" : image4)
            formData.set('title', form.title);
            formData.set('description', form.description);
            console.log(formData)
            const response = await API.post(
                '/post/user', formData, config
            );
            setIsLoading(false)
            clearImageHolder()
            console.log(response)
        } catch (error) {
            console.log(error)
            setIsLoading(false)
        }
    })

    function urlConverter(file) {
        let url = URL.createObjectURL(file)
        return url
    }

    function clearImageHolder() {
        setPreviewMainImage(null)
        setPreviewImage2(null)
        setPreviewImage3(null)
        setPreviewImage4(null)
    }

    function setImageData(acceptedFiles) {
        clearImageHolder()
        acceptedFiles.forEach((file, index) => {
            switch (index) {
                case 0:
                    setPreviewMainImage(urlConverter(file))
                    setMainImage(file)
                    break;
                case 1:
                    setPreviewImage2(urlConverter(file))
                    setImage2(file)
                    break;
                case 2:
                    setPreviewImage3(urlConverter(file))
                    setImage3(file)
                    break;
                case 3:
                    setPreviewImage4(urlConverter(file))
                    setImage4(file)
                    break;
                default:
                    break;
            }
        });
    }
    return (
        <>



            <Container className="p-5">
                <Row className="px-5 d-flex justify-content-center align-items-start gap-4">
                    <Col>
                        <Dropzone onDrop={acceptedFiles => {
                            setImageData(acceptedFiles)
                        }}>
                            {({ getRootProps, getInputProps }) => (
                                <Col className="col d-grid rounded p-0 align-items-center rounded"  {...getRootProps()} style={style.mainProjectImage}>
                                    <Form.Control  {...getInputProps()} />
                                    <Image style={style.uploadIcon} className="m-auto" src="/upload.png" />
                                    <h2 style={{ color: "#1A2535" }} className="mt-5 d-flex justify-content-center">
                                        <span style={{ color: "#2FC4B2" }} className="me-2">Upload </span> Your Best Art
                                    </h2>
                                </Col>
                            )}
                        </Dropzone>

                        <Row md="6" className="d-flex gap-2 mt-3 justify-content-center p-0">

                            <Form.Label className="col rounded d-flex" style={style.subProjectImage}>
                                {!previewMainImage ?
                                    <Image style={style.plusIcon} className="m-auto" src="/plus 1.png" />
                                    :
                                    <Image className="m-auto p-0 w-100 rounded h-75" src={previewMainImage} />
                                }
                                <Form.Control
                                    type="file"
                                    name="main_image"
                                    onChange={(e) => { setPreviewMainImage(urlConverter(e.target.files[0])); setMainImage(e.target.files) }}
                                    hidden
                                />
                            </Form.Label>

                            <Form.Label className="col rounded d-flex" style={style.subProjectImage}>
                                {!previewImage2 ?
                                    <Image style={style.plusIcon} className="m-auto" src="/plus 1.png" />
                                    :
                                    <Image className="m-auto p-0 w-100 rounded h-75" src={previewImage2} />
                                }
                                <Form.Control
                                    type="file"
                                    name="image_2"
                                    onChange={(e) => { setPreviewImage2(urlConverter(e.target.files[0])); setImage2(e.target.files) }}
                                    hidden
                                />
                            </Form.Label>

                            <Form.Label className="col rounded d-flex" style={style.subProjectImage}>
                                {!previewImage3 ?
                                    <Image style={style.plusIcon} className="m-auto" src="/plus 1.png" />
                                    :
                                    <Image className="m-auto p-0 w-100 rounded h-75" src={previewImage3} />
                                }
                                <Form.Control
                                    type="file"
                                    name="image_3"
                                    onChange={(e) => { setPreviewImage3(urlConverter(e.target.files[0])); setImage3(e.target.files) }}
                                    hidden
                                />
                            </Form.Label>

                            <Form.Label className="col rounded d-flex" style={style.subProjectImage}>
                                {!previewImage4 ?
                                    <Image style={style.plusIcon} className="m-auto" src="/plus 1.png" />
                                    :
                                    <Image className="m-auto p-0 w-100 rounded h-75" src={previewImage4} />
                                }
                                <Form.Control
                                    type="file"
                                    name="image_4"
                                    onChange={(e) => { setPreviewImage4(urlConverter(e.target.files[0])); setImage4(e.target.files) }}
                                    hidden
                                />
                            </Form.Label>

                        </Row>
                    </Col>

                    <Col className="d-grid gap-4 py-5">
                        <Form.Control
                            className="main-input"
                            type="text"
                            onChange={handleChange}
                            placeholder="Title"
                            name="title"
                        />
                        <Form.Control
                            style={{ height: "198px" }}
                            className="main-input"
                            as="textarea"
                            onChange={handleChange}
                            placeholder="Description"
                            name="description"
                        />
                        <Row className="d-flex justify-content-center gap-4 mt-5">
                            <Button className='fw-bold' style={{ width: "150px", backgroundColor: "#E7E7E7", border: "none", color: "black" }}>Cancel</Button>

                            <Button onClick={(e) => handleSubmit.mutate(e)} className='fw-bold ' style={{ width: "150px", backgroundColor: "#2FC4B2", border: "none" }}>
                                {isLoading ?
                                    <LoadingSpinner />
                                    :
                                    <>Post</>
                                }
                            </Button>
                        </Row>
                    </Col>
                </Row>

            </Container>
        </>
    )
}