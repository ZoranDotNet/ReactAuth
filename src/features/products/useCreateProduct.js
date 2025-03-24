import { createProduct as APIcreateProduct } from "../../services/apiProducts";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";

export function useCreateProduct() {
	const queryClient = useQueryClient();
	const { mutate: createProduct, isPending: pendingCreate } = useMutation({
		mutationFn: (data) => APIcreateProduct(data),
		onSuccess: () => {
			toast.success("New Product created");
			queryClient.invalidateQueries(["products"]);
		},
		onError: (err) => {
			const errorMessage =
				err.response?.data?.message || "Something went fel";
			console.log("error", err);

			toast.error(errorMessage); // Visar det i toast
		},
	});

	return { pendingCreate, createProduct };
}
