const menu = [

    {
        name: 'first bmw',
        img: '../media/car-1.jpg',
        type: 'bmw'
    },
    {
        name: 'second bmw',
        img: '../media/car-2.jpg',
        type: 'bmw'
    },
    {
        name: 'third bmw',
        img: '../media/car-3.jpg',
        type: 'bmw'
    },
    {
        name: 'friends in cofe',
        img: '../media/friends-1.jpg',
        type: 'friends'
    },
    {
        name: 'friends at home',
        img: '../media/friends-2.jpg',
        type: 'friends'
    },
    {
        name: 'dancer friends',
        img: '../media/friends-3.jpg',
        type: 'friends'
    },
    {
        name: 'mountian',
        img: '../media/nature-1.jpg',
        type: 'nature'
    },
    {
        name: 'road',
        img: '../media/nature-2.jpg',
        type: 'nature'
    },
    {
        name: 'river',
        img: '../media/nature-3.jpg',
        type: 'nature'
    },
];


const form = document.querySelector('#filter-form');
const selectInput = document.querySelector('#select-input');
const searchInput = document.querySelector('#search-input');
const menuWrapper = document.querySelector('.filter-result');

let lastCategory = selectInput.value;
let lastSearch = '';

let categoryGroup = [];
let finalGroup = menu;

updateDisplay();

finalGroup = [];

form.addEventListener('submit', selectCategory);

function selectCategory(e) {
    e.preventDefault();
    categoryGroup = [];
    finalGroup = [];

    // if select value didnt change and search input was empty , go out of function
    if (selectInput.value === lastCategory && searchInput.value === lastSearch) {
        console.log('empty');
        return;
    } else {
        lastCategory = selectInput.value;
        lastSearch = searchInput.value.trim();

        // get all items
        if (selectInput.value === 'all') {
            categoryGroup = menu;

            selectMenuItem();
            // get all of the items whitout all value
        } else {
            menu.forEach(item => {
                if (item.type === selectInput.value) {
                    categoryGroup.push(item);
                }
            });
            selectMenuItem();
        }
    }

    // clear input value
    // searchInput.value = '';
}

// selected items
function selectMenuItem() {
    if (searchInput.value.trim() === '') {
        finalGroup = categoryGroup;
        updateDisplay();
    } else {
        let inputValue = searchInput.value.trim();
        categoryGroup.forEach(item => {
            if (item.name.includes(inputValue)) {
                finalGroup.push(item);
            }
        });
        updateDisplay();
    }
}

// set all items as result
function updateDisplay() {
    // clear menu wrapper list
    while (menuWrapper.firstChild) {
        menuWrapper.removeChild(menuWrapper.firstChild);
    }
    if (!finalGroup) {
        console.log('final group is empty');
    } else {
        finalGroup.forEach(item => {
            const menuItem = `
                <div class="filter-img">
                    <img src="${item.img}" alt="${item.name}">
                    <p class="img-caption">${item.name}</p>
                </div>
        `
            menuWrapper.innerHTML += menuItem;
        })
    }
}