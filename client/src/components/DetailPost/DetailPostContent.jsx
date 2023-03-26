import { useState } from "react";
import { Card, Col, Container, Image, Row } from "react-bootstrap";

export default function DetailPostContent({ photos }) {
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

    const photo = photos && photos[0].photo
    return (
        <>
            <Container>
                <Row className="d-flex mt-4 justify-content-center">
                    <Image style={style.mainImage} src={photo} />
                </Row>

                <Row md="4" className="w-100 d-flex gap-3 justify-content-center  mt-4 mb-5 p-2">
                    {photos?.map((item, index) => {
                        if (index == 0) {
                            return (null)
                        }
                        else {
                            return (
                                <Col key={index}>
                                    {item?.photo &&
                                        <Card.Img variant="top" style={style.cardImage} src={item?.photo} />
                                    }
                                </Col>
                            )
                        }
                    })}

                </Row>
            </Container>
        </>
    )
}