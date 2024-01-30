import React from 'react'

interface Props{
  closeForm:()=>void;
}

const AddPriceForm = ({closeForm}:Props) => {
  return (
    <div className='addPriceForm'>
      AddPriceForm
      <div className='closeButton' onClick={closeForm}>
        x
      </div>
    </div>
  )
}

export default AddPriceForm