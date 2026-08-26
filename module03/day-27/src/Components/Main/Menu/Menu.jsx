import "./Menu.css";

function Menu() {
  const foods = [
    {
      id: 1,
      name: "Chicken Burger",
      category: "Burger",
      price: 450,
      emoji: "🍔",
    },
    {
      id: 2,
      name: "Margherita Pizza",
      category: "Pizza",
      price: 650,
      emoji: "🍕",
    },
    {
      id: 3,
      name: "Chicken Pasta",
      category: "Pasta",
      price: 550,
      emoji: "🍝",
    },
    {
      id: 4,
      name: "Fresh Salad",
      category: "Salad",
      price: 350,
      emoji: "🥗",
    },
    {
      id: 5,
      name: "Beef Burger",
      category: "Burger",
      price: 500,
      emoji: "🍔",
    },
    {
      id: 6,
      name: "Chicken Pizza",
      category: "Pizza",
      price: 700,
      emoji: "🍕",
    },
  ];

  return (
    <section className="menu">

      <div className="welcome">
        <div>
          <span className="small-title">GOOD AFTERNOON 👋</span>

          <h1>
            Find your favorite
            <span> food</span>
          </h1>

          <p>
            Discover delicious meals from the best restaurants around you.
          </p>
        </div>

        <div className="delivery-card">
          <span>🚴</span>
          <div>
            <strong>Fast Delivery</strong>
            <small>30–45 minutes</small>
          </div>
        </div>
      </div>


      <div className="search-section">
        <div className="search-box">
          <span>🔍</span>
          <input
            type="text"
            placeholder="Search for food or restaurant..."
          />
        </div>

        <button className="filter-btn">
          ⚙ Filter
        </button>
      </div>


      <div className="category-section">
        <div className="section-heading">
          <h2>Categories</h2>
          <a href="#all">View all</a>
        </div>

        <div className="categories">
          <button className="category active">🍔 Burger</button>
          <button className="category">🍕 Pizza</button>
          <button className="category">🍝 Pasta</button>
          <button className="category">🥗 Salad</button>
          <button className="category">🍰 Dessert</button>
        </div>
      </div>


      <div className="food-section">
        <div className="section-heading">
          <h2>Popular Foods</h2>
          <a href="#all-foods">View all</a>
        </div>

        <div className="food-grid">
          {foods.map((food) => (
            <div className="food-card" key={food.id}>

              <div className="food-image">
                <span>{food.emoji}</span>

                <button className="favorite">
                  ♡
                </button>
              </div>

              <div className="food-info">
                <span className="food-category">
                  {food.category}
                </span>

                <h3>{food.name}</h3>

                <div className="food-bottom">
                  <strong>{food.price} ETB</strong>

                  <button className="add-btn">
                    +
                  </button>
                </div>
              </div>

            </div>
          ))}
        </div>
      </div>

    </section>
  );
}

export default Menu;