import { Link, NavLink, useNavigate } from "react-router";
import { ModeToggle } from "./ModeToggle";
import { UserRound } from "lucide-react";
import { Button } from "./ui/button";
import { logoutUser } from "../services/apiAuth";
import { useSelector, useDispatch } from "react-redux";
import { clearAuth } from "../slices/authSlice";

function Navbar() {
	const user = useSelector((state) => state.auth.user);
	const role = useSelector((state) => state.auth.role);
	const dispatch = useDispatch();

	const navigate = useNavigate();

	async function handleLogout() {
		await logoutUser();
		dispatch(clearAuth());
		navigate("/");
	}

	return (
		<nav className="flex justify-between items-center px-10 py-2 border-b-1">
			<div>
				<Link to="/">LOGO</Link>
			</div>
			<div>
				<ul className="flex gap-8">
					<li>
						<NavLink to="/products">Products</NavLink>
					</li>

					{user && (
						<li>
							<NavLink to="/user/dashboard">User Account</NavLink>
						</li>
					)}

					{role === "admin" && (
						<li>
							<NavLink to="/admin/dashboard">Admin</NavLink>
						</li>
					)}
				</ul>
			</div>
			<div className="flex gap-6 items-center">
				<div className="flex items-center gap-2">
					<Link to="/user/dashboard">
						<UserRound
							className={user ? "text-green-500" : "text-red-500"}
						/>
					</Link>
					<ModeToggle />
				</div>

				{user ? (
					<Button asChild size="sm" onClick={() => handleLogout()}>
						<Link to="/">Logout</Link>
					</Button>
				) : (
					<Button asChild size="sm">
						<Link to="/login">Login</Link>
					</Button>
				)}
			</div>
		</nav>
	);
}

export default Navbar;
