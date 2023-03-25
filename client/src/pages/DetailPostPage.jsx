import { useState } from "react";
import { Container } from "react-bootstrap";
import { useQuery } from "react-query";
import { useParams } from "react-router-dom";
import DetailPostContent from "../components/DetailPost/DetailPostContent";
import DetailPostFooter from "../components/DetailPost/DetailPostFooter";
import DetailPostHeader from "../components/DetailPost/DetailPostHeader";
import LoadingSpinner from "../components/LoadingSpinner";
import { API } from "../config/api";

export default function DetailPostPage() {
    let { id } = useParams();
    const [isLoading, setIsLoading] = useState(true)
    let { data: postDetail } = useQuery("postDetailCache", async () => {
        const response = await API.get("/post/" + id);
        setIsLoading(false)
        return response.data.data;
    })

    console.log("Detail post", postDetail)
    return (
        <>
            {isLoading ?
                <div className='m-auto d-flex justify-content-center align-items-center'>
                    <LoadingSpinner />
                </div> :
                <Container className="d-grid w-50 px-5 justify-content-center m-auto">
                    <DetailPostHeader user={postDetail?.user} postID={postDetail.id} title={postDetail?.title} />
                    <DetailPostContent photos={postDetail?.photos} />
                    <DetailPostFooter email={postDetail?.user?.email} description={postDetail?.description} />
                </Container>
            }
        </>
    )
}