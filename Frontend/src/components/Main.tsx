import React from 'react'
import { useStore } from 'zustand';
import useUserStore from '../store';
import APIClient, { Product } from '../services/api-client';
import { Link } from 'react-router-dom';

const apiClient=new APIClient();

const Main =  () => {
  const userStore=useUserStore();
  let products:Product[]=[];
  apiClient.getProducts(userStore.searchProduct||"")
  .then(data=>products=data.products)
  .catch(err=>console.log(err));
  return (
    <>
    <main>
      {products.length !==0 &&<h1>Find Products:</h1>}
      {products.length !==0 &&
      products.map((product) => (
        <Link to={"/productDetail/"+product.productId}>
          <p style={{marginTop:'10px',cursor:'pointer'}} key={product.productId}>{product.productName}</p>
          </Link>
      ))}
      <Link to={"/productDetail/"+1}><p>some Products</p></Link>
    </main>
    </>
  )
}

export default Main