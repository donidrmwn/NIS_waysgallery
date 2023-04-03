
import {Modal} from "react-bootstrap"
import Login from "../Auth/Login";
export default function ModalLogin(props) {
    return(
        <Modal className="modal-xs" show={props.show} onHide={props.onHide} centered>
            <Modal.Body>
                <Login switchLogin={props.switchLogin} onHide={props.onHide}/>
            </Modal.Body>
        </Modal>
    )
}