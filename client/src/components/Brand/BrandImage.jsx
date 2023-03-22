import {Image } from 'react-bootstrap'

export default function BrandImage(props) {
    return (
        <>
            <span className='p-0' style={{
                position: "absolute",
                left:props.left,
                top:props.top,
                width:props.width
            }}>
                <Image className=' m-0 w-25'
                    style={{
                        position: "absolute",
                        top:"55%",
                        left: "24%",
                        
                    }} src='/Group 4.png' />
                <Image className='w-100 m-0' src='/Group 3.png' />
            </span>
        </>
    )
}