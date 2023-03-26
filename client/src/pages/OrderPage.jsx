import { useEffect, useState } from "react";
import { Button, Col, Container, Dropdown, DropdownButton, Image, Row, Table } from "react-bootstrap";
import { useQuery } from "react-query";
import { API } from "../config/api";
import LoadingSpinner from '../components/LoadingSpinner';
import { ConvertFormatOnlyDate } from "../utils/ConvertFormatDate";
import ModalOrderDetail from "../components/Modals/ModalOrderDetail";

export default function OrderPage() {
    const [titleDropDown, setTitleDropDown] = useState("My Order")
    const [isLoading, setIsLoading] = useState(true)
    const [columnName, setColumnName] = useState("Vendor")
    const [endPoint, setEndPoint] = useState("/order/my-order")
    const [showModalOrderDetail,setShowModalOrderDetail] = useState(false)
    const [orderDetail,setOrderDetail] = useState(null)
    const handleShowModalOrderDetail = (orderDetail) => {
        setShowModalOrderDetail(true)
        setOrderDetail(orderDetail)
    }
    const handleCloseModalOrderDetail = () => {
        setShowModalOrderDetail(false)
    }
    let { data: orders, refetch } = useQuery("ordersCache", async () => {
        const response = await API.get(endPoint);
        setIsLoading(false)
        return response.data;
    })

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
            {isLoading ? <LoadingSpinner /> :
                <>
                    {console.log(orders.data)}

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
                                            <td>
                                                {getStatus(item.status)}
                                            </td>
                                            <td className="d-flex justify-content-center">
                                                {
                                                    titleDropDown == "My Offer" ?
                                                        <div className="d-flex gap-3">
                                                            <Button variant="danger" className="fw-bold d-flex justify-content-center align-items-center" style={{ width: "80px", height: "27px", fontSize: "13px" }}>Cancel</Button>
                                                            <Button variant="success" className="fw-bold d-flex justify-content-center align-items-center" style={{ width: "80px", height: "27px", fontSize: "13px" }}>Approve</Button>
                                                        </div>
                                                        :
                                                        <Image
                                                            style={{ width: "30px", height: "30px" }}
                                                            src={`${item.status}.png`}
                                                        />
                                                }
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
            />
        </>
    )
}