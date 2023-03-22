import { Alert, Modal } from "react-bootstrap";

export default function ModalSuccessOffer(props) {
    return (
        <Modal className="modal-xl" show={props.show} onHide={props.onHide} centered>
            <Modal.Body className=" m-auto p-0 w-100">
                <Alert className="w-100 m-auto fs-1" style={{ textAlign: "center" }} variant="success">
                    We have sent your offer, please wait for the user to accept it
                </Alert>
            </Modal.Body>
        </Modal>

    )
}