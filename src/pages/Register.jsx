import React, { useState } from 'react'
import axios from 'axios'
import { useNavigate } from 'react-router-dom'

function Register() {

  const navigate = useNavigate()

  const [formData, setFormData] = useState({
    username: "",
    useremail: "",
    useraddress: "",
    userpassword: "",
    useragree: false
  })

  function handleChange(e) {
    const { name, value, type, checked } = e.target

    setFormData({
      ...formData,
      [name]: type === "checkbox" ? checked : value
    })
  }

  async function handleSubmit(e) {
    e.preventDefault()

    try {

      const res = await axios.post(
        "https://ecomflask.duckdns.org/api/admin/register",
        formData
      )

      console.log(res.data)

      alert(res.data.message || "OTP Sent Successfully")

      // IMPORTANT: pass token
      navigate("/verify-otp", {
        state: {
          token: res.data.token
        }
      })

    } catch (error) {
      console.log(error.response?.data || error.message)
      alert("Register Failed")
    }
  }

  return (
    <div>

      <h1>Register</h1>

      <form onSubmit={handleSubmit}>

        <input
          type="text"
          name="username"
          placeholder="Username"
          value={formData.username}
          onChange={handleChange}
        />

        <br /><br />

        <input
          type="email"
          name="useremail"
          placeholder="Email"
          value={formData.useremail}
          onChange={handleChange}
        />

        <br /><br />

        <input
          type="text"
          name="useraddress"
          placeholder="Address"
          value={formData.useraddress}
          onChange={handleChange}
        />

        <br /><br />

        <input
          type="password"
          name="userpassword"
          placeholder="Password"
          value={formData.userpassword}
          onChange={handleChange}
        />

        <br /><br />

        <label>
          <input
            type="checkbox"
            name="useragree"
            checked={formData.useragree}
            onChange={handleChange}
          />
          Agree Terms
        </label>

        <br /><br />

        <button type="submit">
          Register
        </button>

      </form>

    </div>
  )
}

export default Register