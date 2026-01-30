import { createContext, useEffect, useState } from "react";

export const CartContext = createContext();

export function CartProvider({ children }) {
  const [cart, setCart] = useState(() => {
    return JSON.parse(localStorage.getItem("cart") || "[]");
  });

  useEffect(() => {
    localStorage.setItem("cart", JSON.stringify(cart));
  }, [cart]);

  function addToCart(productId) {
    setCart((prev) => {
      const existing = prev.find((i) => i.productId === productId);

      if (existing) {
        return prev.map((i) => {
          return i.productId === productId
            ? { ...i, quantity: i.quantity + 1 }
            : i;
        });
      }
      return [...prev, { productId, quantity: 1 }];
    });
  }

  const increaseQty = (id) => {
    setCart((prev) => {
      return prev.map((i) =>
        i.productId === id ? { ...i, quantity: i.quantity + 1 } : i,
      );
    });
  };

  const decreaseQty = (id) => {
    setCart((prev) => {
      return prev.map((i) =>
        i.productId === id ? { ...i, quantity: i.quantity - 1 } : i,
      );
    });
  };

  const removeFromCart = (productId) => {
    setCart((prev) => prev.filter((i) => i.productId !== productId));
  };

  const cartCount = cart.reduce((sum, item) => sum + item.quantity, 0);

  return (
    <CartContext.Provider
      value={{
        cart,
        addToCart,
        increaseQty,
        decreaseQty,
        removeFromCart,
        cartCount,
      }}
    >
      {children}
    </CartContext.Provider>
  );
}
