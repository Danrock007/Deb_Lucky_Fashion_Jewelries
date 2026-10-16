import { useCallback, useEffect, useMemo, useState } from "react";
import { CartContext } from "./cart-context.js";

const STORAGE_KEY = "dlj_cart_items";

// Placeholder promo codes — swap for a real lookup against the backend
// once the promo/discount API exists.
const PROMO_CODES = {
  WELCOME10: { label: "WELCOME10", percentOff: 10 },
  SAVE20: { label: "SAVE20", percentOff: 20 },
};

function loadStoredItems() {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) return [];
    const parsed = JSON.parse(raw);
    return Array.isArray(parsed) ? parsed : [];
  } catch {
    return [];
  }
}

export function CartProvider({ children }) {
  const [items, setItems] = useState(loadStoredItems);
  const [isOpen, setIsOpen] = useState(false);
  const [promo, setPromo] = useState(null); // { label, percentOff } | null
  const [promoError, setPromoError] = useState(null);

  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(items));
    } catch {
      // Storage full or unavailable — fail silently.
    }
  }, [items]);

  function addItem(product) {
    setItems((prev) => {
      const existing = prev.find((i) => i.id === product.id);
      if (existing) {
        return prev.map((i) =>
          i.id === product.id ? { ...i, qty: i.qty + 1 } : i
        );
      }
      return [...prev, { id: product.id, name: product.name, price: product.price, qty: 1 }];
    });
    setIsOpen(true);
  }

  function removeItem(id) {
    setItems((prev) => prev.filter((i) => i.id !== id));
  }

  function updateQty(id, qty) {
    if (qty < 1) return removeItem(id);
    setItems((prev) => prev.map((i) => (i.id === id ? { ...i, qty } : i)));
  }

  const clearCart = useCallback(() => {
    setItems([]);
    setPromo(null);
    setPromoError(null);
  }, []);

  function applyPromoCode(code) {
    const normalized = code.trim().toUpperCase();
    const match = PROMO_CODES[normalized];
    if (!match) {
      setPromo(null);
      setPromoError("That code isn't valid.");
      return false;
    }
    setPromo(match);
    setPromoError(null);
    return true;
  }

  function removePromoCode() {
    setPromo(null);
    setPromoError(null);
  }

  const count = useMemo(() => items.reduce((sum, i) => sum + i.qty, 0), [items]);
  const subtotal = useMemo(
    () => items.reduce((sum, i) => sum + i.qty * i.price, 0),
    [items]
  );
  const discount = useMemo(
    () => (promo ? Math.round(subtotal * (promo.percentOff / 100)) : 0),
    [promo, subtotal]
  );
  const total = subtotal - discount;

  const value = {
    items,
    count,
    subtotal,
    discount,
    total,
    promo,
    promoError,
    applyPromoCode,
    removePromoCode,
    isOpen,
    addItem,
    removeItem,
    updateQty,
    clearCart,
    open: () => setIsOpen(true),
    close: () => setIsOpen(false),
  };

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
}
