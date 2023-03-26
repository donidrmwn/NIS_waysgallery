import { Button, Container, Image, Modal } from "react-bootstrap";
import { useNavigate } from "react-router-dom";

export default function ModalViewProject(props) {
    const orderDetail = props.orderDetail
    const navigate = useNavigate()
    return (
        <Modal className="modal-xl " show={props.show} onHide={props.onHide} centered>
            <Modal.Body className=" m-auto p-5 w-100" >
                <Container fluid className="d-grid ">
                    <Image className="w-100 mb-5" src={orderDetail?.photo_projects[0]?.photo_project} />
                    <Button onClick={() => navigate("/project-detail/"+orderDetail?.id)} variant="success" className="w-25 m-auto py-2">
                        Show More Detail
                    </Button>
                </Container>
            </Modal.Body>
        </Modal>
    )
}