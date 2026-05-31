const menuIcon = document.getElementById('menu-icon');
const dropdownMenu = document.getElementById('dropdown-menu');
menuIcon.addEventListener('click', function(){
    dropdownMenu.classList.toggle('show');
});

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
            { name: 'Jaegar - Fresh Hop 2026', img: 'assets/jaegar.jpg', tag: 'dark' },
            { name: 'Whippy', img: 'assets/whippy.jpg', tag: 'craft' },
        ],

            seasonal: [
            { name: 'Berry Caramel Tart Sour', img: 'assets/tart-sour.jpg', tag: 'sour' },
            { name: 'Pale Ale', img: 'assets/pale-ale.jpg', tag: 'craft' },
            { name: 'Hazelnut Brown', img: 'assets/hazelnut-brown.jpg', tag: 'dark' },
            { name: 'Highwayman', img: 'assets/highwayman.jpg', tag: 'craft' },
            { name: 'Pilsner', img: 'assets/pilsner.jpg', tag: 'craft' },   
            ]
    }
}

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
        btn.addEventListener('clicker', function() {
            tabBtn.forEach(b => b.classList.remove('active'));
            btn.classList.add('active');

            const selectedCatagory = btn.getAttribute('data-tag');

            showProducts(selectedCatagory);

            tagBtn.forEach(t => t.className.remove('active'));

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
        const text = searchInput.ariaValueMax.toLocaleLowerCase().trim();
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