import React, { useEffect, useState } from "react"
import axios from "axios"
import { Link, useNavigate } from "react-router-dom"

function AdminProducts() {

  const [products, setProducts] = useState([])
  const navigate = useNavigate()

  async function getProducts() {
    try {

      const res = await axios.get(
        "https://ecomflask.duckdns.org/api/admin/items",
        {
          withCredentials: true   // 🔥 REQUIRED
        }
      )

      setProducts(res.data.products || res.data)

    } catch (error) {
      console.log(error.response?.data || error.message)

      // if session expired → redirect
      navigate("/login")
    }
  }

  async function deleteProduct(id) {
    try {

      const res = await axios.delete(
        `https://ecomflask.duckdns.org/api/admin/delete-item/${id}`,
        {
          withCredentials: true   // 🔥 REQUIRED
        }
      )

      alert(res.data.message)

      getProducts()

    } catch (error) {
      console.log(error.response?.data || error.message)
    }
  }

  useEffect(() => {
    getProducts()
  }, [])

  return (
    <div>
      <h1>Admin Products</h1>

      {products.map((item) => (
        <div key={item.itemid}>

          <img src={item.image} alt="" width="150" />

          <h2>{item.itemname}</h2>
          <p>{item.item_desc}</p>
          <h3>₹{item.price}</h3>

          <Link to={`/single/${item.itemid}`}>View</Link>
          <Link to={`/edit/${item.itemid}`}>Edit</Link>

          <button onClick={() => deleteProduct(item.itemid)}>
            Delete
          </button>

        </div>
      ))}
    </div>
  )
}

export default AdminProducts