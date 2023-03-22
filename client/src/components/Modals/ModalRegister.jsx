import Register from "../Auth/Register";
import {Modal} from "react-bootstrap"
export default function ModalRegister(props) {
    return(
        <Modal show={props.show} onHide={props.onHide} centered>
            <Modal.Body>
                <Register switchRegister={props.switchRegister}/>
            </Modal.Body>
        </Modal>
    )
}