import { useState } from 'react';
import ProductItem from './ProductItem';
import usePowiaty from '../../hooks/usePowiaty';
import useProductPrices from '../../hooks/useProductPrices';
import React from 'react';
import useUserStore from '../../store';
import useProvinces from '../../hooks/useProvinces';
import AddPriceForm from './AddPriceForm';

interface Props{
    productId:string;
}

const ProductPrices = ({productId}:Props) => {
    const [selectedPowiat,setSelectedPowiat]=useState(0);
    const [showAddPriceForm,setShowAddPriceForm]=useState(false);
    const userStore=useUserStore();
    const provinceData =useProvinces();
    const productPrices =useProductPrices(parseInt(productId!),selectedPowiat);
    const [selectedProvince,setSelectedProvince]=useState(provinceData.data?.
        find(province=>province.id==userStore.userRegion)?.name||'');
        const [powiaty,setPowiaty]=useState(userStore.userRegion);
      const powiatData =usePowiaty(powiaty);


      const handleBack=()=>{
        if(selectedPowiat!=0){
          setSelectedPowiat(0);
        }
        else{
          setSelectedProvince('');
        }
      }

      const handlePoviatChange=(powiatName:string,powiatId:number)=>{
        setSelectedPowiat(powiatId);
            userStore.setglobalSelectedPowiat(powiatName);
      // console.log(userStore.globalSelectedPowiat);
      }

     
  return (
    <div className='pricesWrapper'>
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
     <ProductItem key={price.priceId} regionId={selectedPowiat} priceInfo={price} updateComponent={()=>{ProductPrices.refetch();}}/>
    )}
    </>
    :
    <h4 style={{marginTop:'20px'}}>Ten Produkt nie ma aktualnie żadnych wpisów w tym Powiecie</h4>
    }
    </div>
    :
    <div>
    {powiatData.data?.map(powiat=>
    <div className='listItem' key={powiat.id} style={{cursor:'pointer'}} onClick={()=>handlePoviatChange(powiat.name,powiat.id)}>
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
         onClick={()=>{
          setSelectedProvince(province.name);
          setPowiaty(province.id)}}>
      {province.name}
        </div>
      ))}
    </>
    }
    </div>

     <button className='addNewPrice' onClick={()=>setShowAddPriceForm(true)}>
     dodaj nową cenę dla tego produktu
     </button>
     
    {showAddPriceForm &&
    <div className='shadowWrapper'>
    <AddPriceForm closeForm={()=>setShowAddPriceForm(false)}/>
    </div>
    }

     </div>
  )
}

export default ProductPrices