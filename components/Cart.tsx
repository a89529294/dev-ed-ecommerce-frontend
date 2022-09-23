import Image from "next/future/image";
import React from "react";
import { AiFillMinusCircle, AiFillPlusCircle } from "react-icons/ai";
import { FaShoppingCart } from "react-icons/fa";

import { useShopContext } from "../lib/context";
import {
  Card,
  CardInfo,
  CartStyle,
  CartWrapper,
  EmptyStyle,
} from "../styles/CartStyles";
import { Quantity } from "../styles/ProductDetails";

function Cart() {
  const { cartItems } = useShopContext()!;

  return (
    <CartWrapper>
      <CartStyle>
        {!cartItems.length && (
          <EmptyStyle>
            <h1>You have more shopping to do 😉</h1>
            <FaShoppingCart />
          </EmptyStyle>
        )}
        {cartItems.map((ci) => (
          <Card key={ci.slug}>
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
                <button>
                  <AiFillMinusCircle />
                </button>
                <p>{ci.qty}</p>
                <button>
                  <AiFillPlusCircle />
                </button>
              </Quantity>
            </CardInfo>
          </Card>
        ))}
      </CartStyle>
    </CartWrapper>
  );
}

export default Cart;
