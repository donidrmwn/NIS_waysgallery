import { useEffect, useState } from 'react';
import { Button, Col, Container, Dropdown, DropdownButton, Form, Image, Row } from 'react-bootstrap'

import { useQuery } from 'react-query';
import { useNavigate } from 'react-router-dom';
import TabbedSearch from '../components/Home/TabbedSearch';
import LoadingSpinner from '../components/LoadingSpinner';

import { API } from '../config/api';
import Gallery from '../utils/Gallery';
export default function HomePage() {
    const navigate = useNavigate()
    const [isLoading, setIsLoading] = useState(true)
    const [titleDropDown, setTitleDropDown] = useState("Today")
    const [endPoint, setEndPoint] = useState("/post/today?limit=" + 10)
    const [showLimit, setShowLimit] = useState(10)
    const [searchPostName, setSearchPostName] = useState(null)


    let { data: posts, refetch } = useQuery("postsCache", async () => {
        const response = await API.get(endPoint);
        setIsLoading(false)
        return response.data;
    })

    let { data: profiles, refetch: refetchProfile } = useQuery("profileSearchCache", async () => {
        const response = await API.get("/profile/search?profile_name=" + searchPostName)
        return response.data
    })

    const handleShowToday = () => {
        setSearchPostName("")
        setTitleDropDown("Today")
        setEndPoint("/post/today?limit=" + 10)
    }

    const handleShowAll = () => {
        setSearchPostName("")
        setTitleDropDown("Show All")
        setEndPoint("/post/all?limit=" + 10)
    }

    const handleFollowed = () => {
        setSearchPostName("")
        setTitleDropDown("Followed")
        setEndPoint("/post/followed?limit=" + 10)
    }

    useEffect(() => {
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
    }, [showLimit])

    useEffect(() => {
        if (searchPostName != "") {
            setEndPoint("/post/search?post_name=" + searchPostName)
            refetchProfile()
        }
        else {
            if (titleDropDown == "Show All") {
                setEndPoint("/post/all?limit=" + 10)
            } else if (titleDropDown == "Today") {
                setEndPoint("/post/today?limit=" + 10)
            } else if (titleDropDown == "Followed") {
                setEndPoint("/post/followed?limit=" + 10)
            }
        }
    }, [searchPostName])

    useEffect(() => {
        if (searchPostName) {
            handleShowToday()
        }
    }, [])
    return (
        <>
            <style type="text/css">
                {`.btn-flat {
                background-color: #E7E7E7;
                color: black;
                padding: 8px 45px
                }`}
            </style>

            <Container className='vh-100'>
                <Row className='d-flex'>
                    <Col>
                        <DropdownButton variant="flat" id="dropdown-basic-button" title={titleDropDown}>
                            <Dropdown.Item onClick={handleShowToday}>Today</Dropdown.Item>
                            <Dropdown.Item onClick={handleShowAll}>Show All</Dropdown.Item>
                            <Dropdown.Item onClick={handleFollowed}>Followed</Dropdown.Item>
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
                                    name="product_name"
                                    onChange={(e) => { setSearchPostName(e.target.value) }}
                                    type='text'
                                    placeholder='Search'
                                />
                            </Form.Label>
                        </Form>
                    </Col>
                </Row>
                <h3 className='my-5'>

                    {
                        searchPostName ?
                            <p>Search</p> :
                            titleDropDown == "Today" ?
                                <p>Today's post</p> :
                                titleDropDown == "Show All" ?
                                    <p>All post</p>
                                    : titleDropDown == "Followed" ?
                                        <p>Followed</p>
                                        : null
                    }
                </h3>
                {isLoading ?
                    <div className='m-auto d-flex justify-content-center align-items-center vh-100'>
                        <LoadingSpinner />
                    </div>
                    :
                    <>
                        {!searchPostName ?
                            <>
                                {posts.data.length <= 0 ? <p>There's nothing to show. Click <span onClick={() => navigate("/upload")} className='fw-bold' style={{ cursor: "pointer" }}> here </span> to be the first one to post !</p>
                                    : <>
                                        <Gallery data={posts} />
                                        <div className='m-auto d-flex justify-content-center align-items-center'>
                                            <Button
                                                style={{ backgroundColor: "#2FC4B2", border: "none", zIndex: 1 }}
                                                onClick={() => setShowLimit(showLimit + 10)}
                                                className='my-5 fs-3 px-5 fw-bold'>
                                                Show More
                                            </Button>
                                        </div>
                                    </>
                                }
                            </>
                            :
                            <>
                                <TabbedSearch
                                    posts={posts}
                                    profiles={profiles}
                                />
                            </>
                        }
                    </>
                }

            </Container>
        </>
    )
}