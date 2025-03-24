import { useProducts } from "../features/products/useProducts";
import Error from "../components/Error";
import Spinner from "../components/Spinner";
import { Button } from "../components/ui/button";

function Products() {
	const { isPending, products, error } = useProducts();

	if (error) return <Error />;

	if (isPending) return <Spinner />;

	return (
		<div className="pt-6 w-full">
			<h1 className="text-3xl text-center mb-8">Products</h1>
			<div className="w-full grid grid-cols-[repeat(auto-fit,minmax(21rem,1fr))] gap-4 p-2">
				{products.map((item) => (
					<div
						key={item.id}
						className="border-2 shadow-md dark:border-0 dark:shadow-none bg-white dark:bg-slate-600 rounded-lg min-w-[21rem] w-full px-4 py-2 mx-auto">
						<h2 className="text-center text-2xl text-red-600">
							{item.name}
						</h2>
						<div className="flex justify-between gap-6 ">
							<div>
								<img
									src={item.imageUrl}
									width={150}
									className="object-contain"
								/>
							</div>
							<div className="self-center">
								<div className="text-sm max-w-60 py-3">
									{item.description}
								</div>
								<p className="text-center">{item.color}</p>
								<p className="text-center mb-4 md:mb-8 text-orange-400 dark:text-orange-400">
									{item.price.toLocaleString()} kr
								</p>
								<Button size="sm" className="ml-6">
									Buy Now
								</Button>
							</div>
						</div>
					</div>
				))}
			</div>
		</div>
	);
}

export default Products;
