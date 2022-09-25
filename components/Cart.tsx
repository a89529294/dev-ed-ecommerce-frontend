import { AnimatePresence } from "framer-motion";
import Image from "next/future/image";
import React from "react";
import { AiFillMinusCircle, AiFillPlusCircle } from "react-icons/ai";
import { FaShoppingCart } from "react-icons/fa";

import { useShopContext } from "../lib/context";
import getStripe from "../lib/getStripe";
import {
  Card,
  CardInfo,
  Cards,
  CartStyle,
  CartWrapper,
  Checkout,
  EmptyStyle,
} from "../styles/CartStyles";
import { Quantity } from "../styles/ProductDetails";
import { CartItem } from "../types";

const card = {
  hidden: { opacity: 0, scale: 0.8 },
  show: { opacity: 1, scale: 1 },
};

const cards = {
  hidden: {},
  show: {
    transition: {
      delayChildren: 0.3,
      staggerChildren: 0.1,
    },
  },
};

const handleCheckout = async (cartItems: CartItem[]) => {
  const stripe = await getStripe();
  const response = await fetch("/api/stripe", {
    method: "post",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(cartItems),
  });
  const data = await response.json();
  await stripe.redirectToCheckout({ sessionId: data.id });
};

function Cart() {
  const {
    cartItems,
    setShowCart,
    incrementCartItem,
    decrementCartItem,
    totalPrice,
  } = useShopContext()!;

  return (
    <CartWrapper
      onClick={() => setShowCart(false)}
      animate={{ opacity: 1 }}
      initial={{ opacity: 0 }}
      exit={{ opacity: 0 }}>
      <CartStyle
        onClick={(e) => e.stopPropagation()}
        animate={{ x: 0 }}
        initial={{ x: "100%" }}
        exit={{ x: "100%" }}
        transition={{ type: "tween" }}>
        {!cartItems.length && (
          <EmptyStyle
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.2 }}>
            <h1>You have more shopping to do 😉</h1>
            <FaShoppingCart />
          </EmptyStyle>
        )}
        <Cards layout variants={cards} initial="hidden" animate="show">
          {cartItems.map((ci) => (
            <Card key={ci.slug} variants={card} layout>
              <Image
                src={ci.image.data.attributes.formats.small.url}
                width={128}
                height={128}
                alt=""
                style={{ objectFit: "cover" }}
              />
              <CardInfo>
                <h3>{ci.title}</h3>
                <h3>{ci.price}$</h3>
                <Quantity>
                  <span>Quantity</span>
                  <button
                    onClick={() => {
                      decrementCartItem(ci);
                    }}>
                    <AiFillMinusCircle />
                  </button>
                  <p>{ci.qty}</p>
                  <button onClick={() => incrementCartItem(ci)}>
                    <AiFillPlusCircle />
                  </button>
                </Quantity>
              </CardInfo>
            </Card>
          ))}
        </Cards>

        {cartItems.length > 0 && (
          <Checkout onClick={() => handleCheckout(cartItems)}>
            <h3>Subtotal: {totalPrice}$</h3>
            <button>Purchase</button>
          </Checkout>
        )}
      </CartStyle>
    </CartWrapper>
  );
}

export default Cart;
