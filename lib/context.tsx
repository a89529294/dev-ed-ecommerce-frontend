import React, { createContext, useContext, useState } from "react";
import { CartItem, P } from "../types";

const ShopContext = createContext<{
  qty: number;
  increment: () => void;
  decrement: () => void;
  incrementCartItem: (p: P) => void;
  decrementCartItem: (p: P) => void;
  reset: () => void;
  showCart: boolean;
  setShowCart: React.Dispatch<React.SetStateAction<boolean>>;
  onAdd: (p: P) => void;
  cartItems: CartItem[];
  totalQty: number;
  totalPrice: number;
} | null>(null);

export const StateContext = ({ children }: { children: React.ReactNode }) => {
  const [qty, setQty] = useState(1);
  const [showCart, setShowCart] = useState(false);
  const [cartItems, setCartItems] = useState<CartItem[]>([]);
  const totalQty = cartItems.reduce((acc, val) => acc + val.qty, 0);
  const totalPrice = +cartItems
    .reduce((acc, val) => acc + val.price * val.qty, 0)
    .toFixed(2);

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

  const incrementCartItem = (p: P) =>
    setCartItems((cartItems) =>
      cartItems.map((ci) =>
        ci.slug === p.slug ? { ...ci, qty: ci.qty + 1 } : ci
      )
    );

  const decrementCartItem = (p: P) => {
    // setCartItems((cartItems) =>
    //   cartItems
    //     .map((ci) => (ci.slug === p.slug ? { ...ci, qty: ci.qty - 1 } : ci))
    //     .filter((ci) => ci.qty > 0)
    // );
    setCartItems((cartItems) =>
      cartItems.reduce(
        (acc, val) =>
          val.slug === p.slug
            ? val.qty > 1
              ? [...acc, { ...val, qty: val.qty - 1 }]
              : [...acc]
            : [...acc, val],
        [] as CartItem[]
      )
    );
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
        incrementCartItem,
        decrementCartItem,
        totalQty,
        totalPrice,
      }}>
      {children}
    </ShopContext.Provider>
  );
};

export const useShopContext = () => useContext(ShopContext);
