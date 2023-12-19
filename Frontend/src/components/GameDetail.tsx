import React from 'react'
import { useParams } from 'react-router-dom';

const GameDetail = () => {
    const {productId}=useParams();
  return (
    <main>
    <div className='productDetailWrapper'>
    <div>{parseInt(productId!)}</div>
    </div>
    </main>
  )
}

export default GameDetail