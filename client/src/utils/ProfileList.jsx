import { Image, Row, Col, Container } from 'react-bootstrap'
import { useNavigate } from 'react-router-dom'
export default function ProfileList({ profiles }) {
    const style = {
        roundedImage: {
            borderRadius: "100%",
            width: "60px",
            heigth: "60px",
        }
    }
    const navigate = useNavigate()
    return (
        <Container className='m-auto '>
            {profiles?.data?.map((item, index) => {
                return (
                    <div onClick={() => navigate("/profile/"+item.user_id)} style={{cursor:"pointer"}} key={index}>
                        <Row className='mt-4 mb-4 m-auto'>
                            <Col md="2">
                                <Image style={style.roundedImage} className="m-auto me-4" src={`${item.profile_picture}`} />
                            </Col>
                            <Col>
                                <p>{item.name}</p>
                                <p>{item.greeting}</p>
                            </Col>
                        </Row>
                        <hr />
                    </div>
                )
            })}


        </Container>
    )
}