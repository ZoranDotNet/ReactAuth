import { useQuery } from "@tanstack/react-query";
import { getAllProducts } from "../../services/apiProducts";

export function useProducts() {
	const {
		isPending,
		data: products,
		error,
	} = useQuery({
		queryKey: ["products"],
		queryFn: getAllProducts,
		onError: (error) => {
			console.error("Error fetching products:", error);
		},
	});

	return { isPending, error, products };
}
