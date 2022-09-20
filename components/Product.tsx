import Image from "next/future/image";
import React from "react";

import { ProductStyle } from "../styles/ProductStyle";
import { P } from "../types";

function Product({
  product: { title, price, image, description },
}: {
  product: P;
}) {
  return (
    <ProductStyle>
      <div style={{ width: "100%", position: "relative", aspectRatio: 1 }}>
        <Image
          src={image.data.attributes.formats.small.url}
          alt=""
          fill
          style={{ objectFit: "cover" }}
        />
      </div>
      <h2>{title}</h2>
      <h3>{price}</h3>
    </ProductStyle>
  );
}

export default Product;
