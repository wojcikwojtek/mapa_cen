import useUserStore from '../store';
import { Link } from 'react-router-dom';
import useSearchProducts from '../hooks/useSearchProducts';



const Main =  () => {
  const userStore=useUserStore();
  const {data}=useSearchProducts(userStore.searchProduct!);
  return (
    <>
    <main>
      {data?.products  &&<h1>Find Products:</h1>}
      {data?.products &&
      data.products.map((product) => (
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