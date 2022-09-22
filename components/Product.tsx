import Image from "next/future/image";
import Link from "next/link";
import React from "react";

import { ProductStyle } from "../styles/ProductStyle";
import { P } from "../types";

function Product({ product: { title, price, image, slug } }: { product: P }) {
  return (
    <ProductStyle>
      <Link href={`/product/${slug}`}>
        <a
          style={{
            width: "100%",
            position: "relative",
            aspectRatio: 1,
            display: "block",
          }}>
          <Image
            src={image.data.attributes.formats.small.url}
            alt=""
            fill
            style={{ objectFit: "cover", objectPosition: "top" }}
          />
        </a>
      </Link>
      <h2>{title}</h2>
      <h3>{price}</h3>
    </ProductStyle>
  );
}

export default Product;
