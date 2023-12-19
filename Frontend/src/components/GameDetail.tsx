import { useParams } from 'react-router-dom';
import useProductDetails from '../hooks/useProductDetails';


const GameDetail = () => {
    const {productId}=useParams();
    const {data}=useProductDetails(parseInt(productId!));
  return (
    <main>
    <div className='productDetailWrapper'>
    <div>{data?.username &&data.username}</div>
    </div>
    </main>
  )
}

export default GameDetail