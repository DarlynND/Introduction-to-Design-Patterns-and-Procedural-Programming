// ============================================================
//  SHOPPING CART — Procedural Programming
//  GOMYCODE | Design Patterns Exercise — Part 1
// ============================================================

// Global state — the cart lives here
let cart = [];

// ── Add an item ──────────────────────────────────────────────
function addItem(name, quantity, price) {
  // If the item already exists, increase quantity
  const existing = cart.find((item) => item.name === name);

  if (existing) {
    existing.quantity += quantity;
    console.log(`Updated "${name}": now x${existing.quantity}`);
  } else {
    cart.push({ name, quantity, price });
    console.log(`Added "${name}" (x${quantity}) @ ${price.toFixed(2)} TND each`);
  }
}

// ── Remove an item by name ───────────────────────────────────
function removeItem(name) {
  const index = cart.findIndex((item) => item.name === name);

  if (index === -1) {
    console.log(`"${name}" not found in cart.`);
    return;
  }

  cart.splice(index, 1);
  console.log(`Removed "${name}" from cart.`);
}

// ── Clear the entire cart ────────────────────────────────────
function clearCart() {
  cart = [];
  console.log("Cart cleared.");
}

// ── View cart contents + total ───────────────────────────────
function viewCart() {
  if (cart.length === 0) {
    console.log("Your cart is empty.");
    return;
  }

  console.log("\n--- Cart Contents ---");

  let total = 0;

  cart.forEach((item) => {
    const subtotal = item.quantity * item.price;
    total += subtotal;
    console.log(`${item.name} (x${item.quantity}) - ${subtotal.toFixed(2)} TND`);
  });

  console.log(`Total: ${total.toFixed(2)} TND`);
  console.log("---------------------\n");
}

// ── Get total price ──────────────────────────────────────────
function getTotal() {
  return cart.reduce((sum, item) => sum + item.quantity * item.price, 0);
}

// ============================================================
//  Demo / Test
// ============================================================

addItem("Apple", 2, 1.5);
addItem("Orange", 3, 2.0);
addItem("Banana", 1, 0.75);

viewCart();
// Apple (x2)  - 3.00 TND
// Orange (x3) - 6.00 TND
// Banana (x1) - 0.75 TND
// Total: 9.75 TND

removeItem("Apple");
viewCart();
// Orange (x3) - 6.00 TND
// Banana (x1) - 0.75 TND
// Total: 6.75 TND

addItem("Orange", 2, 2.0); // should update existing
viewCart();
// Orange (x5) - 10.00 TND
// Banana (x1) -  0.75 TND
// Total: 10.75 TND

clearCart();
viewCart(); // Cart is empty
