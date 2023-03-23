import './Gallery.css'
export default function Gallery({ data }) {
    console.log(data)
    return (
        <>
            <div className="gallery">
                {data.map((item, index) => {
                    return (
                        <div className="pics" key={index}>
                            <img src={item.src} alt="" className="w-100"/>
                        </div>
                    )
                })}
            </div>
        </>
    )
}