import React, { useEffect, useState,useMemo } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import {fetchProducts} from '../store/Slices/ProductSlice'


function Products() {
  const { items, loading, error } = useSelector(state => state.Products)
  const dispatch = useDispatch()
  const[search,setSearch]=useState('')
  const filteredProducts=useMemo(()=>{
    return items.filter(s=>s.category.toLowerCase().includes(search.toLowerCase()))
  })
  useEffect(() => {
    dispatch(fetchProducts())
  }, [])
  if (error) {
    return <h2>{error}</h2>
  }
  if (loading) {
    return <h2>Loading...</h2>
  }
  return (
    <div>
      <input
      type="text"
      placeholder="enter search"
      value={search}
      onChange={e=>setSearch(e.target.value)}/>
      {
        filteredProducts.map((v) => (
          <div key={v.itemid}>
            <h2>{v.category}</h2>
           <img src={v.image} width="100px"/>
           <p>{v.item_about}</p>
           <h3>{v.item_desc}</h3>
           <h5>{v.itemname}</h5>
           <p>₹{v.price}</p>
           <p>{v.quantity}</p>
          </div>
        ))
      }
    </div>
  )
}

export default Products