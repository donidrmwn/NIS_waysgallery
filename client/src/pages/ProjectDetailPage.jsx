import { useState } from 'react';
import { Button, Card, Col, Container, Image, Row } from 'react-bootstrap'
import { useMutation, useQuery } from 'react-query';
import { useNavigate, useParams } from 'react-router-dom';
import { API } from '../config/api';
import LoadingSpinner from "../components/LoadingSpinner";
export default function ProjectDetail() {
    const style = {
        cardImage: {
            width: "150px",
            height: "100px"
        }
    }
    const navigate = useNavigate()
    let { id } = useParams();
    const [isLoading, setIsLoading] = useState(true)
    let { data: projectDetail } = useQuery("projectDetailCache", async () => {
        const response = await API.get("/order/finished-project/" + id);
     
        setIsLoading(false)

        return response.data.data;
    })

    let { refetch } = useQuery("ordersCache", async () => {
        const response = await API.get("/order/my-order");
        setIsLoading(false)
        return response.data;
    },
        // {
        //   refetchInterval: ,
        // } 
    )

    function openImage() {

        let alink = document.createElement('a');
        projectDetail?.photo_projects?.map((element, index) => {
            if (element.photo_project) {
                alink.href = element.photo_project;
                alink.target = "_blank"
                alink.click();
            }
        });
    }
    const handleStatus = useMutation(async (status) => {
        try {

            setIsLoading(true)
            const config = {
                headers: {
                    'Content-type': 'application/json',
                }
            };
            const data = {
                status: status
            }
            const body = JSON.stringify(data)
            await API.patch("/order/my-order/" + projectDetail?.id, body, config);

            refetch()
            setIsLoading(false)
            navigate("/order")

        } catch (error) {
            console.log(error)
        }
    })

    return (
        <>

            {isLoading ?
                <div className='m-auto d-flex justify-content-center align-items-center vh-100'>
                    <LoadingSpinner />
                </div>
                :
                <Container className='mt-5 vh-100'>
                    <Row>
                        <Col>
                            <Row>
                                <Image className='w-100' src={projectDetail?.photo_projects[0].photo_project} />
                            </Row>
                            <Row className="d-flex mt-4 mb-5 p-2">
                                {projectDetail?.photo_projects.map((item, index) => {
                                    if (index == 0) {
                                        return (null)
                                    }
                                    else {
                                        return (
                                            <Col key={index}>
                                                {item?.photo_project &&
                                                    <Card.Img variant="top" style={style.cardImage} src={item?.photo_project} />
                                                }
                                            </Col>
                                        )
                                    }
                                })}
                            </Row>
                        </Col>
                        <Col md="5" className='d-flex flex-column justify-content-start '>
                            <p className='m-0 mb-5' style={{ height: "500px", overflow: "auto" }}>
                                {projectDetail?.description_project}
                            </p>
                            {projectDetail?.status == "success" ?
                                <Button onClick={() => { openImage() }} className='fw-bold ' style={{ width: "200px", backgroundColor: "#2FC4B2", border: "none" }}>Download Project</Button>
                                :
                                <Button onClick={() => { handleStatus.mutate("success"); openImage() }} className='fw-bold ' style={{ width: "150px", backgroundColor: "#2FC4B2", border: "none" }}>Accept Project</Button>
                            }   

                        </Col>
                    </Row>

                </Container>
            }
        </>
    )
}