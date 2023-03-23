import './Gallery.css'
export default function Gallery({ data }) {
    console.log("datakita:",data)
    return (
        <>
            <div className="gallery">
                {data?.data.map((item, index) => {
                    return (
                        <div className="pics" key={index}>
                            <img src={item?.photos.photo} alt="" className="w-100"/>
                        </div>
                    )
                })}
            </div>
        </>
    )
}