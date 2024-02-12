import { useEffect, useState } from 'react';
import ProductItem from './ProductItem';
import useRegions from '../../hooks/useRegions';
import useProductPrices from '../../hooks/useProductPrices';
import React from 'react';
import useUserStore from '../../store';
import useProvinces from '../../hooks/useProvinces';
import AddPriceForm from './AddPriceForm';

interface Props{
    productId:string;
    // updateComponent:()=>void;
}

const ProductPrices = ({productId}:Props) => {
    const [selectedRegion,setSelectedRegion]=useState(0);
    const [showAddPriceForm,setShowAddPriceForm]=useState(false);
    const [reload,setReload]=useState(false);
    const userStore=useUserStore();
    const provinceData =useProvinces();
    const productPrices =useProductPrices(parseInt(productId!),selectedRegion);
    const [selectedProvince,setSelectedProvince]=useState(provinceData.data?.
        find(province=>province.id==userStore.userRegion)?.name||'');
        const [regions,setRegions]=useState(userStore.userRegion);
      const regionData =useRegions(regions);


      useEffect(()=>{
        productPrices.refetch();
      },[reload]);

      const handleBack=()=>{
        if(selectedRegion!=0){
          setSelectedRegion(0);
        }
        else{
          setSelectedProvince('');
        }
      }

      const handlePoviatChange=(regionName:string,regionId:number)=>{
        setSelectedRegion(regionId);
            userStore.setglobalSelectedRegion(regionName);
            userStore.setglobalSelectedRegionId(regionId);
            // updateComponent();
      }

    // if(productPrices.isRefetching){
      // return (<div>refetch</div>);
    // } 

  return (
    <div className='pricesWrapper'>
    <div className='productPrices'>
    {selectedProvince?
    <>
    <div className='singleProvince'>
       <span>{selectedProvince}  {selectedRegion? 
       `powiat ${regionData.data?.find(powiat=>powiat.id==selectedRegion)?.name}`:''}
       </span>
      <button onClick={handleBack}>
        powrót
      </button>
    </div>

    {selectedRegion ?
    <div className='priceItems'>
    {(productPrices.data?.length !=0)&&!productPrices.isRefetching ?
    <>
    {productPrices.data?.map(price=>
     <ProductItem key={price.priceId} regionId={selectedRegion} priceInfo={price} updateComponent={()=>{ProductPrices.refetch();}}/>
    )}
    </>
    :
    <h4 style={{marginTop:'20px'}}>Ten Produkt nie ma aktualnie żadnych wpisów w tym Powiecie</h4>
    }
    </div>
    :
    <div>
    {regionData.data?.map(region=>
    <div className='listItem' key={region.id} style={{cursor:'pointer'}} onClick={()=>handlePoviatChange(region.name,region.id)}>
    {region.name}
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
          setRegions(province.id)}}>
      {province.name}
        </div>
      ))}
    </>
    }
    </div>

    {selectedRegion !=0 &&
     <button className='addNewPrice' onClick={()=>setShowAddPriceForm(true)}>
     dodaj nową cenę dla tego produktu
     </button>
    }
     
    {showAddPriceForm &&
    <div className='shadowWrapper'>
    <AddPriceForm update={()=>setReload(!reload)} selectedRegion={selectedRegion} 
    productId={parseInt(productId)} closeForm={()=>setShowAddPriceForm(false)}/>
    </div>
    }

     </div>
  )
}

export default ProductPrices