"use strict";

const cartItems = document.getElementById("cart__items");

function createTag(newTagName) {
  return document.createElement(newTagName);
}

const cart = JSON.parse(localStorage.getItem("cart")) || [];

let cartItemImage;
let cartItemImageAlt;
let productName;
let productColor;
let productPrice;
let productQuantity = [];
let displayPrice = [];
let cartContent = "";
let i = 0;

function displayCart() {
  fetch("http://localhost:3000/api/products")
    .then((response) => {
      return response.json();
    })
    .then((APIProductList) => {
      while (i !== cart.length) {
        const matchingProduct = APIProductList.find(
          (product) => product._id === cart[i].id
        );
        APIProductList.forEach((productInList) => {
          if (matchingProduct) {
            cartItemImage = `${matchingProduct.imageUrl}`;
            cartItemImageAlt = `${matchingProduct.altTxt}`;
            productName = `${matchingProduct.name}`;
            productColor = `${cart[i].color}`;
            productPrice = `${matchingProduct.price}`;
          }
        });
        createInnerContent();
        displayPrice.push(productPrice);
        i++;
      }
      cartItems.innerHTML += cartContent;
      eventListener();
    });
}

// Crée un nouveau bloc article pour chaque produit du panier
const createInnerContent = function () {
  cartContent += `<article class="cart__item" data-id="${cart[i].id}" data-color="${productColor}">
  <div class="cart__item__img"><img src="${cartItemImage}" alt="${cartItemImageAlt}"></div>
  <div class="cart__item__content">
  <div class="cart__item__content__description">
  <h2>${productName}</h2>
  <p>${productColor}</p>
  <p>${productPrice} €</p>
  </div>
  <div class="cart__item__content__settings">
  <div class="cart__item__content__settings__quantity">
  <p>Qté : </p>
  <input type="number" class="itemQuantity" name="itemQuantity" min="1" max="100" value="${cart[i].quantity}">
  </div>
  <div class="cart__item__content__settings__delete">
  <p class="deleteItem">Supprimer</p>
  </div>
  </div>
  </div>
  </article>`;
};

displayCart();

const totalQuantityElement = document.getElementById("totalQuantity");
const displayedTotal = document.getElementById("totalPrice");
let removeButton;
let quantityInputField;
let getParentArticle;
let updatedProduct;

const eventListener = function () {
  quantityInputField = document.querySelectorAll(
    ".cart__item__content__settings__quantity > .itemQuantity"
  );
  quantityInputField.forEach((element) => {
    element.setAttribute("value", element.value);
    productQuantity += element.value;
    element.addEventListener("change", pushLocalStorageQuantity);
  });
  removeButton = document.querySelectorAll(".deleteItem");
  removeButton.forEach((element) => {
    element.addEventListener("click", removeFromCart);
  });
};
