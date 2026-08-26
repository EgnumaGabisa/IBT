const state = {
  menu: [],
  query: "",
  category: "all",
  cart: loadCart()
};

const elements = {
  menuGrid: document.querySelector("#menuGrid"),
  categoryFilters: document.querySelector("#categoryFilters"),
  searchInput: document.querySelector("#searchInput"),
  resultCount: document.querySelector("#resultCount"),
  statusMessage: document.querySelector("#statusMessage"),
  cartButton: document.querySelector("#cartButton"),
  cartCount: document.querySelector("#cartCount"),
  cartPanel: document.querySelector("#cartPanel"),
  cartOverlay: document.querySelector("#cartOverlay"),
  closeCart: document.querySelector("#closeCart"),
  cartItems: document.querySelector("#cartItems"),
  cartTotal: document.querySelector("#cartTotal"),
  checkoutButton: document.querySelector("#checkoutButton"),
  checkoutMessage: document.querySelector("#checkoutMessage")
};

function loadCart() {
  try {
    return JSON.parse(localStorage.getItem("addisEatsCart")) || [];
  } catch {
    return [];
  }
}

function saveCart() {
  localStorage.setItem("addisEatsCart", JSON.stringify(state.cart));
}

function money(value) {
  return `ETB ${value.toLocaleString()}`;
}

function escapeHtml(value) {
  return String(value).replace(/[&<>"']/g, (char) => ({
    "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#039;"
  }[char]));
}

function getFilteredMenu() {
  const query = state.query.trim().toLowerCase();

  return state.menu.filter((item) => {
    const matchesCategory = state.category === "all" || item.category === state.category;
    const matchesQuery =
      !query ||
      item.name.toLowerCase().includes(query) ||
      item.description.toLowerCase().includes(query);

    return matchesCategory && matchesQuery;
  });
}

function renderFilters() {
  const categories = ["all", ...new Set(state.menu.map((item) => item.category))];

  elements.categoryFilters.innerHTML = categories.map((category) => `
    <button
      class="filter-button ${state.category === category ? "active" : ""}"
      type="button"
      data-category="${escapeHtml(category)}"
      aria-pressed="${state.category === category}"
    >
      ${category === "all" ? "All" : escapeHtml(category)}
    </button>
  `).join("");
}

function renderMenu() {
  const filtered = getFilteredMenu();

  elements.resultCount.textContent = `${filtered.length} ${filtered.length === 1 ? "item" : "items"}`;

  if (!filtered.length) {
    elements.menuGrid.innerHTML = `
      <div class="empty-state">
        <strong>No dishes found.</strong>
        <p>Try another search or category.</p>
      </div>
    `;
    return;
  }

  elements.menuGrid.innerHTML = filtered.map((item) => `
    <article class="menu-card">
      <img class="food-image" src="${item.image}" alt="${escapeHtml(item.name)}" loading="lazy">
      <div class="card-body">
        <div class="card-top">
          <div>
            <h3 class="card-title">${escapeHtml(item.name)}</h3>
            <span class="category">${escapeHtml(item.category)}</span>
          </div>
          <strong class="price">${money(item.price)}</strong>
        </div>
        <p class="description">${escapeHtml(item.description)}</p>
        <div class="card-bottom">
          <span aria-hidden="true">🍴</span>
          <button class="add-button" type="button" data-add="${item.id}">Add to cart</button>
        </div>
      </div>
    </article>
  `).join("");
}

function getCartItems() {
  return state.cart.map((cartItem) => {
    const product = state.menu.find((item) => item.id === cartItem.id);
    return product ? { ...product, quantity: cartItem.quantity } : null;
  }).filter(Boolean);
}

function renderCart() {
  const items = getCartItems();
  const count = state.cart.reduce((sum, item) => sum + item.quantity, 0);
  const total = items.reduce((sum, item) => sum + item.price * item.quantity, 0);

  elements.cartCount.textContent = count;
  elements.cartTotal.textContent = money(total);
  elements.checkoutButton.disabled = items.length === 0;

  if (!items.length) {
    elements.cartItems.innerHTML = `<div class="empty-cart"><strong>Your cart is empty.</strong><p>Add a dish to start your order.</p></div>`;
    return;
  }

  elements.cartItems.innerHTML = items.map((item) => `
    <div class="cart-item">
      <img class="cart-thumb" src="${item.image}" alt="">
      <div>
        <p class="cart-item-name">${escapeHtml(item.name)}</p>
        <span class="cart-item-price">${money(item.price)} each</span>
        <div class="qty-controls">
          <button class="qty-button" type="button" data-decrease="${item.id}" aria-label="Decrease ${escapeHtml(item.name)}">−</button>
          <strong>${item.quantity}</strong>
          <button class="qty-button" type="button" data-increase="${item.id}" aria-label="Increase ${escapeHtml(item.name)}">+</button>
        </div>
        <button class="remove-button" type="button" data-remove="${item.id}">Remove</button>
      </div>
      <strong>${money(item.price * item.quantity)}</strong>
    </div>
  `).join("");
}

function addToCart(id) {
  const existing = state.cart.find((item) => item.id === id);

  if (existing) {
    existing.quantity += 1;
  } else {
    state.cart.push({ id, quantity: 1 });
  }

  saveCart();
  renderCart();
}

function changeQuantity(id, amount) {
  const item = state.cart.find((cartItem) => cartItem.id === id);
  if (!item) return;

  item.quantity += amount;
  if (item.quantity <= 0) {
    state.cart = state.cart.filter((cartItem) => cartItem.id !== id);
  }

  saveCart();
  renderCart();
}

function openCart() {
  elements.cartPanel.classList.add("open");
  elements.cartPanel.setAttribute("aria-hidden", "false");
  elements.cartButton.setAttribute("aria-expanded", "true");
  elements.cartOverlay.hidden = false;
  document.body.style.overflow = "hidden";
}

function closeCart() {
  elements.cartPanel.classList.remove("open");
  elements.cartPanel.setAttribute("aria-hidden", "true");
  elements.cartButton.setAttribute("aria-expanded", "false");
  elements.cartOverlay.hidden = true;
  document.body.style.overflow = "";
}

async function loadMenu() {
  elements.statusMessage.textContent = "Loading menu...";

  try {
    const response = await fetch("data/menu.json");
    if (!response.ok) throw new Error("Could not load menu data.");

    state.menu = await response.json();
    renderFilters();
    renderMenu();
    renderCart();
    elements.statusMessage.textContent = "Menu loaded successfully.";
  } catch (error) {
    elements.statusMessage.textContent = "Could not load the menu. Run the project with Live Server.";
    elements.statusMessage.classList.add("error");
    console.error(error);
  }
}

elements.searchInput.addEventListener("input", (event) => {
  state.query = event.target.value;
  renderMenu();
});

elements.categoryFilters.addEventListener("click", (event) => {
  const button = event.target.closest("[data-category]");
  if (!button) return;

  state.category = button.dataset.category;
  renderFilters();
  renderMenu();
});

elements.menuGrid.addEventListener("click", (event) => {
  const button = event.target.closest("[data-add]");
  if (!button) return;

  addToCart(Number(button.dataset.add));
});

elements.cartItems.addEventListener("click", (event) => {
  const increase = event.target.closest("[data-increase]");
  const decrease = event.target.closest("[data-decrease]");
  const remove = event.target.closest("[data-remove]");

  if (increase) changeQuantity(Number(increase.dataset.increase), 1);
  if (decrease) changeQuantity(Number(decrease.dataset.decrease), -1);

  if (remove) {
    state.cart = state.cart.filter((item) => item.id !== Number(remove.dataset.remove));
    saveCart();
    renderCart();
  }
});

elements.cartButton.addEventListener("click", openCart);
elements.closeCart.addEventListener("click", closeCart);
elements.cartOverlay.addEventListener("click", closeCart);

elements.checkoutButton.addEventListener("click", () => {
  if (!state.cart.length) return;
  elements.checkoutMessage.textContent = "Demo checkout: your order is ready to place!";
});

document.addEventListener("keydown", (event) => {
  if (event.key === "Escape") closeCart();
});


const checkoutDialog = document.querySelector("#checkoutDialog");
const checkoutForm = document.querySelector("#checkoutForm");
const closeCheckoutButton = document.querySelector("#closeCheckout");
const checkoutTotal = document.querySelector("#checkoutTotal");
const paymentStatus = document.querySelector("#paymentStatus");

function getCartTotal() {
  return getCartItems().reduce((sum, item) => sum + item.price * item.quantity, 0);
}

function openCheckout() {
  if (!state.cart.length) {
    elements.checkoutMessage.textContent = "Add at least one item before checkout.";
    return;
  }
  checkoutTotal.textContent = money(getCartTotal());
  paymentStatus.textContent = "";
  checkoutDialog.showModal();
}

elements.checkoutButton.addEventListener("click", openCheckout);
closeCheckoutButton.addEventListener("click", () => checkoutDialog.close());

checkoutForm.addEventListener("submit", (event) => {
  event.preventDefault();

  const name = document.querySelector("#customerName").value.trim();
  const phone = document.querySelector("#customerPhone").value.trim();
  const location = document.querySelector("#deliveryLocation").value;
  const address = document.querySelector("#deliveryAddress").value.trim();
  const method = document.querySelector('input[name="paymentMethod"]:checked')?.value;

  if (name.length < 2 || !phone || !location || !address || !method) {
    paymentStatus.textContent = "Please complete all delivery and payment fields.";
    return;
  }

  paymentStatus.textContent = "Processing payment...";

  setTimeout(() => {
    const orderNumber = `AE-${Math.floor(10000 + Math.random() * 90000)}`;
    const total = getCartTotal();

    localStorage.setItem("addisEatsLastOrder", JSON.stringify({
      orderNumber, name, phone, location, address, method, total,
      createdAt: new Date().toISOString()
    }));

    paymentStatus.innerHTML = `
      <span class="success-box">
        <strong>✅ Payment Successful!</strong><br>
        Order <strong>${orderNumber}</strong> confirmed.<br>
        Delivery: ${escapeHtml(location)} — ${escapeHtml(address)}<br>
        Total: <strong>${money(total)}</strong>
      </span>
    `;

    state.cart = [];
    saveCart();
    renderCart();
    checkoutForm.reset();
  }, 1200);
});

loadMenu();
