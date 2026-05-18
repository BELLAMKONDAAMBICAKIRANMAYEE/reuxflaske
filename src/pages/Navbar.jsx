import React from 'react'
import { Link, useNavigate } from 'react-router-dom'
import axios from 'axios'

function Navbar() {

  const navigate = useNavigate()

  async function logout() {

    try {

      const res = await axios.post(
        "https://ecomflask.duckdns.org/api/admin/logout",
        {},
        {
          withCredentials: true   // ✅ REQUIRED
        }
      )

      console.log(res.data)

      alert(res.data.message || "Logout Successful")

      navigate("/login")

    } catch (error) {
      console.log(error.response?.data || error.message)
      alert("Logout Failed")
    }
  }

  return (

    <div
      style={{
        display: "flex",
        gap: "20px",
        padding: "20px",
        background: "black"
      }}
    >

      <Link to="/" style={{ color: "white", textDecoration: "none" }}>
        Home
      </Link>

      <Link to="/products" style={{ color: "white", textDecoration: "none" }}>
        Products
      </Link>

      <Link to="/cart" style={{ color: "white", textDecoration: "none" }}>
        Cart
      </Link>

      {/* ADMIN LINKS */}

      <Link to="/add-product" style={{ color: "white", textDecoration: "none" }}>
        Add Product
      </Link>

      <Link to="/admin-products" style={{ color: "white", textDecoration: "none" }}>
        Admin Products
      </Link>

      {/* AUTH LINKS */}
      <Link to="/login" style={{ color: "white", textDecoration: "none" }}>
        Login
      </Link>

      <Link to="/register" style={{ color: "white", textDecoration: "none" }}>
        Register
      </Link>

      {/* Logout (session based) */}
      <button onClick={logout}>
        Logout
      </button>

    </div>
  )
}

export default Navbar