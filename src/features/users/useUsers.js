import { useQuery } from "@tanstack/react-query";
import { getAllUsers } from "../../services/apiAuth";

export function useUsers() {
	const {
		isPending,
		data: users,
		error,
	} = useQuery({
		queryKey: ["users"],
		queryFn: getAllUsers,
		onError: (error) => {
			console.error("Error fetching products:", error);
		},
	});

	return { isPending, error, users };
}
