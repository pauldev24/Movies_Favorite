import { useEffect, useState } from "react"
import { useAuth } from "../context/AuthContext"

export function useLogin() {

    const [errorForm, setErrorForm] = useState({ username: null, password: null })
    const { login, setLoading } = useAuth()
    const [data, setData] = useState(null)

    useEffect(() => {
        if (!data) return
        if (!data.username) {
            setErrorForm({ ...errorForm, username: "El nombre de usuario o correo es requerido" })
            return
        }

        if (!data.password) {
            setErrorForm({ ...errorForm, password: "La contraseña es requerida" })
            return
        }

        (data.username.indexOf('@') === -1) ?
            login({ username: data.username, password: data.password }) : login({ email: data.username, password: data.password })

        setLoading(true)
    }, [data])

    useEffect(() => {
        const timer = setTimeout(() => {
            setErrorForm({ username: null, password: null })
        }, 5000)

        return () => clearTimeout(timer)
    }, [errorForm])

    return { setData, errorForm }
}