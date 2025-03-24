import { useMutation, useQueryClient } from "@tanstack/react-query";
import { editProduct as APIeditProduct } from "../../services/apiProducts";
import { toast } from "sonner";

export function useEditProduct(id) {
	const queryClient = useQueryClient();
	const { mutate: editProduct, isPending: pendingEdit } = useMutation({
		mutationFn: (id, data) => APIeditProduct(id, data),
		onSuccess: () => {
			toast.success("Product updated");
			queryClient.invalidateQueries(["products"]);
			queryClient.invalidateQueries(["product", id]);
		},
		onError: (err) => {
			const errorMessage =
				err.response?.data?.message || "Something went wrong";

			toast.error(errorMessage); // Visar det i toast
		},
	});

	return { pendingEdit, editProduct };
}
