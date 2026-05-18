import React, { useEffect, useState, useMemo } from 'react'

import { useSelector, useDispatch } from 'react-redux'

import { fetchProducts } from '../store/Slices/ProductSlice'

import { addToCart } from '../store/Slices/CartSlice'

function Products() {

  const { items = [], loading, error } =
    useSelector(state => state.Products)

  const dispatch = useDispatch()

  const [search, setSearch] = useState('')

  // Filter Products

  const filteredProducts = useMemo(() => {

    return items.filter((s) =>
      s.title.toLowerCase().includes(search.toLowerCase())
    )

  }, [items, search])

  // API Call

  useEffect(() => {

    dispatch(fetchProducts())

  }, [])

  // Error

  if (error) {
    return <h2>{error}</h2>
  }

  // Loading

  if (loading) {
    return <h2>Loading...</h2>
  }

  return (

    <div>

      <input
        type="text"
        placeholder="Enter Search"
        value={search}
        onChange={(e) => setSearch(e.target.value)}
      />

      <div>

        {
          filteredProducts.map((v) => (

            <div key={v.id}>

              <h2>{v.title}</h2>

              <img
                src={v.image}
                width="100px"
              />

              <h3>₹ {v.price}</h3>

              <button
                onClick={() => dispatch(addToCart(v))}
              >
                Add To Cart
              </button>

            </div>

          ))
        }

      </div>

    </div>

  )
}

export default Products