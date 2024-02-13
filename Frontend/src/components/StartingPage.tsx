import React from 'react'
import useMostPopular from '../hooks/useMostPopular'
import { Link, useNavigate } from 'react-router-dom';

const StartingPage = () => {
    const products=useMostPopular();
    //const navigate=useNavigate();

  return (
    <div className='mostViewedWrapper'> 
    <h1>Najpopularniejsze Produkty</h1>
    {/* {products.data?.products.map(product=> */}
        {products.data?.products.map((product,index)=>    
        
        <Link to={"/productDetail/"+product.productId} key={product.productId} style={{textDecoration:'none'}}>
        <div className='mostViewedItem'>
        <p key={index}>{product.productName}</p>
        
        <img  src={`../public/images/${product.productName}.png`} alt={product.productName}/>
        </div>
        </Link>
        )}
    </div>
  )
}

export default StartingPage