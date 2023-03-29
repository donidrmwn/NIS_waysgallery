import { useState } from 'react'
import { Button, Col, Container, Image, Row } from 'react-bootstrap'
import Brand from '../components/Brand/Brand'
import BrandImage from '../components/Brand/BrandImage'
import BrandLanding from '../components/Brand/BrandLanding'
import ModalLogin from '../components/Modals/ModalLogin'
import ModalRegister from '../components/Modals/ModalRegister'

export default function LandingPage() {

    const style = {
        vector1: {
            position: "absolute",
            width: "636px",
            height: "628px",
            left: "-90px",
            top: "-40px",

        },
        vector2: {
            position: "absolute",
            width: "468px",
            height: "428px",
            left: "0",
            bottom: "0",

        }
        ,
        vector3: {
            position: "absolute",
            width: "468px",
            height: "428px",
            right: "0",
            bottom: "0",

        }
    }

    const [showRegister, setShowRegister] = useState(false)
    const handleShowRegister = () => setShowRegister(true)
    const handleCloseRegister = () => setShowRegister(false)
    const handleSwitchRegister = () => {
        setShowRegister(false)
        setShowLogin(true)
    }

    const [showLogin, setShowLogin] = useState(false)
    const handleShowLogin = () => setShowLogin(true)
    const handleCloseLogin = () => setShowLogin(false)
    const handleSwitchLogin = () => {
        setShowLogin(false)
        setShowRegister(true)
    }
    return (
        <>
            <Container fluid="true">
                <Image src='/Vector 1.png' style={style.vector1} />
                <Image src='/Vector 2.png' style={style.vector2} />
                <Image src='/Vector 3.png' style={style.vector3} />
                <Row fluid="true" className='w-100 d-flex p-5 align-items-center p-5' style={{ zIndex: -1 }}>
                    <Col md="5" className='d-grid justify-content-center align-items-center ps-5'>
                        <Row>
                            <BrandLanding fontSize={"100px"} />
                            <BrandImage
                                top={"130px"}
                                width={"300px"}
                                left={"330px"}
                            />
                        </Row>
                        <Row className='mt-3'>
                            <p className='w-100' style={{ fontSize: "24px", fontWeight: "500" }}>show your work to inspire everyone</p>
                            <p className='w-75' style={{ fontSize: "17px", fontWeight: "400" }}>Ways Exhibition is a website design creators gather to share their work with other creators</p>
                        </Row>

                        <Col className='d-flex gap-3'>
                            <Button onClick={() => handleShowRegister()} className='fw-bold ' style={{ width: "150px", backgroundColor: "#2FC4B2", border: "none", zIndex: 1 }}>Join Now</Button>
                            <Button onClick={() => handleShowLogin()} className='fw-bold' style={{ width: "150px", backgroundColor: "#E7E7E7", border: "none", color: "black", zIndex: 1 }}>Login</Button>
                        </Col>

                    </Col>
                    <Col md="6" className='d-flex justify-content-center align-items-center'>
                        <Image className='w-100' src='/g10.png' />
                    </Col>
                </Row>
            </Container>

            <ModalRegister
                show={showRegister}
                onHide={handleCloseRegister}
                switchRegister={handleSwitchRegister}
            />

            <ModalLogin
                show={showLogin}
                onHide={handleCloseLogin}
                switchLogin={handleSwitchLogin}
            />
        </>
    )
}