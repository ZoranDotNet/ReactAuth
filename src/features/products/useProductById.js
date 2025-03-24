import { getProduct } from "../../services/apiProducts";
import { useQuery } from "@tanstack/react-query";

export function useProductById(id) {
	const {
		isPending,
		data: product,
		error,
	} = useQuery({
		queryKey: ["product", id],
		queryFn: () => getProduct(id),
		onError: (error) => {
			console.error("Error fetching products:", error);
		},
		enabled: !!id,
	});

	return { isPending, error, product };
}
