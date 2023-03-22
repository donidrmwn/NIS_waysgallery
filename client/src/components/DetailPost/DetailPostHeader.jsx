import { Button, Col, Image, Row } from "react-bootstrap";

export default function DetailPostHeader() {
    const style = {

        roundedImage: {
            borderRadius: "100%",
            width: "60px",
            heigth: "60px",
        }
    }
    return (
        <>
            <Row className="d-flex align-items-center mb-3">
                <Col className="d-flex justify-content-start">
                    <Image style={style.roundedImage} className="m-auto me-4" src={`${"/profile.png"}`} />
                    <Col>
                        <p className="m-auto fw-bold">Robo-x landing Page</p>
                        <p className="m-auto">Geralt</p>
                    </Col>
                </Col>
                <Col className="d-flex gap-4 justify-content-end">
                    <Button className='fw-bold h-75' style={{ width: "100px", backgroundColor: "#E7E7E7", border: "none", color: "black"}}>Follow</Button>
                    <Button className='fw-bold h-75' style={{ width: "100px", backgroundColor: "#2FC4B2", border: "none", zIndex: 1 }}>Hire</Button>
                </Col>
            </Row>
        </>
    )
}