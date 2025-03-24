import { useState } from "react";
import { useProducts } from "./useProducts";
import { useNavigate } from "react-router";
import CreateProductModal from "./CreateProductModal";
import Error from "../../components/Error";
import Spinner from "../../components/Spinner";
import { Button } from "../../components/ui/button";
import {
	Table,
	TableBody,
	TableCell,
	TableFooter,
	TableHead,
	TableHeader,
	TableRow,
} from "../../components/ui/table";
import { Plus } from "lucide-react";
import { useDeleteProduct } from "./useDeleteProduct";

function AdminProducts() {
	const [showModal, setShowModal] = useState(false);

	const { isPending, error, products } = useProducts();
	const { deleteProduct, pendingDelete } = useDeleteProduct();
	const navigate = useNavigate();

	if (error) return <Error />;

	if (isPending || pendingDelete) return <Spinner />;

	return (
		<div className="pt-6 px-26">
			<h1 className="text-center text-3xl mb-10 ">Products</h1>
			{!showModal && (
				<>
					<div className="px-50 mb-4 text-right">
						<Button onClick={() => setShowModal(true)}>
							<Plus /> Add Product
						</Button>
					</div>
					<div className="px-50">
						<Table>
							<TableHeader>
								<TableRow>
									<TableHead className="w-[50px]">
										ID
									</TableHead>
									<TableHead className="w-[175px]">
										Name
									</TableHead>
									<TableHead className="w-[200px]">
										Color
									</TableHead>
									<TableHead className="w-[150px]">
										Image
									</TableHead>
									<TableHead className="w-[150px]">
										Price
									</TableHead>
									<TableHead className="w-[150px]"></TableHead>
								</TableRow>
							</TableHeader>
							<TableBody>
								{products.map((prod) => (
									<TableRow key={prod.id}>
										<TableCell className="font-medium">
											{prod.id}
										</TableCell>
										<TableCell>{prod.name}</TableCell>
										<TableCell>{prod.color}</TableCell>
										<TableCell className="p-2">
											<div className="bg-gray-300 dark:bg-primary rounded-full w-10 flex items-center overflow-hidden">
												<img
													src={prod.imageUrl}
													width={40}
													className="object-cover"
												/>
											</div>
										</TableCell>
										<TableCell>
											{prod.price.toLocaleString()} kr
										</TableCell>
										<TableCell>
											<div className="flex items-center gap-2">
												<Button
													size="sm"
													onClick={() =>
														navigate(
															`/admin/product/${prod.id}`
														)
													}>
													Edit
												</Button>
												<Button
													size="sm"
													variant={"destructive"}
													onClick={() =>
														deleteProduct(prod.id)
													}>
													Delete
												</Button>
											</div>
										</TableCell>
									</TableRow>
								))}
							</TableBody>
							<TableFooter>
								<TableRow>
									<TableCell
										colSpan={6}
										className="p-4"></TableCell>
								</TableRow>
							</TableFooter>
						</Table>
					</div>
				</>
			)}

			{showModal && (
				<CreateProductModal
					setShowModal={setShowModal}
					title={"Create"}
				/>
			)}
		</div>
	);
}

export default AdminProducts;
