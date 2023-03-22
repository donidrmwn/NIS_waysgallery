import { useState } from "react";
import { Card, Col, Container, Image, Row } from "react-bootstrap";

export default function DetailPostContent() {
    const style = {
        mainImage: {
            width: "729px",
            height: "545px"
        },
        cardImage: {
            width: "150px",
            height: "100px"
        }
    }

    const [showImage] = useState("/sample Image/Rectangle 10.png")
    return (
        <>
            <Container>
                <Row className="d-flex mt-4 justify-content-center">
                    <Image style={style.mainImage} src={showImage} />
                </Row>

                <Row md="4" className="w-100 d-flex gap-3 justify-content-center  mt-4 mb-5 p-2">
                    <Col>
                        <Card.Img variant="top" style={style.cardImage} src="/sample Image/Rectangle 10.png" />
                    </Col>
                    <Col>
                        <Card.Img variant="top" style={style.cardImage} src="/sample Image/Rectangle 10.png" />
                    </Col>
                    <Col>
                        <Card.Img variant="top" style={style.cardImage} src="/sample Image/Rectangle 10.png" />
                    </Col>
                </Row>
            </Container>
        </>
    )
}