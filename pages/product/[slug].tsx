import Image from "next/future/image";
import { useRouter } from "next/router";
import React, { useEffect } from "react";
import { useQuery } from "urql";
import { AiFillPlusCircle, AiFillMinusCircle } from "react-icons/ai";
import toast from "react-hot-toast";

import { GET_PRODUCT_QUERY } from "../../lib/query";
import {
  Buy,
  DetailsStyle,
  ProductInfo,
  Quantity,
} from "../../styles/ProductDetails";
import { useShopContext } from "../../lib/context";

function ProductDetails() {
  const {
    query: { slug },
  } = useRouter();
  const [{ data, fetching, error }] = useQuery({
    query: GET_PRODUCT_QUERY,
    variables: { slug },
  });
  const { qty, increment, decrement, reset, onAdd } = useShopContext()!;
  useEffect(reset, []);
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

  const notify = () => {
    toast.success(`${title} added yo your cart!`, {
      duration: 1500,
      icon: "🛒",
    });
  };

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
          <button onClick={decrement}>
            <AiFillMinusCircle />
          </button>
          <p>{qty}</p>
          <button onClick={increment}>
            <AiFillPlusCircle />
          </button>
        </Quantity>
        <Buy
          onClick={() => {
            notify();
            onAdd(data.products.data[0].attributes);
          }}>
          Add to cart
        </Buy>
      </ProductInfo>
    </DetailsStyle>
  );
}

export default ProductDetails;
