import { useEffect, useState } from "react"
import { useAuth } from "../context/AuthContext"

export function useProfile() {

    const [errorForm, setErrorForm] = useState({ username: null, email: null, password: null })
    const { update } = useAuth()

    const Submit = ({ data }) => {
        if (!data) return
        if (data.username == "") {
            setErrorForm({ ...errorForm, username: "El nombre de usuario no puede ser vacio" })
            return
        }

        if (data.email == "") {
            setErrorForm({ ...errorForm, email: "El email no puede ser vacio" })
            return
        }

        if (data.password != "" && data.password != data.confirm_password) {
            setErrorForm({ ...errorForm, password: "Las contraseñas no coinciden" })
            return
        }

        //Solo enviar los campos diferente de vacio
        const userUpdate = {}
        if (data.username != "") { userUpdate.username = data.username }
        if (data.email != "") { userUpdate.email = data.email }
        if (data.password != "") {
            userUpdate.password = data.password
            userUpdate.confirm_password = data.confirm_password
        }

        update(userUpdate)

    }

    useEffect(() => {
        const timer = setTimeout(() => {
            setErrorForm({ username: null, email: null, password: null })
        }, 5000)

        return () => clearTimeout(timer)
    }, [errorForm])

    return { errorForm, Submit }
}