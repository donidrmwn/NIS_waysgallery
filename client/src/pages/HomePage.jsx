import { useState } from 'react';
import { Col, Container, Dropdown, DropdownButton, Form, Image, Row } from 'react-bootstrap'
import PhotoAlbum from "react-photo-album";
import { useQuery } from 'react-query';
import LoadingSpinner from '../components/LoadingSpinner';
import photos from '../components/photos/photos';
import { API } from '../config/api';
import Gallery from '../utils/Gallery';
export default function HomePage() {
    const [isLoading, setIsLoading] = useState(false)
    const [titleDropDown, setTitleDropDown] = useState("Today")
    let { data: posts } = useQuery("postsCache", async () => {
        setIsLoading(true)
        const response = await API.get("/post/today");
        setIsLoading(false)
        return response.data;
    })
    return (
        <>
            <style type="text/css">
                {`.btn-flat {
                background-color: #E7E7E7;
                color: black;
                padding: 8px 45px
                }`}
            </style>

            <Container>
                <Row className='d-flex'>
                    <Col>
                        <DropdownButton variant="flat" id="dropdown-basic-button" title={titleDropDown}>
                            <Dropdown.Item onClick={() => setTitleDropDown("Today")}>Today</Dropdown.Item>
                            <Dropdown.Item onClick={() => setTitleDropDown("Following")}>Following</Dropdown.Item>
                            <Dropdown.Item onClick={() => setTitleDropDown("Show All")}>Show All</Dropdown.Item>
                            {/* <Dropdown.Item href="#/action-3">Something else</Dropdown.Item> */}
                        </DropdownButton>
                    </Col>
                    <Col className='d-flex justify-content-end'>
                        <Form >
                            <Form.Label
                                style={{ backgroundColor: "#E7E7E7" }}
                                className='rounded px-4 py-1 d-flex gap-2 d-flex align-items-center'>
                                <Image style={{ width: "30px", height: "30px" }} src='/search.png' />
                                <Form.Control
                                    className='shadow-none w-100'
                                    style={{
                                        border: "none",
                                        backgroundColor: "#E7E7E7"
                                    }}
                                    type='text'
                                    placeholder='Search'
                                />
                            </Form.Label>
                        </Form>
                    </Col>
                </Row>
                <h3 className='my-5'>today's post</h3>
                {isLoading ?
                    <div className='m-auto d-flex justify-content-center align-items-center'>
                        <LoadingSpinner />
                    </div>
                    :
                    <>
                        <Gallery data={posts} />
                        <div className='m-auto d-flex justify-content-center align-items-end'>
                            {titleDropDown == "Show All" ? <p style={{cursor:"pointer"}}>show more...</p> : null}
                        </div>
                    </>
                }

            </Container>
        </>
    )
}