
const products = [
    {id: 1, name: "Classic Tee", price: 59.99, category: "clothing", description: "A classic everyday t-shirt. Simple, comfortable and made for expressing yourself."},
    {id: 2, name: "Oversized Tee", price: 69.99, category: "clothing", description: "An oversized t-shirt with a relaxed fit."},
    {id: 3, name: "Be Yourself Tee", price: 64.99, category: "clothing", description: "A t-shirt reminding you to always be yourself."},
    {id: 4, name: "Essential Hoodie", price: 129.99, category: "clothing", description: "A comfortable hoodie for everyday wear."},
    {id: 5, name: "Blooming Hoodie", price: 139.99, category: "clothing", description: "A hoodie inspired by growth and self-expression."},
    {id: 6, name: "Oversized Sweatshirt", price: 119.99, category: "clothing", description: "A relaxed sweatshirt for everyday outfits."},
    {id: 7, name: "Tote Bag", price: 39.99, category: "accessories", description: "A practical tote bag for your everyday essentials."},
    {id: 8, name: "Blooming Cap", price: 44.99, category: "accessories", description: "A cap to complete your outfit."},
    {id: 9, name: "Classic Socks", price: 24.99, category: "accessories", description: "Comfortable everyday socks."},
    {id: 10, name: "Sticker Pack", price: 14.99, category: "stickers", description: "A pack of stickers to decorate your belongings."},
    {id: 11, name: "Keychain", price: 19.99, category: "accessories", description: "A small accessory for your keys or bag."},
    {id: 12, name: "Blooming Mug", price: 34.99, category: "accessories", description: "A mug for your favourite drinks."}
];

const pageDetails = {
    home: {
        title: "All Products",
        description: "Find something that feels like you.",
        category: "all"
    },
    transmasc: {
        title: "Transmasc Collection",
        description: "Explore the collection.",
        category: "clothing"
    },
    transfem: {
        title: "Transfem Collection",
        description: "Explore the collection.",
        category: "clothing"
    },
    accessories: {
        title: "Accessories",
        description: "Small details, big expression.",
        category: "accessories"
    },
    stickers: {
        title: "Stickers",
        description: "Add a little personality.",
        category: "stickers"
    }
};

const infoPages = {
    about: {
        title: "About Us",
        text: "The Blooming Cheese is a creative clothing and accessories store built around self-expression. Be true to you."
    },
    contact: {
        title: "Contact",
        text: "Have a question? Contact us at YOUR-EMAIL@example.com. Replace this address with your real store email."
    },
    privacy: {
        title: "Privacy Policy",
        text: "This is a demo privacy policy page. Before launching the store, add a complete policy describing what customer data is collected, how it is used, and how it is protected."
    },
    terms: {
        title: "Terms & Conditions",
        text: "This is a demo terms page. Add your real store terms, delivery rules, returns policy and payment information before launching."
    }
};

let currentPage = "home";
let previousPage = "home";
let selectedProduct = null;
let cart = [];

const productsContainer = document.getElementById("products");
const searchInput = document.getElementById("searchInput");

function renderProducts() {
    const page = pageDetails[currentPage];
    const search = searchInput.value.toLowerCase();

    const filtered = products.filter(product => {
        const categoryMatch =
            page.category === "all" ||
            product.category === page.category;

        const searchMatch = product.name.toLowerCase().includes(search);

        return categoryMatch && searchMatch;
    });

    productsContainer.innerHTML = "";

    filtered.forEach(product => {
        const card = document.createElement("div");
        card.className = "product-card";

        card.innerHTML = `
            <div class="product-artwork">${product.name}</div>
            <h3>${product.name}</h3>
            <p>${product.price.toFixed(2)} zł</p>
        `;

        card.addEventListener("click", () => openProductPage(product.id));
        productsContainer.appendChild(card);
    });

    document.getElementById("noProducts").style.display =
        filtered.length ? "none" : "block";
}

function setPage(page) {
    if (!pageDetails[page]) return;

    currentPage = page;

    document.getElementById("homePage").classList.toggle("hidden", page !== "home");
    document.getElementById("shopSection").classList.remove("hidden");
    document.getElementById("gallerySection").classList.toggle("hidden", page !== "home");
    document.getElementById("productPage").classList.add("hidden");
    document.getElementById("infoPage").classList.add("hidden");

    document.getElementById("pageTitle").textContent = pageDetails[page].title;
    document.getElementById("pageDescription").textContent = pageDetails[page].description;

    searchInput.value = "";
    renderProducts();
    closeMenu();

    window.scrollTo(0, 0);
}

function openProductPage(id) {
    selectedProduct = products.find(product => product.id === id);

    if (!selectedProduct) return;

    previousPage = currentPage;

    document.getElementById("homePage").classList.add("hidden");
    document.getElementById("shopSection").classList.add("hidden");
    document.getElementById("gallerySection").classList.add("hidden");
    document.getElementById("infoPage").classList.add("hidden");
    document.getElementById("productPage").classList.remove("hidden");

    document.getElementById("detailArtwork").textContent = selectedProduct.name;
    document.getElementById("detailTitle").textContent = selectedProduct.name;
    document.getElementById("detailPrice").textContent =
        selectedProduct.price.toFixed(2) + " zł";
    document.getElementById("detailDescription").textContent =
        selectedProduct.description;

    document.getElementById("detailSizeWrap").style.display =
        selectedProduct.category === "clothing" ? "block" : "none";

    document.getElementById("detailSize").value = "";

    window.scrollTo(0, 0);
}

document.getElementById("backToProducts").addEventListener("click", () => {
    setPage(previousPage);
});

document.getElementById("detailAddButton").addEventListener("click", () => {
    if (!selectedProduct) return;

    let size = "";

    if (selectedProduct.category === "clothing") {
        size = document.getElementById("detailSize").value;

        if (!size) {
            alert("Please select a size.");
            return;
        }
    }

    cart.push({
        ...selectedProduct,
        size,
        cartId: Date.now() + Math.random()
    });

    updateCart();
    openCart();
});

// MENU

const sideMenu = document.getElementById("sideMenu");
const menuBackdrop = document.getElementById("menuBackdrop");

function openMenu() {
    sideMenu.classList.add("open");
    menuBackdrop.classList.add("open");
}

function closeMenu() {
    sideMenu.classList.remove("open");
    menuBackdrop.classList.remove("open");
}

document.getElementById("menuToggle").addEventListener("click", openMenu);
document.getElementById("closeMenu").addEventListener("click", closeMenu);
menuBackdrop.addEventListener("click", closeMenu);

document.querySelectorAll("[data-page]").forEach(button => {
    button.addEventListener("click", event => {
        event.preventDefault();
        setPage(button.dataset.page);
    });
});

document.getElementById("homeLogo").addEventListener("click", event => {
    event.preventDefault();
    setPage("home");
});

// SEARCH

searchInput.addEventListener("input", renderProducts);

// CART

function updateCart() {
    const cartItems = document.getElementById("cartItems");
    cartItems.innerHTML = "";

    let total = 0;

    cart.forEach(item => {
        total += item.price;

        const element = document.createElement("div");
        element.className = "cart-item";

        const sizeText = item.size ? `Size: ${item.size}` : "";

        element.innerHTML = `
            <div>
                <strong>${item.name}</strong>
                <p>${sizeText}</p>
                <p>${item.price.toFixed(2)} zł</p>
            </div>
            <button data-remove="${item.cartId}">Remove</button>
        `;

        cartItems.appendChild(element);
    });

    document.getElementById("cartTotal").textContent =
        total.toFixed(2) + " zł";

    document.getElementById("cartCount").textContent = cart.length;

    cartItems.querySelectorAll("[data-remove]").forEach(button => {
        button.addEventListener("click", () => {
            cart = cart.filter(item =>
                item.cartId !== Number(button.dataset.remove)
            );
            updateCart();
        });
    });
}

function openCart() {
    document.getElementById("cartOverlay").classList.add("open");
}

function closeCart() {
    document.getElementById("cartOverlay").classList.remove("open");
}

document.getElementById("cartButton").addEventListener("click", openCart);
document.getElementById("closeCart").addEventListener("click", closeCart);

document.getElementById("cartOverlay").addEventListener("click", event => {
    if (event.target.id === "cartOverlay") closeCart();
});

document.getElementById("checkoutButton").addEventListener("click", () => {
    if (cart.length === 0) {
        alert("Your cart is empty.");
        return;
    }

    alert("Checkout is not connected yet. This is a demo store.");
});

// GALLERY

const galleryImages = [
    "images/gallery1.jpg",
    "images/gallery2.jpg",
    "images/gallery3.jpg"
];

let galleryIndex = 0;

function showGalleryImage() {
    document.getElementById("galleryImage").src =
        galleryImages[galleryIndex];

    const dots = document.getElementById("galleryDots");
    dots.innerHTML = "";

    galleryImages.forEach((image, index) => {
        const dot = document.createElement("button");
        dot.className = "gallery-dot" +
            (index === galleryIndex ? " active" : "");

        dot.addEventListener("click", () => {
            galleryIndex = index;
            showGalleryImage();
        });

        dots.appendChild(dot);
    });
}

document.getElementById("galleryPrev").addEventListener("click", () => {
    galleryIndex =
        (galleryIndex - 1 + galleryImages.length) % galleryImages.length;
    showGalleryImage();
});

document.getElementById("galleryNext").addEventListener("click", () => {
    galleryIndex = (galleryIndex + 1) % galleryImages.length;
    showGalleryImage();
});

// INFORMATION PAGES

document.querySelectorAll("[data-info]").forEach(link => {
    link.addEventListener("click", event => {
        event.preventDefault();

        const page = infoPages[link.dataset.info];
        if (!page) return;

        document.getElementById("homePage").classList.add("hidden");
        document.getElementById("shopSection").classList.add("hidden");
        document.getElementById("gallerySection").classList.add("hidden");
        document.getElementById("productPage").classList.add("hidden");
        document.getElementById("infoPage").classList.remove("hidden");

        document.getElementById("infoTitle").textContent = page.title;
        document.getElementById("infoText").textContent = page.text;

        window.scrollTo(0, 0);
    });
});

document.getElementById("backFromInfo").addEventListener("click", () => {
    setPage("home");
});

// START

setPage("home");
showGalleryImage();
updateCart();
