import React, { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";

function AdminProducts() {
  const [products, setProducts] = useState([]);

  async function getProducts() {
    try {
      const token = localStorage.getItem("token");

      const res = await axios.get(
        "https://ecomflask.duckdns.org/api/admin/items",
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      setProducts(res.data.products);
    } catch (error) {
      console.log(error);
    }
  }

  async function deleteProduct(id) {
    try {
      const token = localStorage.getItem("token");

      const res = await axios.delete(
        `https://your-backend-url.com/api/admin/delete-item/${id}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      alert(res.data.message);

      getProducts();
    } catch (error) {
      console.log(error);
    }
  }

  useEffect(() => {
    getProducts();
  }, []);

  return (
    <div>
      <h1>Admin Products</h1>

      {products.map((item) => (
        <div key={item.itemid}>
          <img
            src={item.image}
            alt=""
            width="150"
          />

          <h2>{item.itemname}</h2>

          <p>{item.item_desc}</p>

          <h3>₹{item.price}</h3>

          <Link to={`/single/${item.itemid}`}>
            View
          </Link>

          <Link to={`/edit/${item.itemid}`}>
            Edit
          </Link>

          <button
            onClick={() => deleteProduct(item.itemid)}
          >
            Delete
          </button>
        </div>
      ))}
    </div>
  );
}

export default AdminProducts;