import { Button } from "../components/ui/button";
import { useNavigate } from "react-router";

function NotAuthorized() {
	const navigate = useNavigate();
	return (
		<div className="h-[300px] flex flex-col justify-center items-center gap-10">
			<h2 className="text-5xl text-red-500 text-center">
				Not Authorized
			</h2>

			<Button onClick={() => navigate("/", { replace: true })}>
				Home
			</Button>
		</div>
	);
}

export default NotAuthorized;
