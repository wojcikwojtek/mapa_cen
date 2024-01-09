import { useParams } from 'react-router-dom';
import useProductDetails from '../hooks/useProductDetails';
import { FaCrown } from "react-icons/fa6";
import empty from '../assets/empty.jpg'
import { useState } from 'react';
import { Price } from '../entities/price';
import ProductItem from './productDetails/ProductItem';


const ProductDetails = () => {
    const {productId}=useParams();
    const {data}=useProductDetails(parseInt(productId!));
    const [selectedProvince,setSelectedProvince]=useState("");
    
    const provinceData = [
      'Dolnośląskie',
      'Kujawsko-Pomorskie',
      'Lubelskie',
      'Lubuskie',
      'Łódzkie',
      'Małopolskie',
      'Mazowieckie',
      'Opolskie',
      'Podkarpackie',
      'Podlaskie',
      'Pomorskie',
      'Śląskie',
      'Świętokrzyskie',
      'Warmińsko-Mazurskie',
      'Wielkopolskie',
      'Zachodniopomorskie',
    ];

 
  return (
    <main>
    
    <section style={{display:'flex',justifyContent:'space-between',height:'100%' ,width:'100%'}}>
      <div className='productInfo'>
        <p>Najlepsze ceny dla produktu
        <div style={{display:'flex',marginTop:'5px'}}>
        <span style={{marginRight:'5px',fontWeight:'bold'}}>{data?.productName}</span>
        <FaCrown size={25}  color="gold"/>
        </div>
        </p>
        <img style={{marginTop:'20px'}} src={empty} alt="nicc" width='80px' height='80px' />
        <p style={{marginTop:'20px'}}>średnia cena w ciągu ostatniego miesiąca to {data?.averagePriceFromLastMonth}zł</p>
      </div>
    <div className='mapWrapper'>
      <h2 style={{width:'100%',textAlign:'center'}} >Mapa albo Informacje o konkretnej cenie</h2>
    </div>
    <div className='productPrices'>
      {selectedProvince?
      <>
      <div className='singleProvince'>
         <span>{selectedProvince}</span>
        <button onClick={()=>setSelectedProvince('')}>
          powrót
        </button>
      </div>
      
      <div className='priceItems'>
      {data?.prices.length ?
      <>
      {data?.prices.map(price=>
      <ProductItem priceInfo={price}/>
      )}
      </>
      :
      <h4 style={{marginTop:'20px'}}>Ten Produkt nie ma aktualnie rzadnych wpisów w tym województwie</h4>
      }
      </div>

      </>
      :
      <>
      <h3>Wybierz województwo</h3>
      {provinceData.map((province,index) => (
          <div className='province' key={index}
           onClick={()=>setSelectedProvince(provinceData[index])}>{province}</div>
        ))}
      </>
      }
      </div>
    </section>
    </main>
  )
}

export default ProductDetails