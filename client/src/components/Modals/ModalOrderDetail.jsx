import { Button, Modal } from "react-bootstrap";
import { ConvertFormatRupiah } from "../../utils/ConvertFormatRupiah";
export default function ModalOrderDetail(props) {
    const orderDetail = props.orderDetail
    return (
        <Modal className="modal-l p-5" show={props.show} onHide={props.onHide} centered>
            <Modal.Title className="mx-2">
                <p>Title : {orderDetail?.title}</p>
            </Modal.Title>
            <Modal.Body>
                <p>Description : {orderDetail?.description}</p>
                <p style={{ color: "#00E016" }}>Price : {ConvertFormatRupiah(orderDetail?.price)}</p>
            </Modal.Body>
            <Modal.Footer className="d-flex justify-content-end">
                {orderDetail?.status == "waiting" ?
                    <>
                        {

                            props.titleDropDown == "My Order" ?
                                <>
                                    {props.getStatus(orderDetail?.status)}
                                </>
                                :
                                <>
                                    <Button variant="danger" className="fw-bold d-flex justify-content-center align-items-center" style={{ width: "80px", height: "27px", fontSize: "13px" }}>Cancel</Button>
                                    <Button variant="success" className="fw-bold d-flex justify-content-center align-items-center" style={{ width: "80px", height: "27px", fontSize: "13px" }}>Approve</Button>
                                </>
                        }

                    </>
                    :
                    <>
                        {props.getStatus(orderDetail?.status)}
                    </>
                }

            </Modal.Footer>
        </Modal>
    )
}