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
            { name: 'Molly Rose Beer', img: 'assets/molly-rose-beer.jpg', tag: 'craft' },
            { name: 'Melbourne Black', img: 'assets/melbourne-black.jpg', tag: 'dark' },
            { name: 'Apple Cider', img: 'assets/apple-cider.jpg', tag: 'sour' },
        ],

            latest: [ 
            { name: 'Sole Tarder Hazy', img: 'assets/sole-tarder-hazy.jpg', tag: 'craft' },
            { name: 'Spicy Pickle Beer', img: 'assets/spicy-pickle-beer.jpg', tag: 'sour' },
            { name: 'Jaegar - Fresh Hop 2026', img: 'assets/jaegar.png', tag: 'dark' },
            { name: 'Whippy', img: 'assets/whippy.jpg', tag: 'craft' },
        ],

            seasonal: [
            { name: 'Berry Caramel Tart Sour', img: 'assets/tart-sour.jpg', tag: 'sour' },
            { name: 'Pale Ale', img: 'assets/pale-ale.png', tag: 'craft' },
            { name: 'Hazelnut Brown', img: 'assets/hazelnut-brown.jpg', tag: 'dark' },
            { name: 'Highwayman', img: 'assets/highwayman.jpg', tag: 'craft' },
            { name: 'Pilsner', img: 'assets/pilsner.png', tag: 'craft' },   
            ]
    }
};

function showProducts(catagory) {
    const bestContainer = document.getElementById('group-best-seller');
    const latestContainer = document.getElementById('group-latest-arrived');
    const seasonalContainer = document.getElementById('group-seasonal');

    if(!webData[catagory]) return;

    const currentData = webData[catagory];

    function makeHtml(list) {
        let htmlContent = '';
        list.forEach(function(item) {
            htmlContent += `
                <div class='item-card' data-tag='${item.tag}' data-name='${item.name.toLowerCase()}'>
                    <img src='${item.img}' alt='${item.name}'>
                    <p>${item.name}</p>
                </div>
            `;
        });
        return htmlContent;
    }

    if (bestContainer) bestContainer.innerHTML = makeHtml(currentData.best);
    if (latestContainer) latestContainer.innerHTML = makeHtml(currentData.latest);
    if (seasonalContainer) seasonalContainer.innerHTML = makeHtml(currentData.seasonal);
}

if (searchInput) {
    showProducts ('drink');
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
            allCards.forEach(function(card)  {
                const cardTag = card.getAttribute ('data-tag');
                if (activeTags.length === 0 || activeTags.includes(cardTag)) {
                    card.style.display = 'block';
                } else {
                    card.style.display = 'none';
                }
            });        
        });
    });

    searchInput.addEventListener('input', function() {
        const text = searchInput.value.toLowerCase().trim();
        const allCards = document.querySelectorAll('.item-card');

        allCards.forEach(function(card) {
            const name = card.getAttribute('data-name');
            if (name.includes(text)) {
                card.style.display = 'block';
            } else {
                card.style.display = 'none';
            }
        });
    });
}

if (searchInput) {
    searchInput.addEventListener('keydown', function(event) {
        if (event.key === 'Enter') {
            const typedText = searchInput.value.trim();
            if (typedText.length > 0) {
                window.location.href = 'result.html?query' + encodeURIComponent(typedText);
            }
        }
    });
}

const productCatalog = [
    { productName:'Forn Fishin',  breweryName:'Molly Rose Brewing', style:'IPA - American', alcoholByVolume:'6.2%', category:'Beer', flavourTag:'carft', image:'assets/molly-rose-beer.jpg', smallSizePrice: 8.5, largeSizePrice: 16.5},
    { productName: "Apple Cider",             breweryName: "Napoleone Cider",                 style: "Cider – Traditional",  alcoholByVolume: "4.7%", category: "Cider", flavourTag: "sour",  image: "assets/apple-cider.jpg",       smallSizePrice: 7.5, largeSizePrice: 12.5 },
    { productName: "Melbourne Black",         breweryName: "Nation Brewing Co",               style: "Stout – Irish Dry",    alcoholByVolume: "4.3%", category: "Beer",  flavourTag: "dark",  image: "assets/melbourne-black.jpg",   smallSizePrice: 7.5, largeSizePrice: 14   },
    { productName: "Pale Ale",                breweryName: "Spangled Drongo Brewing Company", style: "Pale Ale – Australian", alcoholByVolume: "4.5%", category: "Beer",  flavourTag: "craft", image: "assets/pale-ale.png",          smallSizePrice: 7,   largeSizePrice: 13.5 },
    { productName: "Berry Caramel Tart Sour", breweryName: "Gweilo Beer",                     style: "Sour – Fruited",       alcoholByVolume: "4.9%", category: "Beer",  flavourTag: "sour",  image: "assets/tart-sour.jpg",         smallSizePrice: 10,  largeSizePrice: 19.5 },
    { productName: "Sole Tarder Hazy",        breweryName: "Sole Trader Brewing",             style: "Hazy Pale Ale",        alcoholByVolume: "5.0%", category: "Beer",  flavourTag: "craft", image: "assets/sole-tarder-hazy.jpg",  smallSizePrice: 8,   largeSizePrice: 15   },
    { productName: "Spicy Pickle Beer",       breweryName: "Pickle Lane Brewing",             style: "Gose – Spiced",        alcoholByVolume: "4.2%", category: "Beer",  flavourTag: "sour",  image: "assets/spicy-pickle-beer.jpg", smallSizePrice: 7.5, largeSizePrice: 14   },
    { productName: "Jaegar – Fresh Hop 2026", breweryName: "Jaegar Brewing",                  style: "Fresh Hop IPA",        alcoholByVolume: "6.5%", category: "Beer",  flavourTag: "dark",  image: "assets/jaegar.png",            smallSizePrice: 9,   largeSizePrice: 17   },
    { productName: "Whippy",                  breweryName: "Whippy Brewing",                  style: "Pastry Sour",          alcoholByVolume: "5.5%", category: "Beer",  flavourTag: "craft", image: "assets/whippy.jpg",            smallSizePrice: 9.5, largeSizePrice: 18   },
    { productName: "Hazelnut Brown",          breweryName: "Brown Street Brewing",            style: "Brown Ale – Nut",      alcoholByVolume: "5.2%", category: "Beer",  flavourTag: "dark",  image: "assets/hazelnut-brown.jpg",    smallSizePrice: 8,   largeSizePrice: 15   },
    { productName: "Highwayman",              breweryName: "Highwayman Brewing",              style: "Amber Ale",            alcoholByVolume: "5.8%", category: "Beer",  flavourTag: "craft", image: "assets/highwayman.jpg",        smallSizePrice: 8.5, largeSizePrice: 16   },
    { productName: "Pilsner",                 breweryName: "Catfish Brewing",                 style: "Pilsner – Czech",      alcoholByVolume: "4.6%", category: "Beer",  flavourTag: "craft", image: "assets/pilsner.png",           smallSizePrice: 7,   largeSizePrice: 13   }
];

function findMatchingProducts(searchText) {
    const lowerCaseSearchText = searchText.toLowerCase().trim();
    if (lowerCaseSearchText === '') {
        return productCatalog;
    }
    return productCatalog.filter(function (product) {
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
    `;           
}

const resultList = document.getElementById('result-list');
if (resultList) {
    const urlParameters = new URLSearchParams(window.location.search);
    const searchQuery = urlParameters.get('query') || '';

    const resultSearchInput = document.getElementById('result-search-input');
    if (resultSearchInput) {
        resultSearchInput.value = searchQuery;
        resultSearchInput.addEventListener('keydown', function(event) {
            if (event.key === 'Enter') {
                const typedText = resultSearchInput.value.trim();
                window.location.href = 'result.html?query' + encodeURIComponent(typedText);
            }
        });
    }

    const matchingProducts = findMatchingProducts(searchQuery);
    const resultHeading = document.getElementById('result-heading');
    if (resultHeading)  {
        if (searchQuery === '') {
            resultHeading.textContent = 'Showing all ${matchingProducts.length} drinks';
        } else {
            resultHeading.innerHTML = `${matchingProducts.length} result(s) for <strong>'${searchQuery}'</strong>`;
        }
    }

    if (matchingProducts.length === 0) {
        resultList.innerHTML = `<p class='no-results'> No drinks found. Try another search.</p>`; 
    } else {
        resultList.innerHTML = matchingProducts.map(createProductCardHtml).join('');
    }
}