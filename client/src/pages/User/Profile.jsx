import { useState } from "react"

function Profile() {

    const [widthLine, setWidthLine] = useState({ izq: 0, der: 0 })
    const moveElementDer = () => {
        setWidthLine({...widthLine,der:10})
    }
    const moveElementDerLeave = () => {
        setWidthLine({...widthLine,der:0})
    }
    const moveElementIzq = () => {
        setWidthLine({...widthLine,izq:10})
    }
    const moveElementIzqLeave = () => {
        setWidthLine({...widthLine,izq:0})
    }
    return (
        <div className="h-screen flex justify-center items-start w-full mt-5">
            <div className="bg-black/70 px-12 py-10 rounded-md shadow-sm hover:shadow-md shadow-slate-100 flex justify-start items-center gap-5 flex-col transition-all duration-1000 text-white">
                <ul className="flex justify-between items-center gap-10 w-full">
                    <li className="w-32 flex justify-start items-center flex-col py-2 cursor-pointer gap-1" onMouseEnter={moveElementIzq} onMouseLeave={moveElementIzqLeave}>
                        <p>General</p>
                        <div className='h-[2px] bg-white transition-all duration-1000' style={{ width: widthLine ? `${widthLine.izq}rem` : '0 rem' }}></div>
                    </li>
                    <li className="w-32 flex justify-start items-center flex-col py-2 cursor-pointer gap-1" onMouseEnter={moveElementDer} onMouseLeave={moveElementDerLeave}>
                        <p>Peligro</p>
                        <div className="h-[2px] bg-white transition-all duration-1000" style={{ width: widthLine ? `${widthLine.der}rem` : '0 rem' }}></div>
                    </li>
                </ul>
            </div>
        </div>
    )
}

export default Profile