import Spinner from "../../components/Spinner";
import { useCreateProduct } from "./useCreateProduct";
import { useState } from "react";
import { Input } from "../../components/ui/input";
import { Textarea } from "../../components/ui/textarea";
import { Button } from "../../components/ui/button";

const initialData = {
	name: "",
	color: "",
	price: "",
	description: "",
	imageUrl: "",
};

function CreateProductModal({ setShowModal }) {
	const [formData, setFormData] = useState(initialData);
	const [errors, setErrors] = useState({});
	const { pendingCreate, createProduct } = useCreateProduct();

	const validate = (name, value) => {
		let error = "";
		if (name === "name" && value.length < 1) error = "Name is required";
		if (name === "color" && !value) error = "Color is required";
		if (name === "price" && !value) error = "Price is required";
		if (name === "description" && !value) error = "Description is required";
		if (name === "imageUrl" && !value) error = "Image-Url is required";

		setErrors((prev) => ({ ...prev, [name]: error }));
	};

	function clearForm() {
		setFormData(initialData);
		setShowModal(false);
	}

	const handleChange = (e) => {
		const { name, value } = e.target;
		setFormData((prev) => ({ ...prev, [name]: value }));
	};

	function handleSubmit(e) {
		e.preventDefault();

		if (formData === initialData) {
			let error = "REQUIRED";
			setErrors((prev) => ({ ...prev, name: error }));
			return;
		}
		const dataToSend = { ...formData, price: Number(formData.price) };

		//Logic to call API here
		createProduct(dataToSend);

		setFormData(initialData);
		setShowModal(false);
	}

	if (pendingCreate) return <Spinner />;

	return (
		<div className="w-[30rem] p-4 bg-white dark:bg-background mx-auto mt-[4rem] border-3 dark:border-2 rounded-md shadov-lg">
			<div className="grid gap-4">
				<div className="space-y-2">
					<h4 className="font-medium text-center">Create Product</h4>
				</div>
				<form onSubmit={handleSubmit}>
					<div className="flex flex-col gap-2">
						<div className="flex flex-col gap-2">
							<Input
								placeholder="Name"
								name="name"
								className={`h-8 ${
									errors.name
										? "border-red-500"
										: formData.name
										? "border-green-500"
										: "border-muted"
								}`}
								autoComplete="off"
								value={formData.name}
								onChange={handleChange}
								onBlur={(e) =>
									validate(e.target.name, e.target.value)
								}
							/>

							<p className="h-3 text-red-500 text-xs text-left">
								{errors?.name}
							</p>
						</div>
						<div className="flex flex-col gap-2">
							<Textarea
								placeholder="Description"
								name="description"
								className={`h-8 ${
									errors.description
										? "border-red-500"
										: formData.description
										? "border-green-500"
										: "border-muted"
								}`}
								autoComplete="off"
								value={formData.description}
								onChange={handleChange}
								onBlur={(e) =>
									validate(e.target.name, e.target.value)
								}
							/>

							<p className="h-3 text-red-500 text-xs">
								{errors?.description}
							</p>
						</div>
						<div className="flex flex-col gap-2">
							<Input
								placeholder="Color"
								name="color"
								className={`h-8 ${
									errors.color
										? "border-red-500"
										: formData.color
										? "border-green-500"
										: "border-muted"
								}`}
								autoComplete="off"
								value={formData.color}
								onChange={handleChange}
								onBlur={(e) =>
									validate(e.target.name, e.target.value)
								}
							/>

							<p className="h-3 text-red-500 text-xs">
								{errors?.color}
							</p>
						</div>

						<div className="flex flex-col gap-2">
							<Input
								placeholder="Image-Url"
								name="imageUrl"
								className={`h-8 ${
									errors.imageUrl
										? "border-red-500"
										: formData.imageUrl
										? "border-green-500"
										: "border-muted"
								}`}
								autoComplete="off"
								value={formData.imageUrl}
								onChange={handleChange}
								onBlur={(e) =>
									validate(e.target.name, e.target.value)
								}
							/>

							<p className="h-3 text-red-500 text-xs">
								{errors?.imageUrl}
							</p>
						</div>
						<div className="flex flex-col gap-2 mb-6">
							<Input
								placeholder="Price"
								name="price"
								className={`h-8 ${
									errors.price
										? "border-red-500"
										: formData.price
										? "border-green-500"
										: "border-muted"
								}`}
								autoComplete="off"
								value={formData.price}
								onChange={handleChange}
								onBlur={(e) =>
									validate(e.target.name, e.target.value)
								}
							/>

							<p className="h-3 text-red-500 text-xs">
								{errors?.price}
							</p>
						</div>
						<div className="flex items-center justify-center gap-2 mb-4">
							<Button
								type="submit"
								className="w-50"
								disabled={pendingCreate}>
								Create
							</Button>
							<Button
								type="button"
								className="w-50"
								variant="outline"
								onClick={clearForm}>
								Cancel
							</Button>
						</div>
					</div>
				</form>
			</div>
		</div>
	);
}

export default CreateProductModal;
