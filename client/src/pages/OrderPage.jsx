import { useEffect, useState } from "react";
import { Button, Col, Container, Dropdown, DropdownButton, Image, Row, Table } from "react-bootstrap";
import { useMutation, useQuery } from "react-query";
import { API } from "../config/api";
import LoadingSpinner from '../components/LoadingSpinner';
import { ConvertFormatOnlyDate } from "../utils/ConvertFormatDate";
import ModalOrderDetail from "../components/Modals/ModalOrderDetail";
import { useNavigate } from "react-router-dom";
import ModalViewProject from "../components/Modals/ModalViewProject";

export default function OrderPage() {

    const navigate = useNavigate()
    const [titleDropDown, setTitleDropDown] = useState("My Order")
    const [isLoading, setIsLoading] = useState(true)
    const [columnName, setColumnName] = useState("Vendor")
    const [endPoint, setEndPoint] = useState("/order/my-order")
    const [showModalOrderDetail, setShowModalOrderDetail] = useState(false)
    const [orderDetail, setOrderDetail] = useState(null)
    const [showModalViewProject, setShowModalViewProject] = useState(false)

    const handleShowModalOrderDetail = (orderDetail) => {
        setShowModalOrderDetail(true)
        setOrderDetail(orderDetail)
    }

    const handleShowModalViewProject = (orderDetail) => {
        setShowModalViewProject(true)
        setOrderDetail(orderDetail)
    }
    const handleCloseModalViewProject = () => {
        setShowModalViewProject(false)
    }

    const handleCloseModalOrderDetail = () => {
        setShowModalOrderDetail(false)
    }
    let { data: orders, refetch } = useQuery("ordersCache", async () => {
        const response = await API.get(endPoint);
        setIsLoading(false)
        return response.data;
    },
        // {
        //   refetchInterval: ,
        // } 
    )

    const handleMyOrder = () => {
        setTitleDropDown("My Order")
        setEndPoint("/order/my-order")
        setColumnName("Vendor")
    }
    const handleMyOffer = () => {
        setTitleDropDown("My Offer")
        setEndPoint("/order/my-offer")
        setColumnName("Client")
    }

    useEffect(() => {
        refetch()

    }, [endPoint, titleDropDown])


    const getStatus = (status) => {
        switch (status) {
            case "waiting":
                return <p className="m-auto" style={{ color: "#FF9900" }}>Waiting Accept</p>
            case "success":
                return <p className="m-auto" style={{ color: "#78A85A" }}>Success</p>
            case "cancel":
                return <p className="m-auto" style={{ color: "#E83939" }}>Cancel</p>
            case "accept":
                return <p className="m-auto" style={{ color: "#00D1FF" }}>On Progress</p>
            case "finished":
                return <p className="m-auto" style={{ color: "#00D1FF" }}>Finished</p>
            default:
                break;
        }
    }

    const GetAction = ({ item, status, id, endPoint }) => {

        const handleStatus = useMutation(async (status) => {
            try {
                console.log(status)

                const config = {
                    headers: {
                        'Content-type': 'application/json',
                    }
                };
                const data = {
                    status: status
                }
                const body = JSON.stringify(data)
                const response = await API.patch(endPoint + id, body, config);
                refetch()
            
            } catch (error) {
                console.log(error)
            }
        })


        switch (status) {

            case "waiting":
                return titleDropDown == "My Order" ?
                    <Image
                        style={{ width: "30px", height: "30px" }}
                        src={`${status}.png`}
                    /> :
                    <div className="d-flex gap-3">
                        <Button onClick={() => handleStatus.mutate("cancel")}
                            variant="danger" className="fw-bold d-flex justify-content-center align-items-center" style={{ width: "80px", height: "27px", fontSize: "13px" }}>
                            Cancel</Button>
                        <Button onClick={() => handleStatus.mutate("accept")}
                            variant="success" className="fw-bold d-flex justify-content-center align-items-center" style={{ width: "80px", height: "27px", fontSize: "13px" }}>
                            Approve</Button>
                    </div>

            case "cancel":
                return <Image style={{ width: "30px", height: "30px" }} src={`${status}.png`} />

            case "accept":
                return titleDropDown == "My Order" ?
                    <Button disabled variant="success" className="fw-bold d-flex justify-content-center align-items-center" style={{ width: "120px", height: "27px", fontSize: "13px" }}>View Project</Button>
                    :
                    <Button onClick={() => navigate("/send-project/" + id)} variant="success" className="fw-bold d-flex justify-content-center align-items-center" style={{ width: "120px", height: "27px", fontSize: "13px" }}>Send Project</Button>

            case "finished":
                return titleDropDown == "My Order" ?
                    <Button onClick={() => handleShowModalViewProject(item)} variant="success" className="fw-bold d-flex justify-content-center align-items-center" style={{ width: "120px", height: "27px", fontSize: "13px" }}>View Project</Button>
                    :
                    <Button disabled variant="success" className="fw-bold d-flex justify-content-center align-items-center" style={{ width: "120px", height: "27px", fontSize: "13px" }}>Send Project</Button>
            case "success":
                return <Image style={{ width: "30px", height: "30px" }} src={`${status}.png`} />
            default:
                break;
        }
    }



    return (
        <>
            <style type="text/css">
                {`.btn-flat {
                background-color: #E7E7E7;
                color: black;
                padding: 8px 45px
                }`}
            </style>
            {isLoading ?
                <div className='m-auto d-flex justify-content-center align-items-center vh-100'>
                    <LoadingSpinner />
                </div> :
                <>
                    <Container className="m-auto vh-100">
                        <Row className='d-flex'>
                            <Col>
                                <DropdownButton variant="flat" id="dropdown-basic-button" title={titleDropDown}>
                                    <Dropdown.Item onClick={handleMyOrder}>My Order</Dropdown.Item>
                                    <Dropdown.Item onClick={handleMyOffer}>My Offer</Dropdown.Item>
                                </DropdownButton>
                            </Col>
                        </Row>
                        <Row>
                            <Table style={{ fontSize: "14px" }} className='mt-4' striped bordered hover>
                                <thead>
                                    <tr>
                                        <th style={{ width: "72px" }}>No</th>
                                        <th style={{ width: "183px" }}>{columnName}</th>
                                        <th style={{ width: "185px" }}>Order</th>
                                        <th style={{ width: "188px" }}>Start Project</th>
                                        <th style={{ width: "191px" }}>End Project</th>
                                        <th style={{ width: "160px" }}>Status</th>
                                        <th style={{ width: "191px", textAlign: "center" }}>Action</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {orders.data?.map((item, index) => (
                                        <tr key={index}>
                                            <td>{index + 1}</td>
                                            <td>
                                                {
                                                    titleDropDown == "My Order" ?
                                                        item.vendor_user?.profile?.name
                                                        :
                                                        item.client_user?.profile?.name
                                                }
                                            </td>
                                            <td onClick={() => handleShowModalOrderDetail(item)} style={{ color: "#0D33B9", cursor: "pointer" }}>{item.title}</td>
                                            <td>{ConvertFormatOnlyDate(item.start_date)}</td>
                                            <td>{ConvertFormatOnlyDate(item.end_date)}</td>
                                            <td >
                                                {getStatus(item.status)}
                                            </td>
                                            <td className="d-flex justify-content-center">
                                                {/* {getAction(item.status, item.id)} */}
                                                <GetAction
                                                    item={item}
                                                    status={item.status}
                                                    id={item.id}
                                                    endPoint={"/order/my-offer/"}
                                                />
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </Table>
                        </Row>
                    </Container>
                </>
            }
            <ModalOrderDetail
                show={showModalOrderDetail}
                onHide={handleCloseModalOrderDetail}
                orderDetail={orderDetail}
                getStatus={getStatus}
                titleDropDown={titleDropDown}
                refetch={refetch}
            />
            <ModalViewProject
                orderDetail={orderDetail}
                show={showModalViewProject}
                onHide={handleCloseModalViewProject}
                
            />
        </>
    )
}