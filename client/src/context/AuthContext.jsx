import { createContext, useContext, useEffect, useState } from 'react'
import { requestLogin, requestRegister, verifyAuth, requestLogout, requestUpdateUser } from '../api/auth'
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
            setLoading(true)
            const res = await requestLogin(user)
            setUser(res.data)
            setIsAuthenticated(true)
        } catch (error) {
            if (error.response != null) {
                (error.response.data.message) ? setErrors([error.response.data.message]) : setErrors(error.response.data);
            } else {
                setErrors([error.message])
            }
        } finally {
            setLoading(false)
        }
    }

    const register = async (user) => {
        try {
            setLoading(true)
            const res = await requestRegister(user);
            setUser(res.data)
            setSuccess("Registro exitoso");
        } catch (error) {
            if (error.response != null) {
                (error.response.data.message) ? setErrors([error.response.data.message]) : setErrors(error.response.data)
            } else {
                setErrors([error.message])
            }
        } finally {
            setLoading(false)
        }
    }

    const logout = async () => {
        try {
            setLoading(true)
            const res = await requestLogout()
            if (res.status === 200) {
                Cookies.remove('token')
                setIsAuthenticated(null)
                setUser(null)
                return true
            }
            return false
        } catch (error) {
            setErrors(error.response.data)
        } finally {
            setLoading(false)
        }
    }

    const update = async (user) => {
        try {
            setLoading(true)
            const res = await requestUpdateUser(user)
            setUser(res.data.user)
            setSuccess("Actualización exitosa")
        } catch (error) {
            if (error.response != null) {
                (error.response.data.message) ? setErrors([error.response.data.message]) : setErrors(error.response.data)
            } else {
                setErrors([error.message])
            }
        } finally {
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
            setLoading(true)
            const cookies = Cookies.get()
            if (!cookies.token) {
                setIsAuthenticated(false)
                setUser(null)
                setLoading(false)
                return
            }
            try {
                setLoading(true)
                const res = await verifyAuth(cookies.token)
                if (!res.data) {
                    setIsAuthenticated(false)
                    setLoading(false)
                    return
                }
                //Si existe un usuario y se guarda
                setIsAuthenticated(true)
                setUser(res.data)
            } catch (error) {
                setIsAuthenticated(false)
                setUser(null)
            } finally {
                setLoading(false)
            }
        }
        checkLogin()
    }, [])

    return (
        <AuthContext.Provider value={{ user, loading, setLoading, errors, isAuthenticated, login, register, success, logout, update }}>
            {children}
        </AuthContext.Provider>
    )
}