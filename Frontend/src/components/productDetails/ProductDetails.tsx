import { useParams } from 'react-router-dom';
import useProductDetails from '../../hooks/useProductDetails';
import { FaCrown } from "react-icons/fa6";
import { useState } from 'react';
import ProductItem from './ProductItem';
import useUserStore from '../../store';
import useProvinces from '../../hooks/useProvinces';
import usePowiaty from '../../hooks/usePowiaty';
import useProductPrices from '../../hooks/useProductPrices';
import React from 'react';


const ProductDetails = () => {
    const {productId}=useParams();
    const userStore=useUserStore();
    const {data}=useProductDetails(parseInt(productId!));
    const [selectedPowiat,setSelectedPowiat]=useState(0);
    // const [selectedProvinceIndex,setSelectedProvinceIndex]=useState(0);
    const provinceData =useProvinces();
    const [selectedProvince,setSelectedProvince]=useState(provinceData.data?.
      find(province=>province.id==userStore.userRegion)?.name||'');
      const [powiaty,setPowiaty]=useState(userStore.userRegion);
    const powiatData =usePowiaty(powiaty);

    
    
    const productPrices =useProductPrices(parseInt(productId!),selectedPowiat);
  

    const handleBack=()=>{
      if(selectedPowiat!=0){
        setSelectedPowiat(0);
      }
      else{
        setSelectedProvince('');
      }
    }
   
 
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
        <img  src={`../public/images/${data?.picture}`}  alt="empty" style={{margin:'40px auto 10px auto'}} width='200px' height='200px'  />
        <p style={{marginTop:'20px'}}>średnia cena w ciągu ostatniego miesiąca to {data?.averagePriceFromLastMonth}zł</p>
      </div>
    <div className='mapWrapper'>
      <h2 style={{width:'100%',textAlign:'center'}} >Mapa albo Informacje o konkretnej cenie</h2>
    </div>
    <div className='productPrices'>
      {selectedProvince?
      <>
      <div className='singleProvince'>
         <span>{selectedProvince}  {selectedPowiat? 
         `powiat ${powiatData.data?.find(powiat=>powiat.id==selectedPowiat)?.name}`:''}
         </span>
        <button onClick={handleBack}>
          powrót
        </button>
      </div>
      
      {selectedPowiat ?
      <div className='priceItems'>
      {productPrices.data?.length !=0 ?
      <>
      {productPrices.data?.map(price=>
       <ProductItem key={price.priceId} regionId={selectedPowiat} priceInfo={price} updateComponent={()=>{productPrices.refetch();}}/>
      )}
      </>
      :
      <h4 style={{marginTop:'20px'}}>Ten Produkt nie ma aktualnie rzadnych wpisów w tym Powiecie</h4>
      }
      </div>
      :
      <div>
      {powiatData.data?.map(powiat=>
      <div className='listItem' key={powiat.id} style={{cursor:'pointer'}} onClick={()=>setSelectedPowiat(powiat.id)}>
      {powiat.name}
      </div>
      )}
      </div>
      }

       

      </>
      :
      <>
      <h3>Wybierz województwo</h3>
      {provinceData.data?.map((province,index) => (
          <div className='province' key={index}
           onClick={()=>{setSelectedProvince(province.name);setPowiaty(province.id);}}>
        {province.name}
          </div>
        ))}
      </>
      }
      </div>
    </section>
    </main>
  )
}

export default ProductDetails