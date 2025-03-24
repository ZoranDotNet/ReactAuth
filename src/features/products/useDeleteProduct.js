import { deleteProduct as APIdeleteProduct } from "../../services/apiProducts";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";

export function useDeleteProduct() {
	const queryClient = useQueryClient();

	const { mutate: deleteProduct, isPending: pendingDelete } = useMutation({
		mutationFn: (id) => APIdeleteProduct(id),
		onSuccess: () => {
			toast.success("Product deleted");
			queryClient.invalidateQueries(["products"]);
		},
		onError: (err) => {
			const errorMessage =
				err.response?.data?.message || "Something went wrong";
			toast.error(errorMessage);
		},
	});

	return { deleteProduct, pendingDelete };
}
