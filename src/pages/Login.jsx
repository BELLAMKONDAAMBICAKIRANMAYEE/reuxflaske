import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'

function Login() {
  const[user,setUser]=useState('')
  const navigate=useNavigate()
  function handleLogin(){
    const userdata={
      username:user
    }
    localStorage.setItem('user',JSON.stringify(userdata))
    navigate('/products')
  }
  return (
    <div>
      <h1>Login</h1>
      <input type="text"
      placeholder="Enter username"
      value={user}
      onChange={(e)=>setUser(e.target.value)} />
      <button onClick={handleLogin}>Login</button>
    </div>
  )
}

export default Login