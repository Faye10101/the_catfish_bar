const menuIcon = document.getElementById('menu-icon');
const dropdownMenu = document.getElementById('dropdown-menu');
if (menuIcon && dropdownMenu) {
    menuIcon.addEventListener('click', function() {
        dropdownMenu.classList.toggle('show');
    });
}

const searchInput = document.getElementById('search-input');
const filterBtn = document.getElementById('filter-icon');
const filterMenu = document.getElementById('filter-menu');
const tabBtn = document.querySelectorAll('.nav-bar .tag-button');
const tagBtn = document.querySelectorAll('#filter-menu .tag-button');

const webData = {
    drink: {
        best: [
            { name: 'Molly Rose Beer', img: 'assets/molly-rose-beer.jpg', tag: 'craft', id: 'gorn-fishin' },
            { name: 'Melbourne Black', img: 'assets/melbourne-black.jpg', tag: 'dark', id: 'melbourne-black' },
            { name: 'Apple Cider', img: 'assets/apple-cider.jpg', tag: 'sour', id: 'apple-cider' },
        ],
        latest: [
            { name: 'Sole Tarder Hazy', img: 'assets/sole-tarder-hazy.jpg', tag: 'craft', id: 'sole-tarder-hazy' },
            { name: 'Spicy Pickle Beer', img: 'assets/spicy-pickle-beer.jpg', tag: 'sour', id: 'spicy-pickle-beer' },
            { name: 'Jaegar - Fresh Hop 2026', img: 'assets/jaegar.png', tag: 'dark', id: 'jaegar-fresh-hop-2026' },
            { name: 'Whippy', img: 'assets/whippy.jpg', tag: 'craft', id: 'whippy' },
        ],
        seasonal: [
            { name: 'Berry Caramel Tart Sour', img: 'assets/tart-sour.jpg', tag: 'sour', id: 'berry-caramel-tart-sour' },
            { name: 'Pale Ale', img: 'assets/pale-ale.png', tag: 'craft', id: 'pale-ale' },
            { name: 'Hazelnut Brown', img: 'assets/hazelnut-brown.jpg', tag: 'dark', id: 'hazelnut-brown' },
            { name: 'Highwayman', img: 'assets/highwayman.jpg', tag: 'craft', id: 'highwayman' },
            { name: 'Pilsner', img: 'assets/pilsner.png', tag: 'craft', id: 'pilsner' },
        ]
    }
};

function showProducts(catagory) {
    const bestContainer = document.getElementById('group-best-seller');
    const latestContainer = document.getElementById('group-latest-arrived');
    const seasonalContainer = document.getElementById('group-seasonal');

    if (!webData[catagory]) return;

    const currentData = webData[catagory];

    function makeHtml(list) {
        let htmlContent = '';
        list.forEach(function(item) {
            htmlContent += `
                <a href="product.html?product=${item.id}" class="item-card-link">
                    <div class='item-card' data-tag='${item.tag}' data-name='${item.name.toLowerCase()}'>
                        <img src='${item.img}' alt='${item.name}'>
                        <p>${item.name}</p>
                    </div>
                </a>
            `;
        });
        return htmlContent;
    }

    if (bestContainer) bestContainer.innerHTML = makeHtml(currentData.best);
    if (latestContainer) latestContainer.innerHTML = makeHtml(currentData.latest);
    if (seasonalContainer) seasonalContainer.innerHTML = makeHtml(currentData.seasonal);
}

if (searchInput) {
    showProducts('drink');
    if (tabBtn[0]) {
        tabBtn[0].classList.add('active');
    }

    if (filterBtn && filterMenu) {
        filterBtn.addEventListener('click', function() {
            filterMenu.classList.toggle('hide');
        });
    }

    tabBtn.forEach(function(btn) {
        btn.addEventListener('click', function() {
            tabBtn.forEach(b => b.classList.remove('active'));
            btn.classList.add('active');
            const selectedCatagory = btn.getAttribute('data-tag');
            showProducts(selectedCatagory);
            tagBtn.forEach(t => t.classList.remove('active'));
        });
    });

    tagBtn.forEach(function(btn) {
        btn.addEventListener('click', function() {
            btn.classList.toggle('active');
            const activeTags = [];
            tagBtn.forEach(function(t) {
                if (t.classList.contains('active')) {
                    activeTags.push(t.getAttribute('data-tag'));
                }
            });

            const allCards = document.querySelectorAll('.item-card');
            allCards.forEach(function(card) {
                const cardTag = card.getAttribute('data-tag');
                const parentLink = card.closest('.item-card-link') || card;
                if (activeTags.length === 0 || activeTags.includes(cardTag)) {
                    parentLink.style.display = 'block';
                } else {
                    parentLink.style.display = 'none';
                }
            });
        });
    });

    searchInput.addEventListener('input', function() {
        const text = searchInput.value.toLowerCase().trim();
        const allCards = document.querySelectorAll('.item-card');
        allCards.forEach(function(card) {
            const name = card.getAttribute('data-name');
            const parentLink = card.closest('.item-card-link') || card;
            if (name.includes(text)) {
                parentLink.style.display = 'block';
            } else {
                parentLink.style.display = 'none';
            }
        });
    });
}

if (searchInput) {
    searchInput.addEventListener('keydown', function(event) {
        if (event.key === 'Enter') {
            const typedText = searchInput.value.trim();
            if (typedText.length > 0) {
                window.location.href = 'result.html?query=' + encodeURIComponent(typedText);
            }
        }
    });
}

const productCatalog = [
    {
        productId: "gorn-fishin",
        productName: "Gorn Fishin'",
        breweryName: "Molly Rose Brewing",
        style: "IPA - American",
        alcoholByVolume: "6.2%",
        category: "Beer",
        flavourTag: "craft",
        image: "assets/molly-rose-beer.jpg",
        smallSizePrice: 8.5,
        largeSizePrice: 16.5,
        description: "Classic Taste. Come And Try",
        moreInformation: "A shining melon and stonefruit core elevates this American IPA, with a lean malt profile that lets the hops shine and a moderately bitter, crisp finish. Brewed by the beloved Molly Rose team in Collingwood, this is a sessionable craft IPA that punches well above its weight. Pairs beautifully with spicy food or a lazy afternoon.",
        rating: 3.9,
        ratingCount: 4475
    },
    {
        productId: "apple-cider",
        productName: "Apple Cider",
        breweryName: "Napoleone Cider",
        style: "Cider - Traditional",
        alcoholByVolume: "4.7%",
        category: "Cider",
        flavourTag: "sour",
        image: "assets/apple-cider.jpg",
        smallSizePrice: 7.5,
        largeSizePrice: 12.5,
        description: "Crisp, Refreshing, Orchard Fresh",
        moreInformation: "Pressed from hand-picked Yarra Valley apples for a clean, lightly tart cider with a gentle sweetness and a dry, refreshing finish. Napoleone has been crafting cider in the Yarra Valley since the 1950s — this one tastes like it. Perfectly chilled on a warm Melbourne evening.",
        rating: 4.2,
        ratingCount: 2310
    },
    {
        productId: "melbourne-black",
        productName: "Melbourne Black",
        breweryName: "Nation Brewing Co",
        style: "Stout - Irish Dry",
        alcoholByVolume: "4.3%",
        category: "Beer",
        flavourTag: "dark",
        image: "assets/melbourne-black.jpg",
        smallSizePrice: 7.5,
        largeSizePrice: 14,
        description: "Smooth, Roasty, Sessionable",
        moreInformation: "A silky Irish dry stout with notes of coffee and dark chocolate, balanced by a soft, dry finish that keeps you coming back. At only 4.3% ABV, this is a dark beer you can drink all night. The roasted barley gives it depth without heaviness — the kind of stout that converts people who think they don't like stouts.",
        rating: 4.0,
        ratingCount: 1890
    },
    {
        productId: "pale-ale",
        productName: "Pale Ale",
        breweryName: "Spangled Drongo Brewing Company",
        style: "Pale Ale - Australian",
        alcoholByVolume: "4.5%",
        category: "Beer",
        flavourTag: "craft",
        image: "assets/pale-ale.png",
        smallSizePrice: 7,
        largeSizePrice: 13.5,
        description: "Easy Going, All Day Ale",
        moreInformation: "A balanced Australian pale ale with citrus and pine hop character over a clean malt base. Bright and very easy to drink. The Spangled Drongo team keeps things simple and does it well — no gimmicks, just a properly made pale that goes with everything. A crowd pleaser at the bar.",
        rating: 3.8,
        ratingCount: 1520
    },
    {
        productId: "berry-caramel-tart-sour",
        productName: "Berry Caramel Tart Sour",
        breweryName: "Gweilo Beer",
        style: "Sour - Fruited",
        alcoholByVolume: "4.9%",
        category: "Beer",
        flavourTag: "sour",
        image: "assets/tart-sour.jpg",
        smallSizePrice: 10,
        largeSizePrice: 19.5,
        description: "Tart, Sweet, Playful",
        moreInformation: "A fruited sour bursting with berry and a swirl of caramel sweetness, finishing with a bright, mouth-watering tartness. Gweilo's fruited sours have developed a cult following for good reason — they walk the line between dessert and sessionable drink. This one's like a berry tart in a glass, with just enough bite to keep things interesting.",
        rating: 4.4,
        ratingCount: 980
    },
    {
        productId: "sole-tarder-hazy",
        productName: "Sole Tarder Hazy",
        breweryName: "Sole Trader Brewing",
        style: "Hazy Pale Ale",
        alcoholByVolume: "5.0%",
        category: "Beer",
        flavourTag: "craft",
        image: "assets/sole-tarder-hazy.jpg",
        smallSizePrice: 8,
        largeSizePrice: 15,
        description: "Juicy, Soft, Hazy",
        moreInformation: "A soft and juicy hazy pale ale layered with tropical fruit aromatics and a pillowy mouthfeel. Low bitterness, big flavour. Think mango, passionfruit and peach — this is a hazy that doesn't try to hide it. Sole Trader keeps it unfiltered and unfined for that signature cloudy pour and lush texture.",
        rating: 4.1,
        ratingCount: 1340
    },
    {
        productId: "spicy-pickle-beer",
        productName: "Spicy Pickle Beer",
        breweryName: "Pickle Lane Brewing",
        style: "Gose - Spiced",
        alcoholByVolume: "4.2%",
        category: "Beer",
        flavourTag: "sour",
        image: "assets/spicy-pickle-beer.jpg",
        smallSizePrice: 7.5,
        largeSizePrice: 14,
        description: "Salty, Sour, A Little Wild",
        moreInformation: "A savoury gose with briny pickle character, a pinch of salt and a gentle chilli warmth. Strange on paper, addictive in the glass. This is the beer for adventurous drinkers. The sourness of the wheat base plays beautifully against the pickle brine and the slow heat of the chilli. One of the most-talked-about taps at The Catfish.",
        rating: 3.6,
        ratingCount: 760
    },
    {
        productId: "jaegar-fresh-hop-2026",
        productName: "Jaegar - Fresh Hop 2026",
        breweryName: "Jaegar Brewing",
        style: "Fresh Hop IPA",
        alcoholByVolume: "6.5%",
        category: "Beer",
        flavourTag: "dark",
        image: "assets/jaegar.png",
        smallSizePrice: 9,
        largeSizePrice: 17,
        description: "Bold, Fresh, Limited Run",
        moreInformation: "Brewed with freshly picked hops for a vivid, resinous aroma and a full-bodied bitterness. A seasonal release worth chasing. Fresh hop beers have a brief window — hops must be used within hours of harvest to capture that raw, green, grassy character. The 2026 vintage showcases Nelson Sauvin and Riwaka for a bold, wine-like finish.",
        rating: 4.3,
        ratingCount: 1120
    },
    {
        productId: "whippy",
        productName: "Whippy",
        breweryName: "Whippy Brewing",
        style: "Pastry Sour",
        alcoholByVolume: "5.5%",
        category: "Beer",
        flavourTag: "craft",
        image: "assets/whippy.jpg",
        smallSizePrice: 9.5,
        largeSizePrice: 18,
        description: "Dessert In A Glass",
        moreInformation: "A creamy pastry sour reminiscent of soft-serve, with vanilla sweetness balanced by a clean, lactic tang. Whippy Brewing takes inspiration from childhood soft-serve memories and builds it into a surprisingly sophisticated beer. Lactose-forward with real vanilla, finished with a gentle souring that stops it from being cloying.",
        rating: 4.0,
        ratingCount: 640
    },
    {
        productId: "hazelnut-brown",
        productName: "Hazelnut Brown",
        breweryName: "Brown Street Brewing",
        style: "Brown Ale - Nut",
        alcoholByVolume: "5.2%",
        category: "Beer",
        flavourTag: "dark",
        image: "assets/hazelnut-brown.jpg",
        smallSizePrice: 8,
        largeSizePrice: 15,
        description: "Warm, Nutty, Comforting",
        moreInformation: "A malty brown ale with toasted hazelnut and caramel notes, rounded off with a smooth, lightly sweet finish. Brown Street cold-infuse real hazelnuts into this dark ale for a nutty warmth that feels like an autumn evening. Rich without being heavy — the kind of beer that pairs perfectly with cheese or a quiet moment by yourself.",
        rating: 3.9,
        ratingCount: 870
    },
    {
        productId: "highwayman",
        productName: "Highwayman",
        breweryName: "Highwayman Brewing",
        style: "Amber Ale",
        alcoholByVolume: "5.8%",
        category: "Beer",
        flavourTag: "craft",
        image: "assets/highwayman.jpg",
        smallSizePrice: 8.5,
        largeSizePrice: 16,
        description: "Rich Malt, Bold Character",
        moreInformation: "A robust amber ale with caramel malt depth and a firm hop backbone. Full-flavoured without being heavy. Named after the bushrangers of the Victorian goldfields, the Highwayman is unapologetically bold. Crystal malt gives it a deep amber pour and a toffee sweetness that's kept in check by a solid hit of Centennial and Amarillo hops.",
        rating: 4.0,
        ratingCount: 1010
    },
    {
        productId: "pilsner",
        productName: "Pilsner",
        breweryName: "Catfish Brewing",
        style: "Pilsner - Czech",
        alcoholByVolume: "4.6%",
        category: "Beer",
        flavourTag: "craft",
        image: "assets/pilsner.png",
        smallSizePrice: 7,
        largeSizePrice: 13,
        description: "Clean, Crisp, Classic",
        moreInformation: "A Czech-style pilsner with a soft bready malt base, delicate floral hops and a clean, dry, refreshing finish. Our house pilsner, brewed in-house by the Catfish team. We lagered it for six weeks at near-freezing temps to get that crystal clarity and ultra-clean finish. If you want to taste what beer is supposed to taste like, start here.",
        rating: 4.1,
        ratingCount: 1450
    }
];

function findMatchingProducts(searchText) {
    const lowerCaseSearchText = searchText.toLowerCase().trim();
    if (lowerCaseSearchText === '') {
        return productCatalog;
    }
    return productCatalog.filter(function(product) {
        const searchableText = (
            product.productName + ' ' +
            product.breweryName + ' ' +
            product.style + ' ' +
            product.category + ' ' +
            product.flavourTag
        ).toLowerCase();
        return searchableText.includes(lowerCaseSearchText);
    });
}

function createProductCardHtml(product) {
    return `
        <a class='product-link' href='product.html?product=${product.productId}'>
            <article class='product-result-card'>
                <div class='product-image-wrapper'>
                    <img src='${product.image}' alt='${product.productName}'>
                </div>
                <div class='product-details'>
                    <p class='brewery-name'>${product.breweryName}</p>
                    <h2 class='product-name'>${product.productName}</h2>
                    <p class='product-style'>${product.style} · ${product.alcoholByVolume} ABV</p>
                    <div class='price-options'>
                        <span class='price-pill'>285ML · $${product.smallSizePrice}</span>
                        <span class='price-pill'>570ML · $${product.largeSizePrice}</span>
                    </div>
                </div>
            </article>
        </a>
    `;
}

const resultList = document.getElementById('result-list');
if (resultList) {
    const urlParameters = new URLSearchParams(window.location.search);
    const searchQuery = urlParameters.get('query') || '';

    const resultSearchInput = document.getElementById('result-input');
    if (resultSearchInput) {
        resultSearchInput.value = searchQuery;
        resultSearchInput.addEventListener('keydown', function(event) {
            if (event.key === 'Enter') {
                const typedText = resultSearchInput.value.trim();
                window.location.href = 'result.html?query=' + encodeURIComponent(typedText);
            }
        });
    }

    const matchingProducts = findMatchingProducts(searchQuery);
    const resultHeading = document.getElementById('result-heading');
    if (resultHeading) {
        if (searchQuery === '') {
            resultHeading.textContent = `Showing all ${matchingProducts.length} drinks`;
        } else {
            resultHeading.innerHTML = `${matchingProducts.length} result(s) for <strong>'${searchQuery}'</strong>`;
        }
    }

    if (matchingProducts.length === 0) {
        resultList.innerHTML = `<p class='no-results'>No drinks found. Try another search.</p>`;
    } else {
        resultList.innerHTML = matchingProducts.map(createProductCardHtml).join('');
    }
}

const productPage = document.getElementById('product-page');

if (productPage) {
    const productPageParameters = new URLSearchParams(window.location.search);
    const requestedProductId = productPageParameters.get('product');

    const currentProduct = productCatalog.find(function(product) {
        return product.productId === requestedProductId;
    });

    if (!currentProduct) {
        productPage.innerHTML = '<p class="no-results">Sorry, this product was not found.</p>';
    } else {
        showProductDetail(currentProduct);
    }
}

function showToast(message) {
    const toast = document.getElementById('cart-toast');
    if (!toast) return;
    toast.textContent = message;
    toast.classList.add('show');
    setTimeout(function() {
        toast.classList.remove('show');
    }, 2500);
}

function showProductDetail(product) {
    document.title = product.productName + ' - The Catfish Bar';
    document.getElementById('product-name').textContent = product.productName;
    document.getElementById('product-style').textContent = product.style + ' · ' + product.alcoholByVolume + ' ABV';

    const productImage = document.getElementById('product-image');
    productImage.src = product.image;
    productImage.alt = product.productName;

    const purchasePanel = document.getElementById('purchase-panel');
    purchasePanel.innerHTML = `
        <div class="size-row">
            <span class="size-label">285ML · $${product.smallSizePrice}</span>
            <div class="quantity-stepper">
                <button type="button" class="quantity-button" data-size="small" data-change="-1">−</button>
                <span class="quantity-number" id="quantity-small">0</span>
                <button type="button" class="quantity-button" data-size="small" data-change="1">+</button>
            </div>
        </div>

        <div class="size-row">
            <span class="size-label">570ML · $${product.largeSizePrice}</span>
            <div class="quantity-stepper">
                <button type="button" class="quantity-button" data-size="large" data-change="-1">−</button>
                <span class="quantity-number" id="quantity-large">0</span>
                <button type="button" class="quantity-button" data-size="large" data-change="1">+</button>
            </div>
        </div>

        <button type="button" id="add-to-cart-button" class="go-to-cart-button">Add to Cart</button>
        <a href="cart.html" class="go-to-cart-button go-to-cart-link">Go to Cart 🛒</a>
    `;

    document.getElementById('product-description').textContent = product.description;
    document.getElementById('more-information').textContent = product.moreInformation;

    const reviewsEl = document.getElementById('product-reviews');
    const stars = buildStars(product.rating);
    reviewsEl.innerHTML = `
        <div class="review-stars">${stars}</div>
        <p class="review-score">${product.rating} / 5 &nbsp;·&nbsp; ${product.ratingCount.toLocaleString()} reviews</p>
        <p class="review-blurb">${generateReviewBlurb(product)}</p>
    `;

    const relatedProducts = productCatalog.filter(function(otherProduct) {
        return otherProduct.flavourTag === product.flavourTag
            && otherProduct.productId !== product.productId;
    }).slice(0, 3);

    const youMayAlsoLike = document.getElementById('you-may-also-like');
    if (relatedProducts.length === 0) {
        youMayAlsoLike.textContent = 'No related drinks right now.';
    } else {
        youMayAlsoLike.innerHTML = relatedProducts.map(function(relatedProduct) {
            return `
                <a class="related-product" href="product.html?product=${relatedProduct.productId}">
                    <img src="${relatedProduct.image}" alt="${relatedProduct.productName}">
                    <span>${relatedProduct.productName}</span>
                </a>
            `;
        }).join('');
    }

    setUpQuantitySteppers();
    setUpAccordions();
    setUpAddToCartButton(product);
}

function buildStars(rating) {
    const full = Math.floor(rating);
    const half = rating % 1 >= 0.5;
    const empty = 5 - full - (half ? 1 : 0);
    return '★'.repeat(full) + (half ? '½' : '') + '☆'.repeat(empty);
}

function generateReviewBlurb(product) {
    const blurbs = {
        'craft': 'Catfish regulars love this one. A go-to choice for craft beer fans who appreciate balance and drinkability.',
        'sour': 'Our sour lovers rate this highly. Expect a few raised eyebrows and then immediate requests for another round.',
        'dark': 'A favourite among dark beer drinkers at the bar. Rich and full-flavoured without being overwhelming.'
    };
    return blurbs[product.flavourTag] || 'A crowd favourite at The Catfish. Highly recommended by our staff and regulars alike.';
}

function setUpQuantitySteppers() {
    const quantityButtons = document.querySelectorAll('.quantity-button');
    quantityButtons.forEach(function(button) {
        button.addEventListener('click', function() {
            const size = button.getAttribute('data-size');
            const change = Number(button.getAttribute('data-change'));
            const numberElement = document.getElementById('quantity-' + size);
            let currentNumber = Number(numberElement.textContent) + change;
            if (currentNumber < 0) currentNumber = 0;
            numberElement.textContent = currentNumber;
        });
    });
}

function setUpAccordions() {
    const accordionToggles = document.querySelectorAll('.accordion-toggle');
    accordionToggles.forEach(function(toggle) {
        toggle.addEventListener('click', function() {
            toggle.classList.toggle('open');
            const content = toggle.nextElementSibling;
            content.classList.toggle('open');
        });
    });
}

function setUpAddToCartButton(product) {
    const addToCartBtn = document.getElementById('add-to-cart-button');
    if (!addToCartBtn) return;

    addToCartBtn.addEventListener('click', function() {
        const smallQuantity = Number(document.getElementById('quantity-small').textContent);
        const largeQuantity = Number(document.getElementById('quantity-large').textContent);

        if (smallQuantity === 0 && largeQuantity === 0) {
            addToCartBtn.textContent = 'Please choose a quantity first';
            setTimeout(function() {
                addToCartBtn.textContent = 'Add to Cart';
            }, 1500);
            return;
        }

        const newItems = [];
        if (smallQuantity > 0) {
            newItems.push({
                productId: product.productId,
                productName: product.productName,
                sizeLabel: '285ML',
                unitPrice: product.smallSizePrice,
                quantity: smallQuantity
            });
        }
        if (largeQuantity > 0) {
            newItems.push({
                productId: product.productId,
                productName: product.productName,
                sizeLabel: '570ML',
                unitPrice: product.largeSizePrice,
                quantity: largeQuantity
            });
        }

        addItemsToCart(newItems);

        const totalAdded = smallQuantity + largeQuantity;
        showToast(`✓ ${totalAdded} × ${product.productName} added to cart`);

        document.getElementById('quantity-small').textContent = '0';
        document.getElementById('quantity-large').textContent = '0';
    });
}

function getCart() {
    try {
        const storedCart = localStorage.getItem('catfishCart');
        return storedCart ? JSON.parse(storedCart) : [];
    } catch (error) {
        return [];
    }
}

function saveCart(cart) {
    try {
        localStorage.setItem('catfishCart', JSON.stringify(cart));
    } catch (error) {}
}

function clearCart() {
    try {
        localStorage.removeItem('catfishCart');
    } catch (error) {}
}

function addItemsToCart(newItems) {
    const cart = getCart();
    newItems.forEach(function(newItem) {
        const existingItem = cart.find(function(item) {
            return item.productId === newItem.productId
                && item.sizeLabel === newItem.sizeLabel;
        });
        if (existingItem) {
            existingItem.quantity = existingItem.quantity + newItem.quantity;
        } else {
            cart.push(newItem);
        }
    });
    saveCart(cart);
}

function calculateCartTotals(cart) {
    let totalQuantity = 0;
    let totalPrice = 0;
    cart.forEach(function(item) {
        totalQuantity = totalQuantity + item.quantity;
        totalPrice = totalPrice + item.quantity * item.unitPrice;
    });
    return { totalQuantity: totalQuantity, totalPrice: totalPrice };
}

function formatPrice(value) {
    const rounded = Math.round(value * 100) / 100;
    return '$' + rounded.toFixed(2);
}

const cartItemsContainer = document.getElementById('cart-items');

if (cartItemsContainer) {
    const cart = getCart();
    const totals = calculateCartTotals(cart);
    const totalQuantityElement = document.getElementById('cart-total-quantity');
    const totalPriceElement = document.getElementById('cart-total-price');

    if (cart.length === 0) {
        cartItemsContainer.innerHTML = '<p class="cart-empty">Your cart is empty.</p>';
        totalQuantityElement.textContent = '0';
        totalPriceElement.textContent = formatPrice(0);
    } else {
        cartItemsContainer.innerHTML = cart.map(function(item) {
            const lineTotal = item.quantity * item.unitPrice;
            return `
                <div class="cart-row">
                    <span class="cart-item-name">${item.productName}<br><small>${item.sizeLabel}</small></span>
                    <span class="cart-item-quantity">${item.quantity}</span>
                    <span class="cart-item-price">${formatPrice(lineTotal)}</span>
                </div>
            `;
        }).join('');
        totalQuantityElement.textContent = totals.totalQuantity;
        totalPriceElement.textContent = formatPrice(totals.totalPrice);
    }
}

const paymentForm = document.getElementById('payment-form');

if (paymentForm) {
    paymentForm.addEventListener('submit', function(event) {
        event.preventDefault();

        const requiredFieldIds = [
            'full-name', 'phone-number', 'email-address',
            'name-on-card', 'card-number', 'expiry-date', 'cvv'
        ];

        let everythingFilled = true;

        requiredFieldIds.forEach(function(fieldId) {
            const field = document.getElementById(fieldId);
            if (field.value.trim() === '') {
                field.classList.add('field-error');
                everythingFilled = false;
            } else {
                field.classList.remove('field-error');
            }
        });

        const emailField = document.getElementById('email-address');
        if (emailField.value.trim() !== '' && !emailField.value.includes('@')) {
            emailField.classList.add('field-error');
            everythingFilled = false;
        }

        const paymentMessage = document.getElementById('payment-message');
        if (!everythingFilled) {
            paymentMessage.textContent = 'Please fill in all required fields with a valid email.';
            return;
        }

        paymentMessage.textContent = '';
        clearCart();
        window.location.href = 'confirm.html';
    });
}

const confirmPage = document.getElementById('confirm-page');

if (confirmPage) {
    clearCart();
}