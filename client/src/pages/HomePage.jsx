import { Col, Container, Dropdown, DropdownButton, Form, Image, Row } from 'react-bootstrap'
import PhotoAlbum from "react-photo-album";
import photos from '../components/photos/photos';
import Gallery from '../utils/Gallery';
export default function HomePage() {
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
                        <DropdownButton variant="flat" id="dropdown-basic-button" title="Today">
                            <Dropdown.Item href="#/action-1">Today</Dropdown.Item>
                            <Dropdown.Item href="#/action-2">Another action</Dropdown.Item>
                            <Dropdown.Item href="#/action-3">Something else</Dropdown.Item>
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
                <Gallery data={photos}/>
            </Container>
        </>
    )
}