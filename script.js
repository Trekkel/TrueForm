
const products = [
  {
    id: 1,
    name: "Everyday Tee",
    price: 69,
    category: "tops",
    gender: "girls",
    color: "pink",
    tag: "BESTSELLER"
  },
  {
    id: 2,
    name: "Soft Form Hoodie",
    price: 149,
    category: "hoodies",
    gender: "boys",
    color: "blue",
    tag: "NEW"
  },
  {
    id: 3,
    name: "Be Yourself Tee",
    price: 79,
    category: "tops",
    gender: "girls",
    color: "sand",
    tag: "TRUEFORM PICK"
  },
  {
    id: 4,
    name: "Everyday Tote",
    price: 39,
    category: "accessories",
    gender: "girls",
    color: "pink",
    tag: ""
  },
  {
    id: 5,
    name: "No Labels Hoodie",
    price: 159,
    category: "hoodies",
    gender: "boys",
    color: "sand",
    tag: "LIMITED"
  },
  {
    id: 6,
    name: "True Colors Tee",
    price: 75,
    category: "tops",
    gender: "boys",
    color: "blue",
    tag: "NEW"
  }
];

let activeFilter = "all";
let activeGender = "all";
let cart = [];

const grid = document.getElementById("productGrid");
const searchInput = document.getElementById("searchInput");

function renderProducts() {
  const query = searchInput.value.toLowerCase().trim();

  const filtered = products.filter(product => {
    const matchesCategory =
      activeFilter === "all" ||
      product.category === activeFilter;

    const matchesGender =
      activeGender === "all" ||
      product.gender === activeGender;

    const matchesSearch =
      product.name.toLowerCase().includes(query);

    return matchesCategory && matchesGender && matchesSearch;
  });

  grid.innerHTML = filtered.length
    ? filtered.map(product => `
      <article class="product-card">

        <div class="product-visual ${product.color}">
          ${product.tag
            ? `<span class="product-tag">${product.tag}</span>`
            : ""}

          <div class="product-shape">TRUEFORM</div>
        </div>

        <div class="product-info">
          <strong>${product.name}</strong>
          <span>${product.price},00 zł</span>
        </div>

        <div class="product-meta">
          <span>
            ${product.category === "tops"
              ? "Koszulka"
              : product.category === "hoodies"
              ? "Bluza"
              : "Dodatek"}
          </span>

          <button
            class="add-button"
            onclick="addToCart(${product.id})">
            DODAJ +
          </button>
        </div>

      </article>
    `).join("")
    : `<p class="no-results">
        Nie znaleziono produktów. Spróbuj zmienić wyszukiwanie.
      </p>`;
}

function addToCart(id) {
  const product = products.find(item => item.id === id);

  const existing = cart.find(item => item.id === id);

  if (existing) {
    existing.quantity++;
  } else {
    cart.push({
      ...product,
      quantity: 1
    });
  }

  renderCart();
}

function removeFromCart(id) {
  cart = cart.filter(item => item.id !== id);
  renderCart();
}

function renderCart() {
  document.getElementById("cartCount").textContent =
    cart.reduce((sum, item) => sum + item.quantity, 0);

  const total = cart.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0
  );

  document.getElementById("cartTotal").textContent =
    total.toFixed(2).replace(".", ",") + " zł";

  const items = document.getElementById("cartItems");

  items.innerHTML = cart.length
    ? cart.map(item => `
      <div class="cart-row">

        <div>
          <strong>${item.name}</strong>
          <br>
          <small>${item.quantity} × ${item.price},00 zł</small>
        </div>

        <button onclick="removeFromCart(${item.id})">
          Usuń
        </button>

      </div>
    `).join("")
    : `<p class="empty-cart">Twój koszyk jest pusty.</p>`;
}

// FILTROWANIE PRODUKTÓW

document.querySelectorAll(".filter").forEach(button => {
  button.addEventListener("click", () => {

    activeFilter = button.dataset.filter;

    document.querySelectorAll(".filter").forEach(item => {
      item.classList.toggle("active", item === button);
    });

    renderProducts();
  });
});

// WYBÓR KOLEKCJI

document.querySelectorAll(".collection-card").forEach(card => {
  card.addEventListener("click", () => {

    activeGender = card.dataset.gender;
    activeFilter = "all";
    searchInput.value = "";

    document.querySelectorAll(".filter").forEach(button => {
      button.classList.toggle(
        "active",
        button.dataset.filter === "all"
      );
    });

    document.getElementById("activeCollection").textContent =
      activeGender === "girls"
        ? "KOLEKCJA DZIEWCZĘCA"
        : "KOLEKCJA CHŁOPIĘCA";

    document.getElementById("shop").scrollIntoView({
      behavior: "smooth"
    });

    renderProducts();
  });
});

// POKAŻ WSZYSTKIE PRODUKTY

document.getElementById("showAll").addEventListener("click", () => {

  activeGender = "all";
  activeFilter = "all";
  searchInput.value = "";

  document.getElementById("activeCollection").textContent =
    "CAŁY SKLEP";

  document.querySelectorAll(".filter").forEach(button => {
    button.classList.toggle(
      "active",
      button.dataset.filter === "all"
    );
  });

  renderProducts();
});

// WYSZUKIWARKA

searchInput.addEventListener("input", renderProducts);

// KOSZYK

const overlay = document.getElementById("cartOverlay");

document.getElementById("cartToggle").addEventListener("click", () => {
  overlay.classList.add("open");
});

document.getElementById("closeCart").addEventListener("click", () => {
  overlay.classList.remove("open");
});

overlay.addEventListener("click", event => {
  if (event.target === overlay) {
    overlay.classList.remove("open");
  }
});

// PRZYCISK ZAMÓWIENIA

document.getElementById("checkout").addEventListener("click", () => {
  alert(
    "To wersja demonstracyjna sklepu. Płatności i zamówienia nie są jeszcze skonfigurowane."
  );
});

// START

renderProducts();
renderCart();

