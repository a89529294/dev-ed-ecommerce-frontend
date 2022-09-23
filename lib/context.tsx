import React, { createContext, useContext, useState } from "react";
import { CartItem, P } from "../types";

const ShopContext = createContext<{
  qty: number;
  increment: () => void;
  decrement: () => void;
  reset: () => void;
  showCart: boolean;
  setShowCart: React.Dispatch<React.SetStateAction<boolean>>;
  onAdd: (p: P) => void;
  cartItems: CartItem[];
} | null>(null);

export const StateContext = ({ children }: { children: React.ReactNode }) => {
  const [qty, setQty] = useState(1);
  const [showCart, setShowCart] = useState(false);
  const [cartItems, setCartItems] = useState<CartItem[]>([]);

  const increment = () => setQty((q) => ++q);
  const decrement = () => setQty((q) => (q <= 1 ? 1 : --q));
  const reset = () => setQty(1);

  const onAdd = (p: P) => {
    const foundItem = cartItems.find((item) => item.slug === p.slug);

    if (foundItem)
      setCartItems(
        cartItems.map((item) =>
          item.slug === p.slug ? { ...item, qty: item.qty + qty } : item
        )
      );
    else setCartItems([...cartItems, { ...p, qty }]);

    reset();
  };
  return (
    <ShopContext.Provider
      value={{
        qty,
        increment,
        decrement,
        reset,
        showCart,
        setShowCart,
        onAdd,
        cartItems,
      }}>
      {children}
    </ShopContext.Provider>
  );
};

export const useShopContext = () => useContext(ShopContext);
