// data
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

// elements
const form = document.querySelector('#filter-form');
const selectInput = document.querySelector('#select-input');
const searchInput = document.querySelector('#search-input');
const menuWrapper = document.querySelector('.filter-result');


let lastCategory = selectInput.value;
let lastSearch = '';

// helper variables
let categoryGroup = [];
let finalGroup = menu;

// set data in DOM
updateDisplay();

// event
form.addEventListener('submit', selectCategory);

function selectCategory(e) {
    e.preventDefault();

    categoryGroup = [];
    finalGroup = [];

    // if select value was the last value that we selected And search input was empty , go out from function
    if (selectInput.value === lastCategory && searchInput.value.trim() === lastSearch) {
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
            const selectedValue = selectInput.value;
            menu.forEach(item => {
                if (item.type === selectedValue) {
                    categoryGroup.push(item);
                }
            });
            selectMenuItem();
        }
    }

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

// set all items as result if exist
function updateDisplay() {
    // clear menu wrapper list
    while (menuWrapper.firstChild) {
        menuWrapper.removeChild(menuWrapper.firstChild);
    }

    // show message if items doesnt exist
    if (finalGroup.length === 0) {
        const emptyMessage = `<h1 class='not-find-parag'>No Item Find! 😕</h1>`;
        menuWrapper.innerHTML = emptyMessage;
    } else {
        finalGroup.forEach(item => {
            const menuItem = `
                <div class="filter-img">
                    <img src="${item.img}" alt="${item.name}">
                    <p class="img-caption">${item.name}</p>
                </div>
        `
            menuWrapper.innerHTML += menuItem;
        });
    }
}