import React from 'react'

interface Props{
  closeForm:()=>void;
}

const AddPriceForm = ({closeForm}:Props) => {
  return (
    <div className='addPriceForm'>
      <div className='closeButton' onClick={closeForm}>
        x
      </div>
      <h1>Dodaj cenę</h1>
      <form>
            <label htmlFor="shop_address">Adres sklepu:</label><br/>
            <input type="text" id="shop_address" name="shop_address"></input><br/>
            <label htmlFor="priceValue">Cena:</label><br/>
            <input type="text" id="priceValue" name="priceValue"></input><br/>
            <input type="submit"  value="Dodaj cenę"></input>
        </form>
    </div>
  )
}

export default AddPriceForm