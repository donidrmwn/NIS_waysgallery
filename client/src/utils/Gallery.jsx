import './Gallery.css'
import { useNavigate } from "react-router-dom";
export default function Gallery({ data }) {

    const navigate = useNavigate();
    return (
        <>
            <div className="gallery">
                {data?.data?.map((item, index) => {        
                    return (
                        <div className="pics" key={index}>
                            <img onClick={() => navigate("/detail-post/"+item?.id)} src={item?.photos[0].photo} alt="" className="w-100" />
                        </div>
                    )
                })}
            </div>
        </>
    )
}