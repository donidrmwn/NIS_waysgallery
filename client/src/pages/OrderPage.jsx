import { Col, Container, Dropdown, DropdownButton, Row, Table } from "react-bootstrap";

export default function OrderPage() {
    return (
        <>
            <style type="text/css">
                {`.btn-flat {
                background-color: #E7E7E7;
                color: black;
                padding: 8px 45px
                }`}
            </style>
            <Container className="m-auto">
                <Row className='d-flex'>
                    <Col>
                        <DropdownButton variant="flat" id="dropdown-basic-button" title="My Order">
                            <Dropdown.Item href="#/action-1">My Order</Dropdown.Item>
                            <Dropdown.Item href="#/action-2">My Offer</Dropdown.Item>
                        </DropdownButton>
                    </Col>
                </Row>
                <Row>
                    <Table style={{ fontSize: "14px" }} className='mt-4' striped bordered hover>
                        <thead>
                            <tr>
                                <th style={{ width: "72px" }}>No</th>
                                <th style={{ width: "183px" }}>Vendor</th>
                                <th style={{ width: "185px" }}>Order</th>
                                <th style={{ width: "188px" }}>Start Project</th>
                                <th style={{ width: "191px" }}>End Project</th>
                                <th style={{ width: "160px" }}>Status</th>
                                <th style={{ width: "191px",textAlign:"center" }}>Action</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr>
                                <td>1</td>
                                <td>Geralt</td>
                                <td>Landing Design</td>
                                <td>20 December 2020</td>
                                <td>28 December 2021</td>
                                <td>Waiting Accept</td>
                                <td style={{textAlign:"center"}}>waiting</td>
                            </tr>
                            <tr>
                                <td>2</td>
                                <td>Sugeng No Pants</td>
                                <td>Redesign</td>
                                <td>20 December 2020</td>
                                <td>28 December 2021</td>
                                <td>Success</td>
                                <td style={{textAlign:"center"}}>success</td>
                            </tr>
                            <tr>
                                <td>3</td>
                                <td>Union</td>
                                <td>Make Layouting</td>
                                <td>20 December 2020</td>
                                <td>28 December 2021</td>
                                <td>Cancel</td>
                                <td style={{textAlign:"center"}}>cancel</td>
                            </tr>
                            <tr>
                                <td>4</td>
                                <td>Boy</td>
                                <td>Full UI & UX Design</td>
                                <td>20 December 2020</td>
                                <td>28 December 2021</td>
                                <td>Project is Complete</td>
                                <td style={{textAlign:"center"}}>complete</td>
                            </tr>
                        </tbody>
                    </Table>
                </Row>
            </Container>
        </>
    )
}