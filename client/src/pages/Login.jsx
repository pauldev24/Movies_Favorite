import { Link, useNavigate } from "react-router-dom"
import { ErrorForm, ErrorRequest } from "../components/Notifications"
import { useAuth } from "../context/AuthContext"
import { useLogin } from "../hooks/useLogin"
import { useEffect } from "react"
import { Loading } from "../components/Utils"

function Login() {

    const { errors, loading, user, isAuthenticated } = useAuth()
    const { errorForm, setData } = useLogin()

    const handleSubmit = (event) => {
        event.preventDefault()

        setData({ username: event.target.username.value, password: event.target.password.value })

    }

    const navigate = useNavigate()

    useEffect(() => {
        if (isAuthenticated) {
            navigate('/principal')
        }
    }, [isAuthenticated, navigate])

    return (
        <div className="relative">
            {
                (loading) ?
                    <Loading /> : null
            }
            <div className="z-[1] h-screen flex justify-center items-center w-full">
                <form onSubmit={handleSubmit} className="bg-black/70 px-12 py-10 rounded-md shadow-sm hover:shadow-sm shadow-white flex justify-center items-center gap-5 flex-col transition-all duration-1000">
                    <h1 className="text-4xl text-white font-bold uppercase">Login</h1>
                    {
                        errors && <ErrorRequest errors={errors} />
                    }
                    <div>
                        <input type="text" placeholder="username o email" className="text-xl px-4 py-2 rounded-md bg-zinc-800 text-white w-[22rem] focus:outline-none" name="username" defaultValue={(user) ? user.username : ""} />
                        {
                            errorForm.username && <ErrorForm error={errorForm.username} />
                        }
                    </div>
                    <div>
                        <input type="password" placeholder="contraseña" className="text-xl px-4 py-2 rounded-md bg-zinc-800 text-white w-[22rem] focus:outline-none" name="password" defaultValue={(user) ? user.password : ""} />
                        {
                            errorForm.password && <ErrorForm error={errorForm.password} />
                        }
                    </div>
                    <div className="flex justify-between items-center w-[22rem]">
                        <button type="submit" className="bg-violet-800 px-5 py-2 rounded-md text-slate-100 text-lg">
                            Iniciar Sesion
                        </button>
                        <Link to="/register" className="text-violet-700 text-md font-bold">¿No tienes cuenta?</Link>
                    </div>
                </form>
            </div>
        </div>
    )
}

export default Login