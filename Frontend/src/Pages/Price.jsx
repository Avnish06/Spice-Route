import React from 'react'

function Price({price}) {
  return (
    <div>
 <div>₹{Number(price).toLocaleString('en-IN')}</div>
    </div>
  )
}

export default Price
