import { Navigate, Outlet } from "react-router-dom"
import { useAuth } from "../context/AuthContext"
import { Loading } from "../components/Utils"

function ProtectedRoute() {

    const { loading, isAuthenticated } = useAuth()

    if (loading) return <Loading />
    if (!isAuthenticated) return <Navigate to="/login" replace />
    return (
        <Outlet />
    )
}

export default ProtectedRoute