import useUserStore from '../store';
import { Link } from 'react-router-dom';
import useSearchProducts from '../hooks/useSearchProducts';
import StartingPage from './StartingPage';



const Main =  () => {
  const userStore=useUserStore();
  const {data}=useSearchProducts(userStore.searchProduct!);
  return (
    <>
    <main>
    
      {((data?.products.length||0) > 0)&&userStore.searchProduct  ?
      <>
      <h2>Find Products:</h2>
      {data?.products &&
      data.products.map((product) => (
        <Link to={"/productDetail/"+product.productId} key={product.productId}style={{textDecoration:'none'}}>
          <p style={{marginTop:'10px',cursor:'pointer'}}>{product.productName}</p>
          </Link>
      ))}
      </>
      :
      <StartingPage/>
      }
      
    </main>
    </>
  )
}

export default Main