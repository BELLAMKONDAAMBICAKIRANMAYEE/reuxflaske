import React, { useState } from 'react'
import axios from 'axios'
import { useNavigate } from 'react-router-dom'

function Login() {

  const navigate = useNavigate()

  const [formData, setFormData] = useState({
    email: "",
    password: ""
  })

  function handleChange(e) {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    })
  }

  async function handleSubmit(e) {
    e.preventDefault()

    try {

      const res = await axios.post(
        "https://ecomflask.duckdns.org/api/admin/login",
        formData,
        {
          withCredentials: true   // ✅ IMPORTANT (as per backend requirement)
        }
      )

      console.log(res.data)

      alert(res.data.message || "Login Successful")

      // OPTIONAL: store session info if needed
      localStorage.setItem("admin", JSON.stringify(res.data.admin))

      // redirect to admin dashboard/products
      navigate("/admin-products")

    } catch (error) {
      console.log(error.response?.data || error.message)
      alert("Login Failed")
    }
  }

  return (
    <div>

      <h1>Admin Login</h1>

      <form onSubmit={handleSubmit}>

        <input
          type="email"
          name="email"
          placeholder="Enter Email"
          value={formData.email}
          onChange={handleChange}
        />

        <br /><br />

        <input
          type="password"
          name="password"
          placeholder="Enter Password"
          value={formData.password}
          onChange={handleChange}
        />

        <br /><br />

        <button type="submit">
          Login
        </button>

      </form>

    </div>
  )
}

export default Login