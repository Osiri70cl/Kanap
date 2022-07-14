"use strict";

// Mise en place de la page de confirmation. Cette page est affichée après avoir validé le formulaire de commande.

const currentPageUrl = window.location.href;
const url = new URL(currentPageUrl);
const orderId = url.searchParams.get("order");

window.history.replaceState(
  "",
  "Confirmation",
  "http://127.0.0.1:5501/front/html/confirmation.html"
);

const orderIdSpan = document.getElementById("orderId");

orderIdSpan.textContent = `${orderId}`;
