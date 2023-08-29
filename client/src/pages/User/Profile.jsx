import { useState } from "react"
import { useAuth } from "../../context/AuthContext"
import { useProfile } from "../../hooks/useProfile"
import { ErrorForm, ErrorRequest, SuccessForm } from "../../components/Notifications"

function Profile() {

    const [widthLine, setWidthLine] = useState({ izq: 0, der: 0 })
    const {user, errors, success} = useAuth()
    const {errorForm, Submit} = useProfile()

    const moveElementIzq = () => {
        setWidthLine({...widthLine,izq:10})
    }
    const moveElementIzqLeave = () => {
        setWidthLine({...widthLine,izq:0})
    }

    const handleSubmit = (event) => {
        event.preventDefault()
        const data = new FormData(event.target)
        const user = Object.fromEntries(data.entries())
        Submit({data:user})
    }


    return (
        <article className="h-screen flex justify-center items-start w-full mt-5">
            <section className="bg-black/70 px-12 py-10 rounded-md shadow-sm hover:shadow-md shadow-slate-100 flex justify-start items-center gap-5 flex-col transition-all duration-1000 text-white w-96">
                <ul className="flex justify-center items-center gap-10 w-full">
                    <li className="w-32 flex justify-start items-center flex-col py-2 cursor-pointer gap-1" onMouseEnter={moveElementIzq} onMouseLeave={moveElementIzqLeave}>
                        <p>Tus credenciales</p>
                        <div className='h-[2px] bg-white transition-all duration-1000' style={{ width: widthLine ? `${widthLine.izq}rem` : '0 rem' }}></div>
                    </li>
                </ul>
                    {
                        errors && <ErrorRequest errors={errors} />
                    }
                    {
                        success && <SuccessForm success={[success]} />
                    }
                <form className="w-full text-black flex flex-col gap-2" onSubmit={handleSubmit}>
                    <input type="text" name="username" className="h-12 w-full rounded-md focus:outline-none px-4 py-2 placeholder:text-black/80" placeholder="Nombre de usuario" defaultValue={user.username}/>
                        {
                            errorForm.username && <ErrorForm error={errorForm.username} />
                        }
                    <input type="email" name="email" className="h-12 w-full rounded-md focus:outline-none px-4 py-2 placeholder:text-black/80" placeholder="Correo electronico" defaultValue={user.email}/>
                        {
                            errorForm.email && <ErrorForm error={errorForm.email} />
                        }
                    <div className="mt-5 flex flex-col gap-3">
                        {
                            errorForm.password && <ErrorForm error={errorForm.password} />
                        }
                        <input type="password" name="password" className="h-12 w-full rounded-md focus:outline-none px-4 py-2 placeholder:text-black/80" placeholder="Nueva contraseña"/>
                        <input type="password" name="confirm_password" className="h-12 w-full rounded-md focus:outline-none px-4 py-2 placeholder:text-black/80" placeholder="Confirmar Contraseña"/>
                    </div>
                    <button className="h-12 w-full rounded-md bg-violet-800 text-white text-xl font-bold focus:outline-none hover:bg-violet-900 transition-all duration-500 mt-4">Actualizar</button>
                </form>
            </section>
        </article>
    )
}

export default Profile