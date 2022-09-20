import Image from "next/future/image";
import { useRouter } from "next/router";
import React from "react";
import { useQuery } from "urql";
import { AiFillPlusCircle, AiFillMinusCircle } from "react-icons/ai";

import { GET_PRODUCT_QUERY } from "../../lib/query";
import {
  Buy,
  DetailsStyle,
  ProductInfo,
  Quantity,
} from "../../styles/ProductDetails";

function ProductDetails() {
  const {
    query: { slug },
  } = useRouter();
  const [{ data, fetching, error }] = useQuery({
    query: GET_PRODUCT_QUERY,
    variables: { slug },
  });
  if (fetching) return <h1>loading...</h1>;
  if (error) return <h1>Error: {error.message}</h1>;
  if (!data.products.data.length) return <h1>Product does not exist!</h1>;
  const {
    title,
    description,
    image: {
      data: {
        attributes: {
          formats: {
            medium: { url },
          },
        },
      },
    },
  } = data.products.data[0].attributes;

  return (
    <DetailsStyle>
      <Image
        src={url}
        alt={title}
        width={500}
        height={1}
        style={{ width: "40%", height: "auto" }}
      />
      <ProductInfo>
        <h3>{title}</h3>
        <p>{description}</p>

        <Quantity>
          <span>Quant</span>
          <button>
            <AiFillMinusCircle />
          </button>
          <p>0</p>
          <button>
            <AiFillPlusCircle />
          </button>
        </Quantity>
        <Buy>Add to cart</Buy>
      </ProductInfo>
    </DetailsStyle>
  );
}

export default ProductDetails;
