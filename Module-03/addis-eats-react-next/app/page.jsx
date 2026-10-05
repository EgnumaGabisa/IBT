import DishCard from "@/components/ui/DishCard";

async function getMenuData() {
  return [
    { id: "1", name: "Special Doro Wot", price: 450 },
    { id: "2", name: "Beyaynetu", price: 300 },
    { id: "3", name: "Kitfo Special", price: 500 },
  ];
}

export default async function HomePage() {
  const dishes = await getMenuData();

  return (
    <main className="max-w-5xl mx-auto px-4 py-8">
      <h2 className="text-3xl font-bold mb-6 text-amber-900">Featured Menu</h2>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {dishes.map((dish) => (
          <DishCard key={dish.id} dish={dish} />
        ))}
      </div>
    </main>
  );
}