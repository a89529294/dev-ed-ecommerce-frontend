import Link from "next/link";
import React from "react";
import { FiShoppingBag } from "react-icons/fi";
import { CardInfo } from "../styles/CartStyles";

import { NavItems, NavStyles } from "../styles/NavStyles";
import Cart from "./Cart";

function Nav() {
  return (
    <NavStyles>
      <Link href="/">
        <a>Styled.</a>
      </Link>
      <NavItems>
        <CardInfo>
          <FiShoppingBag />
          <h3>cart</h3>
        </CardInfo>
      </NavItems>
      <Cart />
    </NavStyles>
  );
}

export default Nav;
