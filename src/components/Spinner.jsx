import PropagateLoader from "react-spinners/PropagateLoader";

function Spinner() {
	return (
		<div style={{ textAlign: "center", marginTop: "100px" }}>
			<PropagateLoader
				color={"#7306f0"}
				loading={true}
				size={15}
				aria-label="Loading Spinner"
				data-testid="loader"
			/>
		</div>
	);
}

export default Spinner;
