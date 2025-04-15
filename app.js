const API = `https://fakestoreapi.com/products`;
const cardList = document.querySelector('.card_list');
const totalPriceElement = document.getElementById('total_price');
const purchasedList = document.querySelector('.purchased_list');
const categoryFilter = document.getElementById('categoryFilter');
const sortByPrice = document.getElementById('sortByPrice');
const searchInput = document.getElementById('searchInput');

let products = [];
let total = 0;

window.addEventListener("load", function () {
    const loader = document.getElementById("loader");
    const content = document.getElementById("content");
  
    setTimeout(() => {
      loader.style.display = "none";
      content.style.display = "block";
    }, 2000); // 2 seconds delay
  });

// Mahsulotlarni render qilish
function renderProducts(data) {
    cardList.innerHTML = "";

    data.forEach(item => {
        const card = document.createElement('li');
        card.className = 'card_item';
        card.innerHTML = `
            <img src="${item.image}" alt="${item.title}" class="card_img">
            <h3 class="name">${item.title}</h3>
            <p class="info">${item.description.slice(0, 60)}...</p>
            <div class="wrapper">
                <span>Narxi: $${item.price.toFixed(2)}</span>
            </div>
        `;
        cardList.appendChild(card);
    });

    document.querySelectorAll('.yashil').forEach(button => {
        button.addEventListener('click', (e) => {
            const price = parseFloat(e.target.getAttribute('data-price'));
            const name = e.target.getAttribute('data-name');
            total += price;
            totalPriceElement.textContent = total.toFixed(2);

            const listItem = document.createElement('li');
            listItem.textContent = `${name} - $${price.toFixed(2)}`;
            purchasedList.appendChild(listItem);

            alert("Mahsulot sotib olindi!");
        });
    });
}

// Filter va sort funksiyasi
function applyFilters() {
    let filtered = [...products];

    const category = categoryFilter.value;
    const search = searchInput.value.toLowerCase();
    const sort = sortByPrice.value;

    if (category !== "all") {
        filtered = filtered.filter(p => p.category === category);
    }

    if (search) {
        filtered = filtered.filter(p => p.title.toLowerCase().includes(search));
    }

    if (sort === "asc") {
        filtered.sort((a, b) => a.price - b.price);
    } else if (sort === "desc") {
        filtered.sort((a, b) => b.price - a.price);
    }

    renderProducts(filtered);
}

fetch(API)
    .then(res => res.json())
    .then(data => {
        products = data;
        renderProducts(products);
    })
    .catch(err => {
        console.error("Xatolik yuz berdi:", err);
    });

categoryFilter.addEventListener('change', applyFilters);
sortByPrice.addEventListener('change', applyFilters);
searchInput.addEventListener('input', applyFilters);
