import AddToCartButton from "@/components/interactive/AddToCartButton";

export default function DishCard({ dish }) {
  return (
    <div className="border border-amber-200 rounded-lg p-4 bg-white shadow-sm hover:shadow-md transition">
      <h3 className="text-xl font-semibold text-gray-800">{dish.name}</h3>
      <p className="text-amber-800 font-bold my-2">{dish.price} ETB</p>
      <AddToCartButton dish={dish} />
    </div>
  );
}