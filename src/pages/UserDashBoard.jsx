import NotFound from "../components/NotFound";
import { useSelector } from "react-redux";

function UserDashBoard() {
	const user = useSelector((state) => state.auth.user);

	if (!user) return <NotFound />;

	return (
		<div className="pt-6">
			<h1 className="text-center text-3xl mb-16">UserDashBoard page</h1>
			<p>
				Name: {user.firstName} {user.lastName}
			</p>
			<p>Email: {user.email}</p>
		</div>
	);
}

export default UserDashBoard;
