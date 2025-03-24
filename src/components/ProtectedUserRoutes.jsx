import { useSelector } from "react-redux";
import { Navigate, Outlet } from "react-router";

function ProtectedUserRoutes() {
	const user = useSelector((state) => state.auth.user);

	return user ? <Outlet /> : <Navigate to="/login" replace />;
}

export default ProtectedUserRoutes;
