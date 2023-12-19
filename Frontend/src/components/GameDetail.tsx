import React from 'react'
import { useParams } from 'react-router-dom';
import APIClient, { AuthResponse } from '../services/api-client';

const apiClient=new APIClient();
const GameDetail = () => {
    const {productId}=useParams();
    let product:AuthResponse={username:'',authorized:true};
   apiClient.getProductDetail(parseInt(productId!))
    .then(data=>product=data)
    .then(err=>console.log(err));
  return (
    <main>
    <div className='productDetailWrapper'>
    <div>{product.authorized &&product.username}</div>
    </div>
    </main>
  )
}

export default GameDetail