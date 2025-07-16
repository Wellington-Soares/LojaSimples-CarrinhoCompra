const API_URL = 'http://localhost:3001/produtos';
const productList = document.getElementById('lista-produtos');
const cartItems = document.getElementById('card-items');
const cartTotal = document.getElementById('card-total');
const cartCount = document.getElementById('card-count');

let cart = [];

// Carregar produtos
async function fetchProducts() {
  const res = await fetch(API_URL);
  const products = await res.json();
  displayProducts(products);
}

function displayProducts(products) {
  productList.innerHTML = '';

  products.forEach(p => {
    const div = document.createElement('div');
    div.className = 'product';
    div.style.border = '1px solid #ccc';
    div.style.margin = '10px 0';
    div.style.padding = '10px';

    div.innerHTML = `
      <img src="${p.foto}" alt="${p.nome}" style="max-width: 200px; display: block;">
      <h3>${p.nome}</h3>
      <p>${p.descricao}</p>
      <p><strong>Preço: R$ ${p.preco}</strong></p>
      <button onclick="addToCart(${p.id}, '${p.nome}', ${p.preco})">Adicionar ao Carrinho</button>
    `;

    productList.appendChild(div);
  });
}

// Adicionar ao carrinho
function addToCart(id, nome, preco) {
  cart.push({ id, nome, preco });
  updateCart();
}

// Remover do carrinho
function removeFromCart(index) {
  cart.splice(index, 1);
  updateCart();
}

// Atualizar carrinho
function updateCart() {
  cartItems.innerHTML = '';
  let total = 0;

  cart.forEach((item, index) => {
    const div = document.createElement('div');
    div.className = 'cart-item';
    div.style.border = '1px solid #ccc';
    div.style.margin = '5px 0';
    div.style.padding = '5px';

    div.innerHTML = `
      ${item.nome} - R$ ${item.preco}
      <button onclick="removeFromCart(${index})">Remover</button>
    `;
    cartItems.appendChild(div);
    total += item.preco;
  });

  cartTotal.innerText = `Total: R$ ${total.toFixed(2)}`;
  cartCount.innerText = cart.length;
}

fetchProducts();
