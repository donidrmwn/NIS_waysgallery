import { Container  } from "react-bootstrap";
import DetailPostContent from "../components/DetailPost/DetailPostContent";
import DetailPostFooter from "../components/DetailPost/DetailPostFooter";
import DetailPostHeader from "../components/DetailPost/DetailPostHeader";

export default function DetailPostPage() {
   
    return (
        <>
        
            <Container className="d-grid w-50 px-5 justify-content-center m-auto">
                <DetailPostHeader />  
                <DetailPostContent />
                <DetailPostFooter />
            </Container>
        </>
    )
}