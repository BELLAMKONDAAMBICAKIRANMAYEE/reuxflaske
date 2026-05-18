import React, { useEffect, useState } from 'react'
import axios from 'axios'
import { useNavigate } from 'react-router-dom'

function Dashboard() {

  const navigate = useNavigate()

  const [admin, setAdmin] = useState(null)
  const [loading, setLoading] = useState(true)

  async function getDashboard() {

    try {

      const res = await axios.get(
        "https://ecomflask.duckdns.org/api/admin/dashboard",
        {
          withCredentials: true
        }
      )

      console.log(res.data)

      setAdmin(res.data.admin) // this is object

      setLoading(false)

    } catch (error) {

      console.log(error.response?.data || error.message)

      setLoading(false)

      navigate("/login")
    }
  }

  useEffect(() => {
    getDashboard()
  }, [])

  if (loading) {
    return <h2>Loading Dashboard...</h2>
  }

  return (
    <div style={{ padding: "20px" }}>

      <h1>Admin Dashboard</h1>

      {/* FIX HERE */}
      <h3>Welcome: {admin?.adminemail}</h3>

      <p>Admin ID: {admin?.adminid}</p>

      <button onClick={() => navigate("/admin-products")}>
        Go to Products
      </button>

    </div>
  )
}

export default Dashboard