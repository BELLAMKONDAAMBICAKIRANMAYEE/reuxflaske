import React from 'react'
import { Link,useNavigate } from 'react-router-dom'

function Navbar() {
    const user=JSON.parse(localStorage.getItem('user'))
    const navigate=useNavigate()
    function handleLogout(){
        localStorage.removeItem('user')
        navigate('/login')
    }
    return (
        <>
            <Link to="/">Home</Link>
            <Link to="/products">Products</Link>
            <Link to="/cart">Cart</Link>
          {
            !user?
            (  <Link to="/login">Login</Link>)
            :
            (<button onClick={handleLogout}>Logout</button>)
          }
        </>
    )
}

export default Navbar