import { useNavigate } from "react-router";
import { Button } from "./ui/button";

function NotFound() {
	const navigate = useNavigate();
	return (
		<div className="h-[300px] flex flex-col justify-center items-center gap-4">
			<h3 className="text-center text-2xl">Page could not be found</h3>
			<Button onClick={() => navigate("/", { replace: true })}>
				Home
			</Button>
		</div>
	);
}

export default NotFound;
