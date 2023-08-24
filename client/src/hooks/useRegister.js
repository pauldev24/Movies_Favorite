import { useEffect, useState } from "react"
import { useAuth } from "../context/AuthContext"

export function useRegister() {

    const [errorForm, setErrorForm] = useState({ username: null, email: null, password: null, confirm_password: null })
    const { register, setLoading } = useAuth()
    const [data, setData] = useState(null)

    useEffect(() => {
        if (!data) return 
        if (!data.username) {
            setErrorForm({ ...errorForm, username: 'El nombre de usuario es requerido' })
            return
        }
        if (!data.email) {
            setErrorForm({ ...errorForm, email: 'El correo electronico es requerido' })
            return
        }
        if (data.email.indexOf('@') === -1) {
            setErrorForm({ ...errorForm, email: 'El correo electronico no es valido' })
            return
        }
        if (!data.password) {
            setErrorForm({ ...errorForm, password: 'La contraseña es requerida' })
            return
        }
        if (data.password.length < 8) {
            setErrorForm({ ...errorForm, password: 'La contraseña debe tener al menos 8 caracteres' })
            return
        }
        if (data.password !== data.confirm_password) {
            setErrorForm({ ...errorForm, confirm_password: 'Las contraseñas no coinciden' })
            return
        }
        register(data)
        setLoading(true)
    }, [data])

    useEffect(() => {
        const timer = setTimeout(() => {
            setErrorForm({ username: null, email: null, password: null, confirm_password: null })
        }
            , 5000)

        return () => clearTimeout(timer)
    }, [errorForm])

    return { setData, errorForm }
}