import React, { createContext, useContext, useState } from "react";

const ShopContext = createContext<{
  qty: number;
  increment: () => void;
  decrement: () => void;
  reset: () => void;
  showCart: boolean;
  setShowCart: React.Dispatch<React.SetStateAction<boolean>>;
} | null>(null);

export const StateContext = ({ children }: { children: React.ReactNode }) => {
  const [qty, setQty] = useState(1);
  const [showCart, setShowCart] = useState(false);
  const [cartItems, setCartItems] = useState([]);

  const increment = () => setQty((q) => ++q);
  const decrement = () => setQty((q) => (q <= 1 ? 1 : --q));
  const reset = () => setQty(1);
  return (
    <ShopContext.Provider
      value={{ qty, increment, decrement, reset, showCart, setShowCart }}>
      {children}
    </ShopContext.Provider>
  );
};

export const useShopContext = () => useContext(ShopContext);
