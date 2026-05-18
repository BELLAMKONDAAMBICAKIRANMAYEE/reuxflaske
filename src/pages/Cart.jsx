import React from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { removeFromCart, clearCart } from '../store/Slices/CartSlice'

function Cart() {

  const { cartItems } = useSelector(state => state.Cart)

  const dispatch = useDispatch()

  return (

    <div>

      <h1>Cart Page</h1>

      <button onClick={() => dispatch(clearCart())}>
        Clear Cart
      </button>

      {
        cartItems.length === 0 ? (

          <h2>Cart is Empty</h2>

        ) : (

          cartItems.map((item) => (

            <div key={item.id}>

              <h3>{item.title}</h3>

              <img
                src={item.image}
                width="100px"
              />

              <h4>₹ {item.price}</h4>

              <button
                onClick={() =>
                  dispatch(removeFromCart(item.id))
                }
              >
                Remove
              </button>

            </div>

          ))

        )
      }

    </div>

  )
}

export default Cart