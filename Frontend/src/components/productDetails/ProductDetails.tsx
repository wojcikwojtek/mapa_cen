import { useParams } from 'react-router-dom';
import useProductDetails from '../../hooks/useProductDetails';
import { FaCrown } from "react-icons/fa6";
import ProductPrices from './productPrices';


const ProductDetails = () => {
    const {productId}=useParams();
    const {data}=useProductDetails(parseInt(productId!));
    // const [selectedProvinceIndex,setSelectedProvinceIndex]=useState(0);
  
 
  return (
    <main>
    
    <section style={{display:'flex',justifyContent:'space-between',height:'100%' ,width:'100%'}}>
      <div className='productInfo'>
        <div>Najlepsze ceny dla produktu
        <div style={{display:'flex',marginTop:'5px'}}>
        <span style={{marginRight:'5px',fontWeight:'bold'}}>{data?.productName}</span>
        <FaCrown size={25}  color="gold"/>
        </div>
        </div>
        
        <img   src={`data:image/png;charset=utf-8;base64,${data?.picture}`}  alt="empty" style={{margin:'40px auto 10px auto'}} width='200px' height='200px'  />
        <p style={{marginTop:'20px'}}>średnia cena w ciągu ostatniego miesiąca to {data?.averagePriceFromLastMonth}zł</p>
      </div>
    <div className='mapWrapper'>
      <h2 style={{width:'100%',textAlign:'center'}} >Mapa albo Informacje o konkretnej cenie</h2>
    </div>
    <ProductPrices productId={productId!}/>
    </section>
    </main>
  )
}

export default ProductDetails