import React, { useEffect, useState } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";

function SingleProduct() {
  const { id } = useParams();

  const [product, setProduct] = useState(null);

  async function getSingleProduct() {
    try {
      const token = localStorage.getItem("token");

      const res = await axios.get(
        `https://ecomflask.duckdns.org/api/admin/item/${id}`,
        {
          headers: {
             withCredentials: true  
          },
        }
      );

      setProduct(res.data.product);
    } catch (error) {
      console.log(error);
    }
  }

  useEffect(() => {
    getSingleProduct();
  }, []);

  if (!product) {
    return <h1>Loading...</h1>;
  }

  return (
    <div>
      <img
        src={product.image}
        alt=""
        width="250"
      />

      <h1>{product.itemname}</h1>

      <p>{product.item_desc}</p>

      <p>{product.item_about}</p>

      <h2>₹{product.price}</h2>

      <h3>Quantity: {product.quantity}</h3>

      <h3>{product.category}</h3>
    </div>
  );
}

export default SingleProduct;