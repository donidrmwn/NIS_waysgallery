import { Container } from "react-bootstrap";

export default function DetailPostFooter({ email, description }) {
    return (
        <>
            <Container>
                <div className="d-flex gap-3">
                    <p className="fw-bold">👏 Say Hello</p>
                    <p className="fw-bold" style={{ color: "#2FC4B2" }}>{email}</p>
                </div>
                <div>
                    <p style={{ fontSize: "15px" }}>{description}</p>
                </div>
            </Container>
        </>
    )
}