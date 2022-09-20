import Image from "next/future/image";
import { useRouter } from "next/router";
import React from "react";
import { useQuery } from "urql";
import { GET_PRODUCT_QUERY } from "../../lib/query";

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

  console.log(data.products.data[0].attributes);

  return (
    <div>
      {/* <Image /> */}
      <div>
        <h3>Title</h3>
        <p>descrip</p>
      </div>
      <div>
        <span>Quant</span>
        <button>plus</button>
        <p>0</p>
        <button>minus</button>
      </div>
      <button>Add to cart</button>
    </div>
  );
}

export default ProductDetails;
