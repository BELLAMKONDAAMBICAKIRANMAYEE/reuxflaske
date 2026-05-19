import React from 'react'
import { Link, useNavigate } from 'react-router-dom'
import axios from 'axios'

function Navbar() {

  const navigate = useNavigate()
const user=JSON.parse(localStorage.getItem('admin'))
 function logout() {
localStorage.removeItem('admin')
navigate('/login')
    
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


      {/* AUTH LINKS */}
      {
        !user?
        (<><Link to="/login" style={{ color: "white", textDecoration: "none" }}>
        Login
      </Link>

      <Link to="/register" style={{ color: "white", textDecoration: "none" }}>
        Register
      </Link>
</>
      ):
        (
          <>
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
      <button onClick={logout}>
        Logout
      </button>
          </>
   )
      }

    </div>
  )
}

export default Navbar