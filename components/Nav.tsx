import Link from "next/link";
import React from "react";
import { FiShoppingBag } from "react-icons/fi";

import { NavItems, NavStyles } from "../styles/NavStyles";

function Nav() {
  return (
    <NavStyles>
      <Link href="/">
        <a>Styled.</a>
      </Link>
      <NavItems>
        <div>
          <FiShoppingBag />
          <h3>cart</h3>
        </div>
      </NavItems>
    </NavStyles>
  );
}

export default Nav;
