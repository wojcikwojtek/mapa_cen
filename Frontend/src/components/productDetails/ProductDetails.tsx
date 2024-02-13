import { useParams } from 'react-router-dom';
import useProductDetails from '../../hooks/useProductDetails';
import { FaCrown } from "react-icons/fa6";
import ProductPrices from './productPrices';
import MapComponent, { Position } from './MapComponent';
import { useEffect, useState } from 'react';
import useProductPrices from '../../hooks/useProductPrices';
import useUserStore from '../../store';
import mapOfRegionCors from './RegionCords';
import axios from 'axios';


const handleSearch = (address:string) => {
  return axios.get('https://api.tomtom.com/search/2/search/' + address + '.json', {
    params: {
      key: 'UcAS3ERLSlBjzpGkkZjvf9j88kW8A3Cp',
    },
  })
  .then(response => {
    const pierwszyWynik = response.data.results[0];

    if (pierwszyWynik) {
      console.log('coordinates:', pierwszyWynik.position);
      return pierwszyWynik.position;
    } else {
      console.log('any results no found');
    }
  })
  .catch(error => {
    console.error('error while searching', error);
  });
};

export interface Pointer{
  position:Position;
  price:number;
  name:string;
}

const ProductDetails = () => {
    const {productId}=useParams();
    const userStore=useUserStore();
    const {data}=useProductDetails(parseInt(productId!));
    const regionId=userStore.globalSelectedRegionId;
    const region=userStore.globalSelectedRegion;
  const currentCity = mapOfRegionCors.find(city => city.name == region);
    const productPrices =useProductPrices(parseInt(productId!), regionId);
     const [blockMap,setBlockMap]=useState(false);
  const [markers,setMarkers]=useState<Pointer[]>([]);
  
  useEffect(()=>{
    if(blockMap){
      setBlockMap(false);
      return;
    }

    if(!productPrices.isLoading&&productPrices.data&&currentCity?.name){
      const temp: Pointer[] = [];
      const promises = productPrices.data.map(async (price) => {
        const list = price.shopAddress.split(" ");
        if (list[0] === currentCity.name) {
          const position:Position = await handleSearch(price.shopAddress).then(data=>data);
          console.log("pozycja"+position.lat);
          temp.push({position:position,price:price.priceValue,name:price.shopAddress.substring(list[0].length)});
        }
        Promise.all(promises).then(() => {
          console.log("temp"+temp[0]);
          setMarkers(temp);
        });
      });
    }
  },[productPrices.data,currentCity?.name])




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
        
        <img src={`data:image/png;charset=utf-8;base64,${data?.picture}`}  alt="empty" style={{margin:'40px auto 10px auto'}} width='200px' height='200px'  />
        <p style={{marginTop:'20px'}}>średnia cena w ciągu ostatniego miesiąca to {data?.averagePriceFromLastMonth}zł</p>
      </div>
    <div className='mapWrapper'>
      <h2 style={{width:'100%',textAlign:'center'}} >Mapa cen</h2>
      
      {(data &&currentCity&&!productPrices.isLoading&&productPrices.data&&markers.length>0)&&
         <MapComponent  currentCity={currentCity} newMarkers={markers}/>  
        }
    </div>
    
    <ProductPrices  productId={productId!} blockMapRefetching={()=>setBlockMap(true)}/>
    </section>
    </main>
  )
}

export default ProductDetails