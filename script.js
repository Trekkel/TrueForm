
const products = [
    {
        id: 1,
        name: "Classic Tee",
        price: 59.99,
        category: "clothing",
        description: "A classic everyday t-shirt. Simple, comfortable and made to express yourself."
    },
    {
        id: 2,
        name: "Oversized Tee",
        price: 69.99,
        category: "clothing",
        description: "An oversized t-shirt with a relaxed fit for everyday comfort."
    },
    {
        id: 3,
        name: "Be Yourself Tee",
        price: 64.99,
        category: "clothing",
        description: "A t-shirt with a simple message: be yourself."
    },
    {
        id: 4,
        name: "Essential Hoodie",
        price: 129.99,
        category: "clothing",
        description: "A comfortable hoodie for everyday wear."
    },
    {
        id: 5,
        name: "Blooming Hoodie",
        price: 139.99,
        category: "clothing",
        description: "A hoodie made for comfort and self-expression."
    },
    {
        id: 6,
        name: "Oversized Sweatshirt",
        price: 119.99,
        category: "clothing",
        description: "A relaxed sweatshirt with an oversized fit."
    },
    {
        id: 7,
        name: "Tote Bag",
        price: 39.99,
        category: "accessories",
        description: "A practical tote bag for your everyday essentials."
    },
    {
        id: 8,
        name: "Blooming Cap",
        price: 44.99,
        category: "accessories",
        description: "A simple cap to complete your everyday outfit."
    },
    {
        id: 9,
        name: "Classic Socks",
        price: 24.99,
        category: "accessories",
        description: "Comfortable socks for everyday use."
    },
    {
        id: 10,
        name: "Sticker Pack",
        price: 14.99,
        category: "stickers",
        description: "A pack of stickers to decorate your favourite things."
    },
    {
        id: 11,
        name: "Keychain",
        price: 19.99,
        category: "accessories",
        description: "A small accessory to carry with you."
    },
    {
        id: 12,
        name: "Blooming Mug",
        price: 34.99,
        category: "accessories",
        description: "A mug for your favourite drinks."
    }
];

const pageDetails = {
    home: {
        title: "Our Collection",
        description: "Find something that feels like you."
    },
    transmasc: {
        title: "Transmasc Collection",
        description: "Explore our clothing collection."
    },
    transfem: {
        title: "Transfem Collection",
        description: "Explore our clothing collection."
    },
    accessories: {
        title: "Accessories",
        description: "Little details that make a difference."
    },
    stickers: {
        title: "Stickers",
        description: "Add some personality to your things."
    },
    about: {
        title: "About Us"
    },
    contact: {
        title: "Contact"
    },
    privacy: {
        title: "Privacy Policy"
    },
    terms: {
        title: "Terms & Conditions"
    }
};

const informationPages = {
    about: `
        <h2>About Us</h2>
        <p>The Blooming Cheese is a brand built around self-expression,
        individuality and being comfortable with who you are.</p>
        <p>Our goal is to create a space where everyone can express themselves.</p>
        <p><strong>Be true to you.</strong></p>
    `,
    contact: `
        <h2>Contact</h2>
        <p>Have a question? Get in touch with us.</p>
        <p>Email: YOUR-EMAIL@example.com</p>
        <p>Replace this address with your real contact email before publishing.</p>
    `,
    privacy: `
        <h2>Privacy Policy</h2>
        <p>This is a draft privacy policy for the demo store.</p>
        <p>Before launching a real store, add accurate information about
        what personal data is collected, why it is collected, how long
        it is stored and how customers can exercise their rights.</p>
    `,
    terms: `
        <h2>Terms & Conditions</h2>
        <p>This is a draft terms and conditions page.</p>
        <p>Before selling products, add your real seller information,
        delivery rules, payment terms, returns policy and other required
        consumer information.</p>
    `
};

const productsContainer = document.getElementById("products");
const searchInput = document.getElementById("searchInput");
const noProducts = document.getElementById("noProducts");
const hero = document.getElementById("hero");
const shopSection = document.getElementById("shopSection");
const gallerySection = document.getElementById("gallerySection");

let selectedCategory = "home";
let cart = [];
let selectedProduct = null;

/* PRODUCT FILTERING */

function getProductsForPage(page) {
    if (page === "home") {
        return products;
    }

    if (page === "transmasc" || page === "transfem") {
        return products.filter(product => product.category === "clothing");
    }

    if (page === "accessories" || page === "stickers") {
        return products.filter(product => product.category === page);
    }

    return [];
}

/* DISPLAY PRODUCTS */

function displayProducts() {
    const searchText = searchInput.value.toLowerCase().trim();

    const filteredProducts = getProductsForPage(selectedCategory)
        .filter(product => product.name.toLowerCase().includes(searchText));

    productsContainer.innerHTML = "";

    filteredProducts.forEach(product => {
        const card = document.createElement("article");
        card.className = "product";

        card.innerHTML = `
            <div class="product-artwork">
                <span>${product.name}</span>
            </div>
            <div class="product-info">
                <h3>${product.name}</h3>
                <p>${product.price.toFixed(2)} zł</p>
            </div>
        `;

        card.addEventListener("click", () => openProduct(product.id));
        productsContainer.appendChild(card);
    });

    noProducts.hidden = filteredProducts.length !== 0;
}

searchInput.addEventListener("input", displayProducts);

/* PAGE NAVIGATION */

function changePage(page) {
    if (!pageDetails[page]) return;

    selectedCategory = page;

    document.getElementById("pageTitle").textContent = pageDetails[page].title;
    document.getElementById("pageDescription").textContent =
        pageDetails[page].description || "";

    const isInformationPage = Object.hasOwn(informationPages, page);

    hero.style.display = page === "home" ? "flex" : "none";
    searchInput.style.display = isInformationPage ? "none" : "block";
    gallerySection.style.display = isInformationPage ? "none" : "block";

    if (isInformationPage) {
        productsContainer.innerHTML = `
            <div class="information-page">
                ${informationPages[page]}
            </div>
        `;
        noProducts.hidden = true;
    } else {
        displayProducts();
    }

    document.querySelectorAll("[data-page]").forEach(link => {
        link.classList.toggle(
            "active",
            link.dataset.page === page && link.classList.contains("category")
        );
    });

    window.scrollTo({ top: 0, behavior: "smooth" });
}

document.querySelectorAll("[data-page]").forEach(link => {
    link.addEventListener("click", event => {
        event.preventDefault();
        changePage(link.dataset.page);
    });
});

document.getElementById("shopNow").addEventListener("click", () => {
    shopSection.scrollIntoView({ behavior: "smooth" });
});

/* PRODUCT MODAL */

const productModal = document.getElementById("productModal");
const modalClose = document.getElementById("modalClose");
const modalArtwork = document.getElementById("modalArtwork");
const modalTitle = document.getElementById("modalTitle");
const modalPrice = document.getElementById("modalPrice");
const modalDescription = document.getElementById("modalDescription");
const modalSize = document.getElementById("modalSize");
const sizeContainer = document.getElementById("sizeContainer");

function openProduct(id) {
    selectedProduct = products.find(product => product.id === id);

    if (!selectedProduct) return;

    modalTitle.textContent = selectedProduct.name;
    modalPrice.textContent = selectedProduct.price.toFixed(2) + " zł";
    modalDescription.textContent = selectedProduct.description;
    modalArtwork.textContent = selectedProduct.name;

    sizeContainer.style.display =
        selectedProduct.category === "clothing" ? "block" : "none";

    modalSize.value = "";

    productModal.classList.add("open");
}

function closeProduct() {
    productModal.classList.remove("open");
}

modalClose.addEventListener("click", closeProduct);

productModal.addEventListener("click", event => {
    if (event.target === productModal) closeProduct();
});

/* CART */

const cartOverlay = document.getElementById("cartOverlay");
const cartButton = document.getElementById("cartButton");
const closeCart = document.getElementById("closeCart");
const cartItems = document.getElementById("cartItems");
const cartCount = document.getElementById("cartCount");
const cartTotal = document.getElementById("cartTotal");

document.getElementById("modalAddButton").addEventListener("click", () => {
    if (!selectedProduct) return;

    let size = "";

    if (selectedProduct.category === "clothing") {
        size = modalSize.value;

        if (!size) {
            alert("Please choose a size.");
            return;
        }
    }

    cart.push({
        ...selectedProduct,
        size,
        cartId: Date.now() + Math.random()
    });

    updateCart();
    closeProduct();
});

function updateCart() {
    cartItems.innerHTML = "";

    let total = 0;

    cart.forEach(item => {
        total += item.price;

        const cartItem = document.createElement("div");
        cartItem.className = "cart-item";

        cartItem.innerHTML = `
            <div>
                <h4>${item.name}</h4>
                <p>${item.size ? "Size: " + item.size + " · " : ""}${item.price.toFixed(2)} zł</p>
            </div>
            <button class="remove-item" data-id="${item.cartId}">
                Remove
            </button>
        `;

        cartItems.appendChild(cartItem);
    });

    cartCount.textContent = cart.length;
    cartTotal.textContent = total.toFixed(2) + " zł";

    document.querySelectorAll(".remove-item").forEach(button => {
        button.addEventListener("click", () => {
            const id = Number(button.dataset.id);
            cart = cart.filter(item => item.cartId !== id);
            updateCart();
        });
    });

    if (cart.length === 0) {
        cartItems.innerHTML = "<p>Your cart is empty.</p>";
    }
}

cartButton.addEventListener("click", () => {
    cartOverlay.classList.add("open");
});

closeCart.addEventListener("click", () => {
    cartOverlay.classList.remove("open");
});

cartOverlay.addEventListener("click", event => {
    if (event.target === cartOverlay) {
        cartOverlay.classList.remove("open");
    }
});

document.getElementById("checkoutButton").addEventListener("click", () => {
    if (cart.length === 0) {
        alert("Your cart is empty.");
        return;
    }

    alert("This is a demo store. Online payments are not connected yet.");
});

/* GALLERY */

const galleryImages = [
    "images/gallery1.jpg",
    "images/gallery2.jpg",
    "images/gallery3.jpg"
];

let currentGalleryImage = 0;

const galleryImage = document.getElementById("galleryImage");
const galleryPrev = document.getElementById("galleryPrev");
const galleryNext = document.getElementById("galleryNext");
const galleryDots = document.querySelectorAll(".gallery-dot");

function updateGallery() {
    galleryImage.src = galleryImages[currentGalleryImage];

    galleryDots.forEach((dot, index) => {
        dot.classList.toggle("active", index === currentGalleryImage);
    });
}

galleryNext.addEventListener("click", () => {
    currentGalleryImage =
        (currentGalleryImage + 1) % galleryImages.length;

    updateGallery();
});

galleryPrev.addEventListener("click", () => {
    currentGalleryImage =
        (currentGalleryImage - 1 + galleryImages.length) % galleryImages.length;

    updateGallery();
});

/* INITIAL LOAD */

displayProducts();
updateCart();
