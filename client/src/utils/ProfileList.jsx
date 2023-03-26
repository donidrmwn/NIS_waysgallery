import { Image, Row, Col } from 'react-bootstrap'
export default function ProfileList() {
    const style = {
        roundedImage: {
            borderRadius: "100%",
            width: "60px",
            heigth: "60px",
        }
    }
    return (
        <>
            <Row className='mt-4 mb-4 m-auto'>
                <Col  md="2">
                    <Image style={style.roundedImage} className="m-auto me-4" src={`${"/user 1.png"}`} />
                </Col>
                <Col>
                    <p className="fw-bold">email@mail.com</p>
                    <p>Nama Lengkap</p>
                </Col>
            </Row>
            <hr />
            <Row className='mt-4  mb-4 m-auto'>
                <Col md="2">
                    <Image style={style.roundedImage} className="m-auto me-4" src={`${"/user 1.png"}`} />
                </Col>
                <Col>
                    <p className="fw-bold">email@mail.com</p>
                    <p>Nama Lengkap</p>
                </Col>
            </Row>
            <hr />

        </>
    )
}