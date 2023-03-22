import { Col, Row } from 'react-bootstrap'


export default function Brand(props) {
    return (
        <>
            <div className='d-grid'>
                <Row>
                    <Col md="3">
                        <Row className='d-flex positon-relative align-items-center '>
                            <h1 style={{ fontSize: props.fontSize }} className='brand m-0  d-flex'>Ways
                            {/* <BrandImage  /> */}
                            </h1>
                        </Row>
                        <Row className='d-flex'>
                            <h1 className='brand' style={{ color: "#2FC4BD", fontSize: props.fontSize }}>Gallery</h1>
                        </Row>
                    </Col>

                </Row>

            </div>
        </>
    )
}