import React, { useRef, useState } from 'react'
import APIClient from '../services/api-client';

const apiClient = new APIClient();
const AdminPanel = () => {
    const [name,setName]=useState("");
    const [category,setCategory]=useState(-1);
    const [photo,setPhoto]=useState<File|undefined>();
    const nameRef=useRef<HTMLInputElement>(null);
    const photoRef=useRef<HTMLInputElement>(null);

    const categories=[{id:6,name:'nabiał'},{id:8,name:'napoje'},{id:2,name:'owoce'},
    {id:4,name:'owoce morza'},{id:3,name:'pieczywo'},{id:7,name:'produkty mięsne'},
    {id:5,name:'słodycze'},{id:1,name:'warzywa'}]
    
    const handleNameChange=()=>{
        if(nameRef.current){
          const name=nameRef.current.value.toString();
          setName(name);
      }
    }
  
      const handlePhotChange=()=>{
        if(photoRef.current){
          const photo=photoRef.current.value.toString();
          setPhoto(photo);
        }}

    const handleSubmit=()=>{
        apiClient.addNewProduct(name,category,photo);
    }

  return (
    <div className='adminPanel'>
    <h1>AdminPanel</h1>
    <p>dodaj nowy produkt</p>
    <form action="/submit" method="post">
    <div>
    <label htmlFor="productName">Nazwa produktu:</label>
    <input type="text" ref={nameRef} onChange={handleNameChange} id="productName" name="productName" required/>
    </div>

    <div>
    <label htmlFor="category">Kategoria:</label>
    <select id="category"   name="category" required>
        {categories.map(category=>
        <option key={category.id} value={category.id} onClick={()=>setCategory(category.id)}>
            {category.name}
        </option>)}
    </select>
    </div>


    <div>
    <label htmlFor="productImage">Zdjęcie produktu:</label>
    <input type="file" id="productImage" ref={photoRef} onChange={handlePhotChange} name="productImage" accept="image/*" required/>
    </div>
    <button onClick={handleSubmit}>dodaj produkt</button>
    </form>
    </div>
  )
}

export default AdminPanel