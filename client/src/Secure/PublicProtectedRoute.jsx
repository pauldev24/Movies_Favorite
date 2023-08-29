import { Navigate, Outlet } from "react-router-dom"
import { useAuth } from "../context/AuthContext"
import { Loading } from "../components/Utils"

function PublicProtectedRoute() {

    const { loading, isAuthenticated } = useAuth()

    if (loading) return <Loading />
    if (isAuthenticated) return <Navigate to="/principal" replace />
    return (
        <Outlet />
    )
}

export default PublicProtectedRoute