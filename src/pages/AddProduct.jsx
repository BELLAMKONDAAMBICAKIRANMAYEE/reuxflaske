import React, { useState } from "react"
import axios from "axios"

function AddProduct() {

  const [formData, setFormData] = useState({
    title: "",
    Description: "",
    About_item: "",
    quantity: "",
    price: "",
    category: ""
  })

  const [file, setFile] = useState(null)

  function handleChange(e) {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
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

      // ⚠️ IMPORTANT SAFETY CHECK
      if (!file) {
        alert("Please select an image")
        return
      }

      data.append("file", file)

      const res = await axios.post(
        "https://ecomflask.duckdns.org/api/admin/add-item",
        data,
        {
          withCredentials: true,   // ✅ REQUIRED (SESSION AUTH)
          headers: {
            "Content-Type": "multipart/form-data"
          }
        }
      )

      console.log(res.data)
      alert(res.data.message)

    } catch (error) {
      console.log(error.response?.data || error.message)
      alert(error.response?.data?.message || "Add Product Failed")
    }
  }

  return (
    <div>

      <h1>Add Product</h1>

      <form onSubmit={handleSubmit}>

        <input name="title" placeholder="Title" onChange={handleChange} />
        <input name="Description" placeholder="Description" onChange={handleChange} />
        <input name="About_item" placeholder="About Item" onChange={handleChange} />
        <input name="quantity" placeholder="Quantity" onChange={handleChange} />
        <input name="price" placeholder="Price" onChange={handleChange} />
        <input name="category" placeholder="Category" onChange={handleChange} />

        <input
          type="file"
          onChange={(e) => setFile(e.target.files[0])}
        />

        <button type="submit">
          Add Product
        </button>

      </form>

    </div>
  )
}

export default AddProduct