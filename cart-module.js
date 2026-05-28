// ============================================================
//  SHOPPING CART — Module Pattern (Refactored)
//  GOMYCODE | Design Patterns Exercise — Part 2
// ============================================================
//
//  Pattern chosen: MODULE PATTERN
//
//  Why Module?
//  • Encapsulates all cart state and logic inside a closure.
//  • The `cart` array is private — no outside code can corrupt it.
//  • Exposes only the API that consumers need (public interface).
//  • Eliminates global-scope pollution from Part 1.
// ============================================================

const ShoppingCart = (function () {
  // ── Private state ────────────────────────────────────────
  //    Nothing outside this IIFE can touch `_cart` directly.
  let _cart = [];

  // ── Private helpers ──────────────────────────────────────
  function _find(name) {
    return _cart.find((item) => item.name === name);
  }

  function _calcTotal() {
    return _cart.reduce((sum, item) => sum + item.quantity * item.price, 0);
  }

  // ── Public API ───────────────────────────────────────────
  return {
    /**
     * Add a new item or increase quantity if it already exists.
     * @param {string} name
     * @param {number} quantity
     * @param {number} price  — price per unit in TND
     */
    addItem(name, quantity, price) {
      if (!name || quantity <= 0 || price < 0) {
        console.error("Invalid item data.");
        return;
      }

      const existing = _find(name);

      if (existing) {
        existing.quantity += quantity;
        console.log(`Updated "${name}": now x${existing.quantity}`);
      } else {
        _cart.push({ name, quantity, price });
        console.log(`Added "${name}" (x${quantity}) @ ${price.toFixed(2)} TND each`);
      }
    },

    /**
     * Remove an item from the cart by name.
     * @param {string} name
     */
    removeItem(name) {
      const index = _cart.findIndex((item) => item.name === name);

      if (index === -1) {
        console.log(`"${name}" not found in cart.`);
        return;
      }

      _cart.splice(index, 1);
      console.log(`Removed "${name}" from cart.`);
    },

    /**
     * Empty the cart completely.
     */
    clearCart() {
      _cart = [];
      console.log("Cart cleared.");
    },

    /**
     * Print all items and the running total to the console.
     */
    viewCart() {
      if (_cart.length === 0) {
        console.log("Your cart is empty.");
        return;
      }

      console.log("\n--- Cart Contents ---");

      _cart.forEach((item) => {
        const subtotal = item.quantity * item.price;
        console.log(`${item.name} (x${item.quantity}) - ${subtotal.toFixed(2)} TND`);
      });

      console.log(`Total: ${_calcTotal().toFixed(2)} TND`);
      console.log("---------------------\n");
    },

    /**
     * Return the current total as a number (useful for UI / tests).
     * @returns {number}
     */
    getTotal() {
      return _calcTotal();
    },

    /**
     * Return a read-only snapshot of the cart items.
     * Consumers get a copy — they cannot mutate internal state.
     * @returns {Array}
     */
    getItems() {
      return _cart.map((item) => ({ ...item })); // shallow clone each item
    },

    /**
     * Return the number of distinct items in the cart.
     * @returns {number}
     */
    getCount() {
      return _cart.length;
    },
  };
})(); // ← IIFE: executed immediately, returns the public object

// ============================================================
//  Demo / Test
// ============================================================

ShoppingCart.addItem("Apple", 2, 1.5);
ShoppingCart.addItem("Orange", 3, 2.0);
ShoppingCart.addItem("Banana", 1, 0.75);

ShoppingCart.viewCart();
// Apple  (x2) - 3.00 TND
// Orange (x3) - 6.00 TND
// Banana (x1) - 0.75 TND
// Total: 9.75 TND

ShoppingCart.removeItem("Apple");
ShoppingCart.viewCart();
// Orange (x3) - 6.00 TND
// Banana (x1) - 0.75 TND
// Total: 6.75 TND

ShoppingCart.addItem("Orange", 2, 2.0); // quantity update
ShoppingCart.viewCart();
// Orange (x5) - 10.00 TND
// Banana (x1) -  0.75 TND
// Total: 10.75 TND

// Proof that private state is protected:
console.log("Items snapshot:", ShoppingCart.getItems()); // safe copy
console.log("Total:", ShoppingCart.getTotal().toFixed(2), "TND");
console.log("Count:", ShoppingCart.getCount(), "distinct items");

ShoppingCart.clearCart();
ShoppingCart.viewCart(); // Cart is empty

// This would fail / be undefined — _cart is NOT accessible:
// console.log(ShoppingCart._cart); // undefined ✓
