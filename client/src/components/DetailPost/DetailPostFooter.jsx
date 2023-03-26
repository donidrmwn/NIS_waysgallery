import { Container } from "react-bootstrap";
import { useNavigate } from "react-router-dom";

export default function DetailPostFooter({ email, description, user }) {
   const navigate = useNavigate()
    return (
        <>
            <Container>
                <div className="d-flex gap-3">
                    <p className="fw-bold">👏 Say Hello</p>
                    <p className="fw-bold" onClick={() => navigate("/profile/" + user.id)} style={{ color: "#2FC4B2",cursor:"pointer" }}>{email}</p>
                </div>
                <div>
                    <p style={{ fontSize: "15px" }}>{description}</p>
                </div>
            </Container>
        </>
    )
}