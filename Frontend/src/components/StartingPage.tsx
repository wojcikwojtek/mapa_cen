import React from 'react'
import useMostPopular from '../hooks/useMostPopular'
import { Link, useNavigate } from 'react-router-dom';

const StartingPage = () => {
    const products=useMostPopular();
    //const navigate=useNavigate();

  return (
    <div className='mostViewedWrapper'> 
    <h1>Most Popular Products</h1>
    {/* {products.data?.products.map(product=> */}
        {products.data?.products.map(product=>    
        <div className='mostViewedItem'>
        <Link to={"/productDetail/"+product.productId} key={product.productId} style={{textDecoration:'none'}}>
        <p>{product.productName}</p>
        </Link>
        <img  src={`../public/images/${product.productName}.png`} alt="empty"/>
        </div>)}
    </div>
  )
}

export default StartingPage