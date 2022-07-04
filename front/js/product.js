"use strict";

const currentPageUrl = window.location.href;
const url = new URL(currentPageUrl);
const productId = url.searchParams.get("id");

// Crée un nouvel élément html de type (newTagName)
function createTag(newTagName) {
  return document.createElement(newTagName);
}
// Récupère les données de l'API, puis ajoute les éléments html correspondants

function fillProductPages() {
  fetch("http://localhost:3000/api/products")
    .then((response) => {
      return response.json();
    })
    .then((productList) => {
      let i = 0;
      while (productList[i]._id !== productId) {
        i++;
      }
      const productImage = createTag("img");
      document.getElementsByClassName("item__img")[0].appendChild(productImage);
      document.getElementById("title").textContent = `${productList[i].name}`;
      document.getElementById("price").textContent = `${productList[i].price}`;
      document.getElementById(
        "description"
      ).textContent = `${productList[i].description}`;
      productImage.src = `${productList[i].imageUrl}`;
      productImage.alt = `${productList[i].altTxt}`;
      let colorNumber = 0;
      for (const colorOption in productList[i].colors) {
        const productOptions = createTag("option");
        document.getElementById("colors").appendChild(productOptions);
        productOptions.value = `${productList[i].colors[colorNumber]}`;
        productOptions.textContent = `${productList[i].colors[colorNumber]}`;
        colorNumber++;
      }
    })
    .catch((err) => {
      console.log(`error: ${err}`);
    });
}

fillProductPages();
