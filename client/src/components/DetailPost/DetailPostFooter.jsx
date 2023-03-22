import { Container } from "react-bootstrap";

export default function DetailPostFooter() {
    return (
        <>
            <Container>
                <div className="d-flex gap-3">
                    <p className="fw-bold">👏 Yippie</p>
                    <p className="fw-bold" style={{ color: "#2FC4B2" }}>geralt@gmail.com</p>
                </div>
                <div>
                    <p  style={{fontSize:"15px"}}>Super excited to share my new web app interface and elements that I recently worked on. Hope you enjoyed it. Thanks for your likes and comments!</p>
                </div>
            </Container>
        </>
    )
}