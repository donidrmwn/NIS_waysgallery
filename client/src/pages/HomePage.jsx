import { useEffect, useState } from 'react';
import { Button, Col, Container, Dropdown, DropdownButton, Form, Image, Row } from 'react-bootstrap'
import PhotoAlbum from "react-photo-album";
import { useQuery } from 'react-query';
import LoadingSpinner from '../components/LoadingSpinner';
import photos from '../components/photos/photos';
import { API } from '../config/api';
import Gallery from '../utils/Gallery';
export default function HomePage() {
    const [isLoading, setIsLoading] = useState(true)
    const [titleDropDown, setTitleDropDown] = useState("Today")
    const [endPoint, setEndPoint] = useState("/post/today?limit=" + 10)
    const [showLimit, setShowLimit] = useState(10)
    let { data: posts, refetch } = useQuery("postsCache", async () => {

        const response = await API.get(endPoint);
        setIsLoading(false)
        return response.data;
    })

    const handleShowToday = () => {
        setTitleDropDown("Today")
        setEndPoint("/post/today?limit=" + 10)
    }
    const handleShowAll = () => {
        setTitleDropDown("Show All")
        setEndPoint("/post/all?limit=" + 10)
    }
    const handleFollowed = () => {
        setTitleDropDown("Followed")
        setEndPoint("/post/followed?limit=" + 10)
    }

    useEffect(() => {
        // setIsLoading(true)
        
        refetch()
       
    }, [endPoint, titleDropDown])


    useEffect(() => {
        if (titleDropDown == "Show All") {
            setEndPoint("/post/all?limit=" + showLimit)
        } else if (titleDropDown == "Today") {
            setEndPoint("/post/today?limit=" + showLimit)
        } else if (titleDropDown == "Followed") {
            setEndPoint("/post/followed?limit=" + showLimit)
        }
        
    }, [showLimit, titleDropDown])

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
                            <Dropdown.Item onClick={handleShowToday}>Today</Dropdown.Item>
                            <Dropdown.Item onClick={handleShowAll}>Show All</Dropdown.Item>
                            <Dropdown.Item onClick={handleFollowed}>Followed</Dropdown.Item>
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
                <h3 className='my-5'>

                    {titleDropDown == "Today" ?
                        <p>Today's post</p> :
                        titleDropDown == "Show All" ?
                            <p>All post</p>
                            : null
                    }

                </h3>
                {isLoading ?
                    <div className='m-auto d-flex justify-content-center align-items-center'>
                        <LoadingSpinner />
                    </div>
                    :
                    <>
                        <Gallery data={posts} />
                        <div className='m-auto d-flex justify-content-center align-items-end'>
                            <Button
                                style={{ backgroundColor: "#2FC4B2", border: "none", zIndex: 1 }}
                                onClick={() => setShowLimit(showLimit + 10)}
                                className='my-5 fs-3 px-5 fw-bold'>
                                Show More
                            </Button>
                        </div>
                    </>
                }

            </Container>
        </>
    )
}