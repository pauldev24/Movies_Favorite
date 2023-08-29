import { createContext, useContext, useEffect, useState } from 'react'
import { requestLogin, requestRegister, verifyAuth, requestLogout } from '../api/auth'
import Cookies from 'js-cookie'

export const AuthContext = createContext()

export const useAuth = () => {
    const context = useContext(AuthContext)
    if (!context) {
        throw new Error("No existe un contexto de autenticación")
    }
    return context
}

export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    const [isAuthenticated, setIsAuthenticated] = useState(false);
    const [errors, setErrors] = useState([]);
    const [loading, setLoading] = useState(false);
    const [success, setSuccess] = useState("");

    const login = async (user) => {
        try {
            const res = await requestLogin(user)
            setUser(res.data)
            setIsAuthenticated(true)
            setLoading(false)
        } catch (error) {
            if (error.response != null) {
                (error.response.data.message) ? setErrors([error.response.data.message]) : setErrors(error.response.data);
            } else {
                setErrors([error.message])
            }
            setLoading(false)
        }
    }

    const register = async (user) => {
        try {
            const res = await requestRegister(user);
            setUser(res.data)
            setLoading(false)
            setSuccess("Registro exitoso");
        } catch (error) {
            if (error.response != null) {
                (error.response.data.message) ? setErrors([error.response.data.message]) : setErrors(error.response.data)
            } else {
                setErrors([error.message])
            }
            setLoading(false)
        }
    }

    const logout = async () => {
        try {
            const res = await requestLogout()
            if (res.status === 200) {
                Cookies.remove('token')
                setIsAuthenticated(null)
                setUser(null)
                setLoading(false)
            }
        } catch (error) {
            setErrors(error.response.data)
            setLoading(false)
        }
    }

    useEffect(() => {
        if (errors.length > 0) {
            const timer = setTimeout(() => {
                setErrors([])
            }, 5000)
            return () => clearTimeout(timer)
        }
    }, [errors])

    useEffect(() => {
        if (success !== "") {
            const timer = setTimeout(() => {
                setSuccess("")
            }, 5000)
            return () => clearTimeout(timer)
        }
    }, [success])

    useEffect(() => {
        async function checkLogin() {
            const cookies = Cookies.get()
            if (!cookies.token) {
                setIsAuthenticated(false)
                setUser(null)
                setLoading(false)
                return
            }
            try {
                const res = await verifyAuth(cookies.token)
                if (!res.data) {
                    setIsAuthenticated(false)
                    setLoading(false)
                    return
                }
                //Si existe un usuario y se guarda
                setIsAuthenticated(true)
                setUser(res.data)
                setLoading(false)
            } catch (error) {
                setIsAuthenticated(false)
                setUser(null)
                setLoading(false)
            }
        }
        checkLogin()
    }, [])

    return (
        <AuthContext.Provider value={{ user, loading, setLoading, errors, isAuthenticated, login, register, success, logout }}>
            {children}
        </AuthContext.Provider>
    )
}