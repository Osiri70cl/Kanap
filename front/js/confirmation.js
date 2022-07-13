"use strict";

const currentPageUrl = window.location.href;
const url = new URL(currentPageUrl);
const orderId = url.searchParams.get("order");

window.history.replaceState(
  "",
  "Confirmation",
  "http://127.0.0.1:5500/front/html/confirmation.html"
);

const orderIdSpan = document.getElementById("orderId");

orderIdSpan.textContent = `${orderId}`;
