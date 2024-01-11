import React from 'react'
import useMostPopular from '../hooks/useMostPopular'
import { Link, useNavigate } from 'react-router-dom';

const StartingPage = () => {
    const products=useMostPopular();
    const navigate=useNavigate();
    const lista=["pomidor","prince_polo","woda_niegazowana","sucha_krakowska","twaróg","ser_gouda"];
  return (
    <div className='mostViewedWrapper'> 
    <h1>Most Popular Products</h1>
    {/* {products.data?.products.map(product=> */}
        {lista.map(product=>    
        <div className='mostViewedItem'>
        <Link to={"/productDetail/"+product.productId} key={product.productId}style={{textDecoration:'none'}}>
        <p>{product}</p>
        </Link>
        <img  src={`../public/images/${product}.png`} alt="empty"/>
        </div>)}
    </div>
  )
}

export default StartingPage