import { useNavigate } from "react-router";

function Error() {
	const navigate = useNavigate();
	return (
		<div className="h-[300px] flex flex-col justify-center items-center gap-4">
			<h3 className="text-center text-4xl text-red-500">
				Error, something went wrong!
			</h3>
			<Button onClick={() => navigate("/", { replace: true })}>
				Home
			</Button>
		</div>
	);
}

export default Error;
