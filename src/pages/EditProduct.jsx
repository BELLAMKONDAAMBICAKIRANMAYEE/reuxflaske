import React, { useEffect, useState } from "react"
import axios from "axios"
import { useParams, useNavigate } from "react-router-dom"

function EditProduct() {

  const { id } = useParams()
  const navigate = useNavigate()

  const [formData, setFormData] = useState({
    title: "",
    Description: "",
    About_item: "",
    quantity: "",
    price: "",
    category: "",
  })

  const [file, setFile] = useState(null)

  async function getProduct() {
    try {

      const res = await axios.get(
        `https://ecomflask.duckdns.org/api/admin/item/${id}`,
        {
          withCredentials: true   // 🔥 REQUIRED
        }
      )

      const p = res.data.product

      setFormData({
        title: p.itemname,
        Description: p.item_desc,
        About_item: p.item_about,
        quantity: p.quantity,
        price: p.price,
        category: p.category,
      })

    } catch (error) {
      console.log(error.response?.data || error.message)
    }
  }

  useEffect(() => {
    getProduct()
  }, [])

  function handleChange(e) {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    })
  }

  async function handleSubmit(e) {
    e.preventDefault()

    try {

      const data = new FormData()

      data.append("title", formData.title)
      data.append("Description", formData.Description)
      data.append("About_item", formData.About_item)
      data.append("quantity", formData.quantity)
      data.append("price", formData.price)
      data.append("category", formData.category)

      if (file) {
        data.append("file", file)
      }

      const res = await axios.put(
        `https://ecomflask.duckdns.org/api/admin/update-item/${id}`,
        data,
        {
          withCredentials: true   // 🔥 REQUIRED
        }
      )

      alert(res.data.message)

      navigate("/admin-products")

    } catch (error) {
      console.log(error.response?.data || error.message)
      alert("Update failed")
    }
  }

  return (
    <div>

      <h1>Edit Product</h1>

      <form onSubmit={handleSubmit}>

        <input name="title" value={formData.title} onChange={handleChange} />
        <input name="Description" value={formData.Description} onChange={handleChange} />
        <input name="About_item" value={formData.About_item} onChange={handleChange} />
        <input name="quantity" value={formData.quantity} onChange={handleChange} />
        <input name="price" value={formData.price} onChange={handleChange} />
        <input name="category" value={formData.category} onChange={handleChange} />

        <input type="file" onChange={(e) => setFile(e.target.files[0])} />

        <button type="submit">
          Update Product
        </button>

      </form>

    </div>
  )
}

export default EditProduct