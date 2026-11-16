
const categoryButtons = document.querySelectorAll(".category");
const products = document.querySelectorAll(".product");
const searchInput = document.getElementById("searchInput");
const noProducts = document.getElementById("noProducts");

let selectedCategory = "all";
let cart = [];
let selectedProduct = null;

// PRODUCT FILTERING

function filterProducts() {
    const searchText = searchInput.value.toLowerCase();
    let visibleCount = 0;

    products.forEach(product => {
        const matchesCategory =
            selectedCategory === "all" ||
            product.dataset.category === selectedCategory;

        const matchesSearch =
            product.dataset.name.toLowerCase().includes(searchText);

        product.style.display =
            matchesCategory && matchesSearch ? "" : "none";

        if (matchesCategory && matchesSearch) visibleCount++;
    });

    noProducts.hidden = visibleCount !== 0;
}

categoryButtons.forEach(button => {
    button.addEventListener("click", () => {
        categoryButtons.forEach(btn => btn.classList.remove("active"));
        button.classList.add("active");

        selectedCategory = button.dataset.category;
        filterProducts();
    });
});

searchInput.addEventListener("input", filterProducts);


// PRODUCT PREVIEW

const productModal = document.getElementById("productModal");
const modalClose = document.getElementById("modalClose");
const modalImage = document.getElementById("modalImage");
const modalArtwork = document.getElementById("modalArtwork");
const modalTitle = document.getElementById("modalTitle");
const modalPrice = document.getElementById("modalPrice");
const modalDescription = document.getElementById("modalDescription");
const modalSize = document.getElementById("modalSize");
const sizeContainer = document.getElementById("sizeContainer");
const modalAddButton = document.getElementById("modalAddButton");

function openProduct(product) {
    selectedProduct = product;

    const image = product.querySelector(".product-image");

    modalImage.className = "modal-image product-image";

    image.classList.forEach(className => {
        if (className !== "product-image") {
            modalImage.classList.add(className);
        }
    });

    modalArtwork.innerHTML = "";

    const artwork = image.querySelector(
        ".shirt, .hoodie, .bag, .stickers, .cap, .keychain, .socks, .mug"
    );

    if (artwork) {
        modalArtwork.appendChild(artwork.cloneNode(true));
    }

    modalTitle.textContent = product.dataset.name;

    modalPrice.textContent =
        "$" + Number(product.dataset.price).toFixed(2);

    modalDescription.textContent = product.dataset.description;

    const sizes = product.dataset.sizes;

    sizeContainer.hidden = !sizes;
    modalSize.innerHTML = '<option value="">Choose a size</option>';

    if (sizes) {
        sizes.split(",").forEach(size => {
            const option = document.createElement("option");
            option.value = size;
            option.textContent = size;
            modalSize.appendChild(option);
        });
    }

    productModal.classList.add("open");
    document.body.style.overflow = "hidden";
}

products.forEach(product => {
    product.addEventListener("click", () => openProduct(product));
});

function closeProduct() {
    productModal.classList.remove("open");
    document.body.style.overflow = "";
    selectedProduct = null;
}

modalClose.addEventListener("click", closeProduct);

productModal.addEventListener("click", event => {
    if (event.target === productModal) closeProduct();
});


// SHOPPING CART

const cartButton = document.getElementById("cartButton");
const cartOverlay = document.getElementById("cartOverlay");
const closeCart = document.getElementById("closeCart");
const cartItems = document.getElementById("cartItems");
const cartCount = document.getElementById("cartCount");
const cartTotal = document.getElementById("cartTotal");
const checkoutButton = document.getElementById("checkoutButton");

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


// ADD TO CART

modalAddButton.addEventListener("click", () => {
    if (!selectedProduct) return;

    const sizes = selectedProduct.dataset.sizes;
    const size = sizes ? modalSize.value : "";

    if (sizes && !size) {
        alert("Please select a product size!");
        return;
    }

    const name = selectedProduct.dataset.name;
    const price = Number(selectedProduct.dataset.price);

    const existingProduct = cart.find(item =>
        item.name === name && item.size === size
    );

    if (existingProduct) {
        existingProduct.quantity++;
    } else {
        cart.push({
            name,
            price,
            size,
            quantity: 1
        });
    }

    updateCart();
    closeProduct();
    cartOverlay.classList.add("open");
});


// UPDATE CART

function updateCart() {
    cartItems.innerHTML = "";

    if (cart.length === 0) {
        cartItems.innerHTML =
            '<p class="empty-cart">Your cart is empty.</p>';
    }

    let total = 0;
    let count = 0;

    cart.forEach((item, index) => {
        total += item.price * item.quantity;
        count += item.quantity;

        const cartItem = document.createElement("div");
        cartItem.className = "cart-item";

        const info = document.createElement("span");

        info.textContent =
            item.name +
            (item.size ? " | Size: " + item.size : "") +
            " × " + item.quantity;

        const right = document.createElement("div");

        const price = document.createElement("strong");

        price.textContent =
            "$" + (item.price * item.quantity).toFixed(2);

        const remove = document.createElement("button");
        remove.className = "remove-item";
        remove.textContent = "Remove";

        remove.addEventListener("click", () => {
            cart.splice(index, 1);
            updateCart();
        });

        right.append(price, document.createElement("br"), remove);
        cartItem.append(info, right);
        cartItems.appendChild(cartItem);
    });

    cartCount.textContent = count;

    cartTotal.textContent = "$" + total.toFixed(2);
}


// CHECKOUT

checkoutButton.addEventListener("click", () => {
    if (cart.length === 0) {
        alert("Your cart is empty!");
        return;
    }

    alert(
        "Thank you for your interest in TrueForm! " +
        "The ordering and payment system is not available yet."
    );
});


// ESCAPE KEY CLOSES WINDOWS

document.addEventListener("keydown", event => {
    if (event.key === "Escape") {
        closeProduct();
        cartOverlay.classList.remove("open");
    }
});
