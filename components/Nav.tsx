import { AnimatePresence, motion } from "framer-motion";
import Link from "next/link";
import React from "react";

import { FiShoppingBag } from "react-icons/fi";
import { useShopContext } from "../lib/context";
import { CardInfo } from "../styles/CartStyles";
import { NavItems, NavStyles } from "../styles/NavStyles";
import Cart from "./Cart";

function Nav() {
  const { showCart, setShowCart, totalQty } = useShopContext()!;
  return (
    <NavStyles>
      <Link href="/">
        <a>Styled.</a>
      </Link>
      <NavItems>
        <CardInfo onClick={() => setShowCart(true)}>
          {totalQty > 0 && (
            <motion.span animate={{ scale: 1 }} initial={{ scale: 0 }}>
              {totalQty}
            </motion.span>
          )}
          <FiShoppingBag />
          <h3>cart</h3>
        </CardInfo>
      </NavItems>

      <AnimatePresence>{showCart && <Cart />}</AnimatePresence>
    </NavStyles>
  );
}

export default Nav;
