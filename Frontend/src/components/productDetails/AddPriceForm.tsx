import React from 'react'
import { FieldValues, useForm } from 'react-hook-form';
import APIClient from '../../services/api-client';
import { useNavigate } from 'react-router-dom';


interface NewPriceData{
  address:string;
  price:number;
}

interface Props{
  closeForm:()=>void;
  productId:number;
  selectedRegion:number;
  update:()=>void;
}


const AddPriceForm = ({closeForm,productId,selectedRegion,update}:Props) => {
  const apiClient=new APIClient();
  // const navigate=useNavigate();

  const {register,handleSubmit, formState:{errors}}=useForm<NewPriceData>();
  const onSubmit=(data: FieldValues)=>{
    console.log("wysylanie");
    apiClient.addNewPrice(productId,selectedRegion,data.address,data.price)
    .then(res=>{
      console.log(res.data);
      
      closeForm();
      update();
    })
    .catch(err=>{
      console.log("error"+err);
    })
  };



  return (
    <div className='addPriceForm'>
      <div className='closeButton' onClick={closeForm}>
        x
      </div>
      <h1>Dodaj cenę</h1>
      <form onSubmit={handleSubmit(onSubmit)}>
            <label htmlFor="address">Adres sklepu:</label><br/>
            <input {...register('address',{required:true,minLength:5})} type="text" id="address" name="address"></input><br/>
            <label htmlFor="priceValue">Cena:</label><br/>
            <input {...register('price',{required: true,min:1})} type="number" id="price" name="price"></input><br/>
            {errors.address &&<p>zły adres</p>}
            {errors.price &&<p>zła cena</p>}
            <input type="submit"  value="Dodaj cenę"></input>
        </form>
    </div>
  )
}

export default AddPriceForm