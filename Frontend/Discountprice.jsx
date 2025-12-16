import React from 'react'

function Discountprice({price, Discountprice}) {
 
    let discountprice

 if (price && Discountprice){
   discountprice =  (Number(price) - Number(Discountprice))
   }
  
  return (
    <div>
  ₹{Number(discountprice).toLocaleString('en-IN')}
</div>
  )
}

export default Discountprice
